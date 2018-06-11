
const request = require('request-promise');
const redis = require('./redis');
const moment = require('moment');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/wx_config.js')[env];


var invoke = async function (method, uri, qs, body) {
  var result = await request({
    method: method,
    uri: uri,
    qs: qs,
    body: body,
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache'
    },
    json: true
  });
  return result;
}

//isUserList==true是获取通信录模块的token
//isUserList==false是获取应用本身的token
exports.getToken = async function(isUserList = false) {

  var key = config.redisKey
  var secret = config.secret
  if(isUserList){
    secret = config.contactSecret
    key = config.contactRedisKey
  }

  token = await redis.get(key)
  if (token) {
    return token;
  } else {
    var secret;
    var uri = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${config.corpID}&corpsecret=${secret}`;
    var newToken = await invoke('GET', uri, null, null);
    await redis.set(key, newToken.access_token);
    await redis.expire(key, 7200);
    return newToken.access_token;
  }
}

exports.getTicket = async function(token) {
  var uri = `https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=${token}`;
  var ticket = await invoke('GET', uri, null, null);
    // console.log(ticket);
  return ticket.ticket;
}

exports.getUserInfo = async function(code){
  var token = await this.getToken();
  var uri = `https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=${token}&code=${code}`;
  var info = await invoke('GET', uri, null, null);
  var ticket = info.user_ticket;
  var uri = `https://qyapi.weixin.qq.com/cgi-bin/user/getuserdetail?access_token=${token}`;
  var userInfo = await invoke('POST', uri, null, {
    user_ticket: ticket
  });
  return userInfo;
}

exports.getAllUsers = async ()=>{
  var token = await this.getToken(true);
  var uri = `https://qyapi.weixin.qq.com/cgi-bin/user/list?access_token=${token}&department_id=1&fetch_child=1&status=0`;
  var info = await invoke('GET', uri, null, null);
  return info;
}

exports.getDepartmentById = async ()=>{
  return {
    foo: 'bar'
  }
}
const Wx = require('../lib/wx');
const Crypto = require('crypto');
const moment = require('moment');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/wx_config.js')[env];

var getSha1 = function(str) {
  var sha1 = Crypto.createHash("sha1");//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
  sha1.update(str, 'utf8');
  var res = sha1.digest("hex");  //加密后的值d
  return res;
}

exports.index = async (ctx, next) => {
  // console.log(require(__dirname + '/../config/config.js')[env]);
  ctx.body = {
    foo: require(__dirname + '/../config/config.js')[env],
    env: env
  }
}

exports.auth = async (ctx, next) => {

  var token = await Wx.getToken()
  var ticket = await Wx.getTicket(token)
  var noncestr = 'asdGfuoaSheh3322';
  var timestamp = moment().unix() + '';
  //todo: 这里是首页，应该是获取header的origin做url
  // console.log(ctx.headers);
  var url = config.host;
  var string = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`

  var signature = getSha1(string);
  ctx.body = {
    signature: signature,
    timestamp: timestamp,
    nonceStr: noncestr
  }
}

exports.getUserInfo = async (ctx, next) => {
  var userInfo = await Wx.getUserInfo(ctx.query.code);
  var department = await Wx.getDepartmentById(userInfo.department[0]);
  ctx.body = {
    userInfo: userInfo,
    department: department.department[0].name
  }
}
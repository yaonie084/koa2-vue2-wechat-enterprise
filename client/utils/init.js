const prompts = require('prompts');
const exec = require('child_process').exec;
const request = require('request');
const fs = require('fs');
const source = 'https://raw.githubusercontent.com/chouchou900822/template/master';
const colors = require('colors');
const os = require('os');

String.prototype.firstUp = function() {
  return this.substring(0, 1).toUpperCase() + this.substring(1);
}

function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

async function downloadFile(uri, filename) {
  return new Promise(function (resolve) {
    let stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', resolve());
  });
}
async function get(url) {
  let host = 'http://service.funenc.com/api'
  return new Promise(function (resolve, reject) {
    request(encodeURI(host + url), function (error, response, body) {
      if (error) {
        reject(error)
      } else {
        resolve(JSON.parse(response.body));
      }
    });
  });
}
(async function () {
  let questions = [{
    message: '选择你的项目类型',
    type: 'select',
    name: 'corp',
    choices: [
      { title: '企业微信', value: 'wx' },
      { title: '钉钉', value: 'dd' }
    ],
    initial: 0
  }, {
    message: '选择你的免登类型',
    type: 'select',
    name: 'login',
    choices: [
      { title: '网页授权', value: 'web' },
      { title: '扫码授权', value: 'scan' }
    ],
    initial: 0
  }];
  const response = await prompts(questions);
  let inputs = [{
    type: 'text',
    name: 'userid',
    message: `请输入userid`
  }, {
    type: 'text',
    name: 'appName',
    message: `请输入appName`
  }];

  const envResponse = await prompts(inputs);
  let ip = getIPAdress();
  envResponse.host = `http://${ip}:3000`;
  downloadFile(`${source}/${response.corp}${response.login.firstUp()}.vue?v=${Math.random()}`, './src/App.vue');
  let serviceRes = await get(`/admins/info?corp=${response.corp}&login=${response.login}&userid=${envResponse.userid}&appName=${envResponse.appName}`);
  let envFileContent = '';
  for (let key in envResponse) {
    envFileContent += `VUE_APP_${key}=${envResponse[key]}\n`;
  }
  for (let key in serviceRes) {
    envFileContent += `VUE_APP_${key}=${serviceRes[key]}\n`;
  }
  exec(`echo "${envFileContent}" > .env.development`, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      console.log('项目搭建成功...'.green);
    }
  });
})();
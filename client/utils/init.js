const prompts = require('prompts');
const exec = require('child_process').exec;
const request = require('request');
const fs = require('fs');

async function downloadFile(uri, filename) {
  return new Promise(function (resolve) {
    let stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', resolve());
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
  }, {
    type: 'text',
    name: 'host',
    message: `请输入服务端host`
  }, {
    type: 'text',
    name: 'corpId',
    message: `请输入corpId`
  }, {
    type: 'text',
    name: 'agentId',
    message: `请输入agentId`
  }];
  let vueContent = '';
  if (response.corp == 'wx' && response.login == 'web') {
    inputs.push({
      type: 'text',
      name: 'redirectUri',
      message: `请输入免登redirect_uri`
    });
    await downloadFile(`http://onx1jjc4v.bkt.clouddn.com/wxWeb.vue?v=${Math.random()}`, './src/App.vue');
  }
  if (response.corp == 'wx' && response.login == 'scan') {
    inputs.push({
      type: 'text',
      name: 'scanUri',
      message: `请输入扫码redirect_uri`
    });
    await downloadFile(`http://onx1jjc4v.bkt.clouddn.com/wxScan.vue?v=${Math.random()}`, './src/App.vue');
  }
  if (response.corp == 'dd' && response.login == 'web') {
    await downloadFile(`http://onx1jjc4v.bkt.clouddn.com/ddWeb.vue?v=${Math.random()}`, './src/App.vue');
  }
  if (response.corp == 'dd' && response.login == 'scan') {
    inputs = [{
      type: 'text',
      name: 'userid',
      message: `请输入userid`
    }, {
      type: 'text',
      name: 'appName',
      message: `请输入appName`
    }, {
      type: 'text',
      name: 'host',
      message: `请输入服务端host`
    }, {
      type: 'text',
      name: 'appId',
      message: `请输入扫码appId`
    }, {
      type: 'text',
      name: 'scanUri',
      message: `请输入扫码redirect_uri`
    }];
    await downloadFile(`http://onx1jjc4v.bkt.clouddn.com/ddScan.vue?v=${Math.random()}`, './src/App.vue');
  }
  const envResponse = await prompts(inputs);
  let envFileContent = '';
  for (let key in envResponse) {
    envFileContent += `VUE_APP_${key}=${envResponse[key]}\n`;
  }
  exec(`echo "${envFileContent}" > .env.development`, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
})();
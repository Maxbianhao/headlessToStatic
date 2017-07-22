const loadPage = require('./src/loadPage');
const index = require('./template/index');
const startdesign = require('./template/startdesign');
const fs = require('fs');
const modalList = require('./src/modalList');
const buildTemplate = require('./src/buildTemplate');
const config = require('./config/config');

// 生成首页index
if(modalList.index || modalList.all) {
  loadPage(config.host + '/', (err, stdout, stderr) => {
    fs.writeFile('html/index', index(stdout), (werr) => {
      global.buildPageNum++;
      console.log('生成数量：' + global.buildPageNum);
      console.log('生成路径：index');
    })
  });
}

// 生成startdesign
if(modalList.startdesign || modalList.all) {
  loadPage(config.host + '/startdesign', (err, stdout, stderr) => {
    fs.writeFile('html/startdesign', startdesign(stdout), (werr) => {
      global.buildPageNum++;
      console.log('生成数量：' + global.buildPageNum);
      console.log('生成路径：/startdesign/');
    })
  });
}

// 生成模版中心一级页面
if(modalList.templatecenterF || modalList.all) {
  buildTemplate.buildTemplateF();
}

// 生成模版中心二级页面
if(modalList.templatecenterS || modalList.all) {
  buildTemplate.buildTemplateS({
    fid: modalList.fid,
    sid: modalList.sid
  });
}

// 生成模版中心中间页面
if(modalList.templatecenterM || modalList.all) {
  buildTemplate.buildTemplateM();
}


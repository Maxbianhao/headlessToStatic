const loadPage = require('./src/loadPage');
const index = require('./template/index');
const fs = require('fs');
const modalList = require('./src/modalList');
const buildTemplate = require('./src/buildTemplate');

// 生成首页index
if(modalList.index || modalList.all) {
  loadPage('https://moniwww.chuangkit.com/', (err, stdout, stderr) => {
    fs.writeFile('html/index', index(stdout), (werr) => {
      console.log(werr); 
    })
  });
}

// 生成startdesign
if(modalList.startdesign || modalList.all) {
  loadPage('https://moniwww.chuangkit.com/startdesign', (err, stdout, stderr) => {
    fs.writeFile('html/startdesign', index(stdout), (werr) => {
      console.log(werr);
    })
  });
}

// 生成模版中心一级页面
if(modalList.templatecenterF || modalList.all) {
  buildTemplate.buildTemplateF();
}

// 生成模版中心二级页面
if(modalList.templatecenterS || modalList.all) {
  buildTemplate.buildTemplateS();
}
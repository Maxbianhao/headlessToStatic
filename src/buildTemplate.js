// 模版中心的一级页面
const request = require('request');
const loadPage = require('./loadPage');
const fs = require('fs');
const templatecenter = require('../template/templatecenter');

const buildTemplateF = function() {
  // 模版中心用途分类
  request('https://moniapi.chuangkit.com/design/listUsageKind.do?_dataType=json', (error, response, body) => {
    if(!error) {
      let kinds = JSON.parse(body).body.kinds;
      for(let i = 0;i < kinds.length;i++) {
        loadPage('https://moniwww.chuangkit.com/templatecenter/all-kindId=' + kinds[i].kindId, (err, stdout, stderr) => {
          fs.writeFile('html/templatecenter/all-kindId=' + kinds[i].kindId, templatecenter(stdout), (werr) => {
            console.log(werr);
          })
        });
      }
    }
  });

  // 模版中心首页
  loadPage('https://moniwww.chuangkit.com/templatecenter/all', (err, stdout, stderr) => {
    fs.writeFile('html/templatecenter/all', templatecenter(stdout), (werr) => {
      console.log(werr);
    })
  });
}

const buildTemplateS = function() {
  let designType;
  request('https://moniapi.chuangkit.com/home/getDesignType.do?_dataType=json', (error, response, body) => {
    if(!error) {
      designType = JSON.parse(body).body.result;
      for(let i = 0;i < designType.length;i++) {
        
      }
    }
  })
}

module.exports = {
  buildTemplateF: buildTemplateF,
  buildTemplateS: buildTemplateS
}

// 模版中心的一级页面
const request = require('request');
const fs = require('fs');
const loadPage = require('./loadPage');
const templatecenter = require('../template/templatecenter');
const config = require('../config/config.js');
const buildSecondPage = require('./buildtemplate-secondpage');

const buildTemplateF = function() {
  // 模版中心用途分类
  request(config.api + '/design/listUsageKind.do?_dataType=json', (error, response, body) => {
    if(!error) {
      let kinds = JSON.parse(body).body.kinds;
      for(let i = 0;i < kinds.length;i++) {
        loadPage(config.host + '/templatecenter/all-kindId_' + kinds[i].kindId, (err, stdout, stderr) => {
          fs.writeFile('html/templatecenter/all-kindId_' + kinds[i].kindId, templatecenter(stdout), (werr) => {
            global.buildPageNum++;
            console.log('生成数量：' + global.buildPageNum);
            console.log('生成路径：/templatecenter/all-kindId_' + kinds[i].kindId);
          })
        });
      }
    }
  });

  // 模版中心首页
  loadPage(config.host + '/templatecenter/all', (err, stdout, stderr) => {
    fs.writeFile('html/templatecenter/all', templatecenter(stdout), (werr) => {
      global.buildPageNum++;
      console.log('生成数量：' + global.buildPageNum);
      console.log('生成路径：/templatecenter/all');
    })
  });
}

// 模版二级页面
const buildTemplateS = function(opts) {
  opts = opts || {};
  
  let fid = opts.fid,
    sid = opts.sid,
    designType;

  request(config.api + '/home/getDesignType.do?_dataType=json', (error, response, body) => {
    if(!error) {
      designType = JSON.parse(body).body.result;

      for(let i = 0;i < designType.length;i++) {
        let designKind = designType[i].designKind;

        // 如果指定fid
        if(fid != undefined && designType[i].firstKindId == fid) {

          buildSecondPage({
            fid: fid
          });

          for(let j = 0;j < designKind.length;j++) {
            // 如果指定sid（指定sid必须指定fid）
            if(sid != undefined && designKind[j].kindId == sid) {
              buildSecondPage({
                fid: fid,
                sid: sid,
                tags: designKind[j].lsTag
              })
            } else {
              buildSecondPage({
                fid: fid,
                sid: designKind[j].kindId,
                tags: designKind[j].lsTag
              })
            }
          }

        } else {
          buildSecondPage({
            fid: designType[i].firstKindId
          });

          for(let n = 0;n < designKind.length;n++) {
            buildSecondPage({
              fid: designType[i].firstKindId,
              sid: designKind[n].kindId,
              tags: designKind[n].lsTag
            })

          }

        }
      }
    }
  })
}

// 模版中间页
const buildTemplateM = function() {
  let templateIds;
  request(config.api + '/designtemplate/getAllTemplateIds.do?_dataType=json', (error, response, body) => {
    if(!error) {
      templateIds = JSON.parse(body).body.templateIds;
      for(let i = 0;i < templateIds.length;i++) {
        loadPage(config.host + '/templatecenter/templatedetail-id_' + templateIds[i], (err, stdout, stderr) => {
          fs.writeFile('html/templatecenter/templatedetail-id_' + templateIds[i], templatecenter(stdout), (werr) => {
            global.buildPageNum++;
            console.log('生成数量：' + global.buildPageNum);
            console.log('生成路径：/templatecenter/templatedetail-id_'  + templateIds[i]);
          })
        });
      }
    }
  });
}

module.exports = {
  buildTemplateF: buildTemplateF,
  buildTemplateS: buildTemplateS,
  buildTemplateM: buildTemplateM
}

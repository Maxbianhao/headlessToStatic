// 生成templatecenter模版
const request = require('request');
const config = require('../config/config');

var indexPage;

request(config.host + '/templatecenter/all', (error, response, body) => {
  if(!error) {
    indexPage = body.replace(/\<body\>([\s\S]*)/,'');
  }
});

var createTemplate = function(content) {
  return `${indexPage}${content}</html>`;
}


module.exports = createTemplate; 


// 生成templatecenter模版
const request = require('request');

var indexPage;

request('https://moniwww.chuangkit.com/', (error, response, body) => {
  if(!error) {
    indexPage = body.replace(/\<body\>([\s\S]*)/,'');
  }
});

var createTemplate = function(content) {
  return `${indexPage}${content}</html>`;
}


module.exports = createTemplate; 


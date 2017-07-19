// 生成startdesign模版
const request = require('request');

var indexPage;

request('https://moniwww.chuangkit.com/startdesign', (error, response, body) => {
  if(!error) {
    indexPage = body.replace(/\<body\>([\s\S]*)/,'');
  }
});

var createTemplate = function(content) {
  return `${indexPage}${content}</html>`;
}


module.exports = createTemplate; 


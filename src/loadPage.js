// 渲染页面
const exec = require('child_process').exec;
const config = require('../config/config');

// chrome 指令
const CHROME = config.chrome;

const launchHeadlessChrome = function() {
  let loadPage = loadPageArr.shift();
  if(loadPage == undefined) return;
  exec(`${CHROME} --headless --disable-gpu --dump-dom ${loadPage.url}`, (err, stdout, stderr) => {
    setTimeout(function() {
      global.loadPageNum--;
      launchHeadlessChrome()
    }, 500);
    loadPage.callback(err, stdout, stderr);
  });
}

// 全局变量控制当前浏览器打开数量
global.loadPageNum = 0;
global.initPageNum = 0;

const maxLoadPageNum = config.max_num;
var loadPageArr = [];

const addLoadPageArr = function(url, callback) {

  loadPageArr.push({
    url: url,
    callback: callback
  });

  if(global.loadPageNum < maxLoadPageNum && global.initPageNum < maxLoadPageNum) {
    global.loadPageNum++;
    global.initPageNum++;
    setTimeout(function() {
      launchHeadlessChrome()
    }, 500);
  } 
}

module.exports = addLoadPageArr

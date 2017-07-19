// 渲染页面
const exec = require('child_process').exec;

// chrome 指令
const CHROME = '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome';

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

const maxLoadPageNum = 5;
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

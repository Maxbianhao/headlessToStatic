// 判断当前指令，控制生成模式
var parameter = JSON.parse(process.env.npm_config_argv).original;
var modalList = {};

for(let i = 0;i < parameter.length;i++) {
  let p = parameter[i];
  switch(p) {
    case '--all': modalList.all = true;
      break;
    case '--index': modalList.index = true;
      break;
    case '--startdesign': modalList.startdesign = true;
      break;
    case '--templatecenter-f': modalList.templatecenterF = true;
      break;
    case '--templatecenter-s': modalList.templatecenterS = true;
      break;
    case '--templatecenter-m': modalList.templatecenterM = true;
      break;
  }

  if(/--fid-/.test(p)) {
    modalList.fid = p.replace(/--fid-/, '');
  }

  if(/--sid-/.test(p)) {
    modalList.sid = p.replace(/--sid-/, '');
  }

}

module.exports = modalList;

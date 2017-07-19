const initRoute = function(data, a, b) {

  let route = '';

  for(var i in data) {
    route += `${i}${a}${data[i]}${b}`;
  }

  route = route.substring(0, route.length - 1);

  return route;
}

module.exports = initRoute;

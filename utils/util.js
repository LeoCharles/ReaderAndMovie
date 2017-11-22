// 将豆瓣电影评分 转成[1,1,1,0,0]这样的数组
// todo 半星 转成[1,1,1,5,0]
function coverToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var half = stars.toString().substring(1);
  var array = [];
  for(var i = 0; i <= 4; i++) {
    if(i < num ) {
      array.push(1);
    } else if (i == num) {
      half === '5' ? array.push(5) : array.push(0);
    } else {
      array.push(0);
    }
  }
  return array;
}

module.exports = {
  coverToStarsArray: coverToStarsArray
}
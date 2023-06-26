function formatDate(timestamp) {
  var date = new Date(timestamp);
  var year = date.getFullYear();
  var month = addZero(date.getMonth() + 1);
  var day = addZero(date.getDate());
  // 精确到时分秒
  var hours = addZero(date.getHours());
  var minutes = addZero(date.getMinutes());
  var seconds = addZero(date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  // return year + '-' + month + '-' + day;
}
// 补0
function addZero(num) {
  return num < 10 ? '0' + num : num;
}
export default formatDate;

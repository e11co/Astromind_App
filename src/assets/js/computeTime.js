/* 
  传入 毫秒数，返回 时分秒
*/

let changeTime = function MillisecondToDate(msd) {
  var time = parseFloat(msd) / 1000;
  if (null != time && "" != time) {
    if (time > 60 && time < 60 * 60) {
      time = parseInt(time / 60.0) + "分" + parseInt((parseFloat(time / 60.0) -
        parseInt(time / 60.0)) * 60) + "秒";
    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      time = parseInt(time / 3600.0) + "时" + parseInt((parseFloat(time / 3600.0) -
          parseInt(time / 3600.0)) * 60) + "分" +
        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
    } else {
      time = parseInt(time) + "秒";
    }
  }
  return time;
}
export default changeTime;

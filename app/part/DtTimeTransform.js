import a from './Date';

function getWeek(timestamp) {
  let day = new Date(timestamp * 1000).getDay();
  switch (day) {
    case 1:
      return '星期一';
    case 2:
      return '星期二';
    case 3:
      return '星期三';
    case 4:
      return '星期四';
    case 5:
      return '星期五';
    case 6:
      return '星期六';
    case 7:
      return '星期日';
  }
}

export default DtTimeTransform = function(timestamp) {
  let time = new Date(timestamp * 1000).pattern("yyyy.MM.dd");
  let timeTitle = time + ' ' + getWeek(timestamp);
  return timeTitle;
};
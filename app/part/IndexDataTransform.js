import DtImageTrans from './DtImageTrans';
import _ from 'underscore';
import a from './Date';

export default IndexDataTransform = function(arrays) {
  let d2Array = [];
  let large_card_array = [];
  let anchor_time;
  let enabled_at_format;
  arrays.map((elem,i) => {
    let enabled_at_format = new Date(elem.enabled_at * 1000).pattern("yyyMMdd");
    if (anchor_time !== enabled_at_format) {
      anchor_time = enabled_at_format;
      if(i!==0) {
        d2Array.push(elem.enabled_at);
      }
    }
    if (elem.style === 'large') {
      if (_.has(elem,'image_url')) {
        elem.image_url = DtImageTrans(elem.image_url, true, 792, 440, 'c');
      }
      large_card_array.push(elem);
    }
    if (elem.style === 'small') {
      if (large_card_array.length > 0) {
        d2Array.push(large_card_array);
      }
      large_card_array = [];
      if (_.has(elem,'image_url')) {
        elem.image_url = DtImageTrans(elem.image_url, true, 200, 200, 'c');
      }
      d2Array.push(elem);
    }
  });
  return d2Array;
};
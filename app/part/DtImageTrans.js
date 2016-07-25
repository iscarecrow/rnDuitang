export default DtImageTrans = function(url, t, w, h, c) {
  let newurl = url.replace(/^http(s)?:\/\//ig, '');
  let path = newurl.split('/');
  let domain = path[0];
  let pathn = path[1];
  
  // 只有堆糖域名下 uploads misc 目录下的图片可以缩略
  if (domain.indexOf('duitang.com') == -1 || !pathn || pathn != 'uploads' && pathn != 'misc') {
    return newurl;
  }

  if (t) {
    w = w || 0;
    h = h || 0;
    c = c ? '_' + c : '';
    return this.DtImageTrans(url).replace(/(\.[a-z_]+)$/ig, '.thumb.' + w + '_' + h + c + '$1');
  } else {
    return url.replace(/(?:\.thumb\.\w+|\.[a-z]+!\w+)(\.[a-z_]+)$/ig, '$1');
  }
};
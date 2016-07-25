import Request from '../lib/Request';

export default DtFetch = function(payload) {
  return new Promise((resolve, reject) => {
    const type = payload.type || 'GET';
    const data = payload.data || {};
    if (type === 'GET') {
      Request.get(payload.url).then(json => {
        if (json.status === 1 || json.status === '1') {
          resolve(json)
        } else {
          console.log('api error')
        }
      });
    } 
  });
};
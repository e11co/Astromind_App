let ajax = function(url, params, successCallback, errorCallback){
  let options = {};
   //console.log("util.getToken():"+util.getToken())
  options.headers = {
    // token: ''
  };//请求头
  axios.defaults.timeout = 30000; //超时设置
  console.log("ajax-url:"+url)
  console.log("ajax-headers:"+JSON.stringify(options))
  console.log("ajax-params:"+JSON.stringify(params))
  axios.post(url, params, options)
    .then(function (response) {
      console.log("ajax-data:"+JSON.stringify(response.data))
      successCallback(response.data);
    })
    .catch(function (error) {
      console.log("ajax-error:"+JSON.stringify(error))
      errorCallback(error);
    });
};

export default ajax;
export default function(params){
    return new Promise((resolve,reject) => {
        let token = wx.getStorageSync('token')
        console.log(params);
        
        // 判断super、token来触发reject
        if(!params.data?.password && !token){
            reject('请登录')
        }
        let parameter = {
            headers:{
                "Content-type":"application/json",
            },
            data:{}
        }
        let BASEURL = 
        /* 'http://localhost:3028' */
        'http://47.112.128.68/carServer'
        parameter = Object.assign(parameter,params)

        wx.request({
          url: BASEURL + params.url,
          method:params.method,
          header:params.header,
          data:params.data,

          //成功的回调
          success(res){
              if(res.statusCode === 200){
                  resolve(res.data)
                  wx.hideLoading()
              }else{
                  wx.showToast({
                    title: '请求失败1',
                    icon:'error'
                  })
                  reject(res)
              }
          },

          // 失败回调
          fail(err){
            wx.showToast({
                title: "请求失败2",
                icon: "error",
              });
              reject(err);
          }
        })
    })
}
import request from '../../request/request'

export default class {
    static getProfile(params){
        return request({
            url:'/profile',
            method:'POST',
            data:params
        })
    }
}
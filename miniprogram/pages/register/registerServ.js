import request from '../../request/request'

export default class {
    static registerUser(params){
        return request({
            url:'/registerUser',
            method:'POST',
            data:params
        })
    }
}
import request from '../../request/request'

export default class {
    static loginUser(params){
        return request({
            url:'/loginUser',
            method:'POST',
            data:params
        })
    }
}
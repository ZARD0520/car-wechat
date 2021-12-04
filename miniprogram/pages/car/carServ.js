import request from '../../request/request'

export default class{
    static getLockStatus(params){
        return request({
            url:'/getLockStatus',
            method:'POST',
            data:params
        })
    }
    static setLock(params){
        return request({
            url:'/setLock',
            method:'POST',
            data:params
        })
    }
    static setUnLock(params){
        return request({
            url:'/setUnLock',
            method:'POST',
            data:params
        })
    }
}
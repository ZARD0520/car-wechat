import request from '../../request/request'

export default class {
    static getHistoryPayment(params){
        return request({
            url:'/getHistoryPayment',
            method:'POST',
            data:params
        })
    }
}
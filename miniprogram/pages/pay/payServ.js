import request from '../../request/request'

export default class {
    static getPayment(params){
        return request({
            url:'/getPayment',
            method:'POST',
            data:params
        })
    }

    static onPay(params){
        return request({
            url:'/payPrice',
            method:'POST',
            data:params
        })
    }
}
import request from '../../request/request'

export default class {
    static getParking(){
        return request({
            url:'/getParking',
            method:'POST'
        })
    }

    static searchParking(parklot){
        return request({
            url:'/searchParking',
            method:'POST',
            data:{parklot}
        })
    }
}
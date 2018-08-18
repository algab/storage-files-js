var request = require("request")
var fs = require("fs")

module.exports = (host,nameFolder,nameObject,token,nameSubfolder) => {
    if (nameSubfolder) {
        return new Promise((resolve,reject) => {
            request.delete(`${host}/v1/folders/${nameFolder}/subfolders/${nameSubfolder}/object/${nameObject}`,(err,resp) => {
                if (err) {
                    reject({'Message':'Server Error','num':500})
                }
                else {
                    if (resp.statusCode == 200) {
                        let result = JSON.parse(resp.body)
                        resolve(result) 
                    }
                    else {
                        reject({'Message':'Server Error','num':500})
                    }
                }
            }).auth(null,null,true,token)
        })
    }

    else {
        return new Promise((resolve,reject) => {
            request.delete(`${host}/v1/folders/${nameFolder}/object/${nameObject}`,(err,resp) => {
                if (err) {
                    reject({'Message':'Server Error','num':500})
                }
                else {
                    if (resp.statusCode == 200) {
                        let result = JSON.parse(resp.body)
                        resolve(result)
                    }
                    else {
                        reject({'Message':'Server Error','num':500})
                    }
                }
            }).auth(null,null,true,token)
        })
    }
}
var formidable = require("formidable")
var request = require("request")
var fs = require("fs")

module.exports = (req,host,nameFolder,token,nameSubfolder) => {
    var form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => { })

    if (nameSubfolder) {
        return new Promise((resolve,reject) => {
            form.on("file",(name,file) => {
                let formData = {
                    file: {
                      value: fs.createReadStream(file.path),
                      options: {
                        filename: file.name
                      }
                    }                
                }    
                
                request.post({url:`${host}/v1/folders/${nameFolder}/subfolders/${nameSubfolder}/object`, formData},(err,resp) => {
                    if (err) {
                        reject({'Message':'Not send file','num':500}) 
                    }
                    else {
                        if (resp.statusCode == 200) {
                            let result = JSON.parse(resp.body)
                            resolve(result)                            
                        }
                        else if (resp.statusCode == 401) {
                            reject({'Message':'Unauthorized','num':401})
                        }
                        else if (resp.statusCode == 409) {
                            reject({'Message':'File already exists','num':409})
                        }
                        else {
                            reject({'Message':'Not send file','num':500})
                        }
                    }
                }).auth(null,null,true,token)
            })
        })
    }

    else {
        return new Promise((resolve,reject) => {
            form.on("file",(name,file) => {
                let formData = {
                    file: {
                      value: fs.createReadStream(file.path),
                      options: {
                        filename: file.name
                      }
                    }                
                }    
                
                request.post({url:`${host}/v1/folders/${nameFolder}/object`, formData},(err,resp) => {
                    if (err) {
                        reject({'Message':'Not send file','num':500})
                    }
                    else {
                        if (resp.statusCode == 200) {
                            let result = JSON.parse(resp.body)
                            resolve(result)
                        }
                        else if (resp.statusCode == 401) {
                            reject({'Message':'Unauthorized','num':401})
                        }
                        else if (resp.statusCode == 409) {
                            resolve({'Message':'File already exists','num':409})
                        }
                        else {
                            reject({'Message':'Not send file','num':500})
                        }
                    }
                }).auth(null,null,true,token)
            })
        })
    }
}
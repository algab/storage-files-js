var insert = require("./insert")
var info = require("./info")
var deleteObject = require("./delete")

var storage = {}

storage.insert = (req, host, nameFolder, token, nameSubfolder) => {
    return new Promise((resolve, reject) => {
        if (req && host && nameFolder && token) {
            insert(req, host, nameFolder, token, nameSubfolder)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        }
        else {
            reject({ 'Message': 'Request, Host, NameFolder and Token are required', 'num': 400 })
        }
    })
}

storage.info = (host, nameFolder, nameObject, token, nameSubfolder) => {
    return new Promise((resolve, reject) => {
        if (host && nameFolder && nameObject && token) {
            info(host, nameFolder, nameObject, token, nameSubfolder)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        }
        else {
            reject({ 'Message': 'Host, NameFolder, NameObject and Token are required', 'num': 400 })
        }
    })
}

storage.delete = (host, nameFolder, nameObject, token, nameSubfolder) => {
    return new Promise((resolve, reject) => {
        if (host && nameFolder && nameObject && token) {
            deleteObject(host, nameFolder, nameObject, token, nameSubfolder)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        }
        else {
            reject({ 'Message': 'Host, NameFolder, NameObject and Token are required', 'num': 400 })
        }
    })
}

module.exports = storage
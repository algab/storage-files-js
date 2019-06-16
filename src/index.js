const insert = require('./insert');
const info = require('./info');
const remove = require('./remove');

const ErrorStorage = require('./error');

class Storage {
    constructor(host, bucket, token) {
        this.host = host;
        this.bucket = bucket;
        this.token = token;
        this.insert = this.insert.bind(this);
        this.info = this.info.bind(this);
        this.remove = this.remove.bind(this);
    }

    insert(req, folder) {
        return new Promise((resolve, reject) => {
            if (req) {
                insert(this.host, this.bucket, this.token, req, folder)
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } else {
                reject(new ErrorStorage('Request is required', 400));
            }
        });
    }

    info(nameObject, nameFolder) {
        return new Promise((resolve, reject) => {
            if (nameObject) {
                info(this.host, this.bucket, this.token, nameObject, nameFolder)
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } else {
                reject(new ErrorStorage('Name Object is required', 400));
            }
        });
    }

    remove(nameObject, nameFolder) {
        return new Promise((resolve, reject) => {
            if (nameObject) {
                remove(this.host, this.bucket, this.token, nameObject, nameFolder)
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } else {
                reject(new ErrorStorage('Name Object is required', 400));
            }
        });
    }
}

module.exports = (host, bucket, token) => new Storage(host, bucket, token);

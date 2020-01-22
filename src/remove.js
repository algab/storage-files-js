const request = require('request');

const ErrorStorage = require('./error');

module.exports = (host, nameBucket, token, nameObject, nameFolder) => {
    if (nameFolder) {
        return new Promise((resolve, reject) => {
            request.delete(`${host}/objects/${nameObject}?bucket=${nameBucket}&folder=${nameFolder}`, (err, resp) => {
                if (err) {
                    reject(new ErrorStorage('Server Error', 500));
                } else if (resp.statusCode === 200) {
                    const result = JSON.parse(resp.body);
                    resolve(result);
                } else if (resp.statusCode === 404) {
                    reject(new ErrorStorage('Object not found', 404));
                } else if (resp.statusCode === 401) {
                    reject(new ErrorStorage('Unauthorized', 401));
                } else {
                    reject(new ErrorStorage('Server Error', 500));
                }
            }).auth(null, null, true, token);
        });
    }
    return new Promise((resolve, reject) => {
        request.delete(`${host}/objects/${nameObject}?bucket=${nameBucket}`, (err, resp) => {
            if (err) {
                reject(new ErrorStorage('Server Error', 500));
            } else if (resp.statusCode === 200) {
                const result = JSON.parse(resp.body);
                resolve(result);
            } else if (resp.statusCode === 404) {
                reject(new ErrorStorage('Object not found', 404));
            } else if (resp.statusCode === 401) {
                reject(new ErrorStorage('Unauthorized', 401));
            } else {
                reject(new ErrorStorage('Server Error', 500));
            }
        }).auth(null, null, true, token);
    });
};

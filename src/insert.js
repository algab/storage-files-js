const formidable = require('formidable');
const request = require('request');
const fs = require('fs');

const ErrorStorage = require('./error');

module.exports = (host, nameBucket, token, req, nameFolder) => {
    const form = new formidable.IncomingForm();

    form.parse(req, () => { });

    if (nameFolder) {
        return new Promise((resolve, reject) => {
            form.on('file', (_, file) => {
                const formData = {
                    file: {
                        value: fs.createReadStream(file.path),
                        options: {
                            filename: file.name,
                        },
                    },
                };

                request.post({ url: `${host}/objects/upload?bucket=${nameBucket}&folder=${nameFolder}`, formData }, (err, resp) => {
                    if (err) {
                        reject(new ErrorStorage('Server Error', 500));
                    }
                    if (resp.statusCode === 200) {
                        const result = JSON.parse(resp.body);
                        resolve(result);
                    } else if (resp.statusCode === 401) {
                        reject(new ErrorStorage('Unauthorized', 401));
                    } else if (resp.statusCode === 409) {
                        reject(new ErrorStorage('File already exists', 409));
                    } else {
                        reject(new ErrorStorage('Server Error', 500));
                    }
                }).auth(null, null, true, token);
            });
        });
    }
    return new Promise((resolve, reject) => {
        form.on('file', (_, file) => {
            const formData = {
                file: {
                    value: fs.createReadStream(file.path),
                    options: {
                        filename: file.name,
                    },
                },
            };

            request.post({ url: `${host}/objects/upload?bucket=${nameBucket}`, formData }, (err, resp) => {
                if (err) {
                    reject(new ErrorStorage('Server Error', 500));
                }
                if (resp.statusCode === 200) {
                    const result = JSON.parse(resp.body);
                    resolve(result);
                } else if (resp.statusCode === 401) {
                    reject(new ErrorStorage('Unauthorized', 401));
                } else if (resp.statusCode === 409) {
                    resolve(new ErrorStorage('File already exists', 409));
                } else {
                    reject(new ErrorStorage('Server Error', 500));
                }
            }).auth(null, null, true, token);
        });
    });
};

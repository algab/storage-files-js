# Package Storage Files JS

Package JavaScript for uploading, reading and deleting [Storage Files](https://github.com/algab/storage-files) applications objects.

## Step 1

Install the package.

```
npm install storage-files-js
```

## Step 2

Use the package.

#### Create instance

#####  Attributes:

1 - host (required)
2 - nameBucket (required)
3 - token (required)

```
const storageFiles = require('storage-files-js');
const storage = storageFiles('http://localhost:3001/v1','teste','1234');
```

#### INSERT

#####  Attributes:

1 - request (required)
2 - nameFolder

```
storage.insert(req)
.then(data => {})
.catch(err => {});
```

#### INFO

#####  Attributes:

1 - nameObject (required)
2 - nameFolder

```
storage.info('teste.jpg')
.then(data => {})
.catch(err => {});
```

#### REMOVE

#####  Attributes:

1 - nameObject (required)
2 - nameFolder

```
storage.remove('teste.jpg')
.then(data => {})
.catch(err => {});
```

# Package Storage Files JS

## 1 - INSERT

###  Attributes:

1 - Request (Required)
2 - Host (Required)
3 - nameFolder (Required)
4 - token (Required)
5 - nameSubfolder

### Case:
const storage = require("storage-files-js")
storage.insert(req,"http://localhost:3001","teste","1234")
.then(data => {})
.catch(err => {})

## 2 - INFO

###  Attributes:

1 - Host (Required)
2 - nameFolder (Required)
3 - nameObject (Required)
4 - token (Required)
5 - nameSubfolder

### Case:
const storage = require("storage-files-js")
storage.info("http://localhost:3001","teste","image.png","1234")
.then(data => {})
.catch(err => {})

## 3 - DELETE

###  Attributes:

1 - Host (Required)
2 - nameFolder (Required)
3 - nameObject (Required)
4 - token (Required)
5 - nameSubfolder

### Case:
const storage = require("storage-files-js")
storage.delete("http://localhost:3001","teste","image.png","1234")
.then(data => {})
.catch(err => {})

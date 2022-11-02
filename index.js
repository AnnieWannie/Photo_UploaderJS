const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const app = express()
const PORT = process.env.PORT || 8000


const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        directME = path.join(__dirname, "/users/", req.body.fName + "_" + req.body.lName + "_" + req.body.userName)
            if (fs.existsSync(directME) == false){
                fs.mkdirSync(directME)
                cb(null, directME)
            } else {
                cb(null, directME)
            }
    },
    filename: (req,file,cb) =>{
        cb(null, Date.now() + "-" + file.originalname)
    }, 
})

const uploader = multer({ storage: storageConfig})

app.use("/users/", express.static(__dirname + "/users"))

app.get("/", (req,res) => {
    res.render('./clientsidereact/src/index.js')
})

app.post("/multiple", uploader.array("multi_photos"), (req, res) =>{
    console.log(req.body)
    res.send("Multi upload completed.")
})

app.get("/multiple", (req, res) => {
    let upload_dir = path.join(__dirname, "/users")
    let uploads = fs.readdirSync(upload_dir)
    res.json(uploads)
    console.log(uploads)
    console.log(uploads[0])
    }
)

app.listen(PORT, () => {
console.log("Server has begun")
})
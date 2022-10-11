const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const app = express()
const PORT = process.env.PORT || 8000

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images")
    },
    filename: (req,file,cb) =>{
        cb(null, Date.now() + "-" + file.originalname)
    }, 
})

const uploader = multer({ storage: storageConfig})

app.use("/images/", express.static(__dirname + "/images"))

app.post("/single", uploader.single("photo"), (req,res) => {
    console.log(req.url)
    res.send("Upload completed.")
})

app.get("/single", (req, res) => {
    let upload_dir = path.join(__dirname, "/images")
    let uploads = fs.readdirSync(upload_dir)
    let max = uploads.length - 1;
    let min = 0

    let index = Math.round(Math.random() * (max - min) + min);
    let randomImage = uploads[index]

    res.sendFile(path.join(upload_dir, randomImage))
})

app.post("/multiple", uploader.array("multi_photos", 5), (req, res) =>{
    res.send("Multi upload completed.")
})

app.get("/multiple", (req, res) => {
    let upload_dir = path.join(__dirname, "/images")
    let uploads = fs.readdirSync(upload_dir)
    res.json(uploads)
    console.log(uploads)
   
    }
)

app.listen(PORT, () => {
console.log("Server has begun")
})
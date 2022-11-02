const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const app = express()
const PORT = process.env.PORT || 8000


const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        directME = path.join(__dirname, "/images/",)
            // if (fs.existsSync(directME) == false){
            //     fs.mkdirSync(directME)
                cb(null, directME)
            // } else {
            //     cb(null, directME)
            // }
    },
    filename: (req,file,cb) =>{
        cb(null, req.body.fName + "-" + req.body.lName + "-" + file.originalname)
    }, 
})

const uploader = multer({ storage: storageConfig})

app.use(express.static(__dirname + "/clientsidereact/public"))
app.use(express.static(__dirname + "/images"))


app.post("/submission", uploader.single("user_image_upload"), (req, res) =>{
    console.log(req.body)
    res.send("Submission recieved!")
})

app.get("/submission", (req, res) => {
    let upload_dir = path.join(__dirname, "/images")
    let uploads = fs.readdirSync(upload_dir)
    res.json(uploads)
    console.log(uploads)
    console.log(uploads[0])
    }
)

app.listen(PORT, () => {
console.log("Server has begun")
})

app.get("*", (req,res) => {
    res.sendFile(__dirname + "/clientsidereact/public")
})
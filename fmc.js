const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express();
app.use(express.urlencoded({ extended: true }));




const DB = "mongodb+srv://fmcAdmin:fmcAdmin@fmc-cluster.ccxjriq.mongodb.net/fmcDB?retryWrites=true&w=majority"
mongoose.connect(DB).then(function(){console.log("Connected to MongoDB Atlas")}).catch(function(err){console.log(err)});



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname) )
    }
});

const upload = multer({storage: storage})




const dataSchema = mongoose.Schema({

    fullName: String,
    address: String,
    contactNumber: Number,
    // state: String,

    name: {
        type: String,
        
    },
    image: {
        data: Buffer,
        contentType: String,
    },

    
})

const Child = mongoose.model('Child', dataSchema);



app.get('/', function(req, res){

    res.send("Hello from server")

});


app.post('/', upload.single('image'), function(req, res){

    // console.log(req.file)

    const child = new Child({
        fullName: req.body.fullName,
        address: req.body.address,
        contactNumber: req.body.contactNumber,
        // state: req.body.state,
        name: req.body.image,
        image: {
            data: fs.readFileSync('images/' + req.file.filename),
            contentType: 'image/jpeg'
        }
    })

    child.save()
    .then((res) => {console.log("Image saved!")})
    .catch((res) => {console.log(`Failed to save image ${res}`)})


    // res.write("image uploaded!")
    res.redirect("http://192.168.0.72:3000/add")
});




app.listen(3001, () => {console.log("Server started at port 3001")})

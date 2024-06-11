import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";
import qr from "qr-image";
import fs from "fs";

const app = express();
const port=3000;
const __dirname=dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/submit", (req,res)=> {
    const url = req.body["url"];
    var qr_svg = qr.image(url,{type:'png'});
    var qrPath = __dirname+'/public/qr_img.png';
    qr_svg.pipe(fs.createWriteStream(qrPath));

    qr_svg.on('end',()=>{
        res.redirect('/');
    });
});

app.listen(port,()=>{
    console.log('server is running on port'+port);
});
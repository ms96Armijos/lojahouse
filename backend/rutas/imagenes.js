let express = require('express');
const path = require('path');
const fs = require('fs');

let app = express();

app.get("/:tipo/:img", (req, res, next) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${img}`);
    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen);
    }else{
        let pathInvalido = path.resolve(__dirname, '../assets/no-img.jpg');
        res.sendFile(pathInvalido);
    }
});

module.exports = app;
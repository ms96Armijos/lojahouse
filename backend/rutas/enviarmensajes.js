let express = require("express");
let mailer  = require('nodemailer');
let xoauth2 = require('xoauth2');
let app = express();



//CREAR UN NUEVO USUARIO
app.post("/", (req, res) => {

  /*let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'testplagios@gmail.com',
      pass: 'plagios123'
    },
    debug: true, // show debug output
    logger: true // log information in console
  });*/


  var transport = mailer.createTransport({
    service: 'gmail',
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
        user: 'corp.lojahouse@gmail.com',
        clientId: '1060101136175-9gov66nqbtamj95rcpd0s3vlub7meofa.apps.googleusercontent.com',
        clientSecret: 'uhEmKW4wnavQxUUB_cKdlwm-',
        refreshToken: '1//04S40eBcUOyQeCgYIARAAGAQSNwF-L9IrW4cH9UYw2OXi_nsTSsQa6Qcad6nBoDwuZsxQOlk_PaDaArbNLnki_DJEl5oKBZIumC8'
      })
   },debug: true, // show debug output
    logger: true
    });


    var mailOptions = {
      from: '"LojaHouse" <corp.lojahouse@gmail.com>',
      to: 'testplagios@gmail.com',
      subject: 'Subject ',
      text: 'Some thing',
    };
  
    transport.sendMail(mailOptions, function (error, response){
      if(error){
         return console.log(error);   // Always giving Error: connect ETIMEDOUT 74.125.140.108:465
      }
          console.log(mailer.getTestMessageUrl(response));
      
  });
  
  });

  module.exports = app;
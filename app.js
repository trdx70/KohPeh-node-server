const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
//const cors = require('cors');

const app = express();

//app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = process.env.PORT;

app.get('/', (req, res)=>{
    res.send('<h3>Nodejs</h3>');
});

app.post('/send', (req, res)=>{
  
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
      <li>Message: ${req.body.message}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'mail.smtp.com',
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'user', // generated ethereal user
            pass: 'pass'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"test" <test@test.com>', // sender address
        to: 'strinidad70@yahoo.com', // list of receivers
        subject: 'Job Posting', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    //  send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


        res.json({result: "Success, thank you!"});

});

});


app.listen(port, ()=>{
    console.log(`Server running in port ${port}`);
});

module.exports = app;

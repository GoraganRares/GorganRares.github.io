const express = require('express')
const app = express();

const nodemailer = require("nodemailer")

const PORT = process.env.PORT || 5500;

//MIddleware
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res)=>{
    console.log(req.body);

    const trasnporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'emailt138@gmail.com',
            pass: 'Rares1noiembrie'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'emailt138@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}, ${req.body.phone}`,
        text: req.body.message
    }

    trasnporter.sendMail(mailOptions, (error, info)=>{
        if (error){
            console.log(error);
            res.send('error');
        }else {
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })

})


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
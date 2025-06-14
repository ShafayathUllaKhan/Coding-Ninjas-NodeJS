
// 1. import nodemailer

const nodemailer = require('nodemailer');

// 2. configure email and send it.

async function sendMail() {
    
    // 1. Create an email transporter.(app -- email server -- which ever mail given)
    // SMTP (simple mail transfer protocol)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shafayathullakhan1998@gmail.com',
            pass: 'pnel ccmo tdtv ahau'
        }
    }
    )

    // 2. configure email content
    const mailOptions = {
        from: 'shafayathullakhan1998@gmail.com',
        to: 'shafayathullakhan1998@gmail.com',
        subject:'Welcome to Nodejs App',
        text: 'This is an email using nodemailer in nodejs'
    }

    // 3. send the email.

    try{
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }catch(err){
        console.log('Email send failed with error: '+ err);
    }

}

sendMail();
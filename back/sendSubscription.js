const nodemailer = require('nodemailer');
let otps;

const sendSubscription = (email, subscription) =>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: 'khansaif86783@gmail.com',
          pass: 'kdkreedyvjjezvjs',
        },
      });
      
        transporter.verify().then(console.log).catch(console.error);
      
        transporter.sendMail({
        from: {
            name: "Jeweallity",
            address: "khansaif86783@gmail.com"
        },
        to : email,
        subject: "Loyal customer from Jeweallti",
        text: 'this jeweallity',
        html: `<h1>you had purchased subscription</h1></br><p>
        Thank you!
        </p>`
    }).then((info)=>{
        console.log({info});
    }).catch(console.error);
}



module.exports = {sendSubscription}
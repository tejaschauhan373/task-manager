const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'dram14tejas@gmail.com',
        subject: 'This is your first creation',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'dram14tejas@gmail.com',
        subject: 'Sorry to see ypu go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon`
    })
}

module.exports = {
    sendWelcomeEmail, sendCancelationEmail
}
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => { 
    const msg = {
        to: email,
        from: 'csalestelles@gmail.com',
        subject: 'Welcome to Task App',
        text: `Welcome to the Task App, ${name}.`
    }

    // send() returns a promise
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((err) => {
            console.log(err)
        })
}

const sendCancellationEmail = (email, name) => { 
    const msg = {
        to: email,
        from: 'csalestelles@gmail.com',
        subject: 'We are sad you are living',
        text: `Hi, ${name}.\n\nWe are sad that you leaving our app. Please let us know why you left.`
    }

    // send() returns a promise
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
// const msg = {
//   to: 'caio_atelles@live.com', // Change to your recipient
//   from: 'csalestelles@gmail.com', // Change to your verified sender
//   subject: 'Task App Reminder',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
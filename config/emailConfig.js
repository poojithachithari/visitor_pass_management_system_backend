const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    family: 4,
    auth:{
        user:process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendApprovalEmail = async (toEmail, visitorName, appointmentDate, appointmentTime) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Appointment Approved',
        html: `
            <h2>Your appointment has been approved!</h2>
            <p>Dear ${visitorName},</p>
            <p>Your appointment on <b>${appointmentDate}</b> at <b>${appointmentTime}</b> has been approved.</p>
            <p>Thank You</p>
        `
    }
    await transporter.sendMail(mailOptions)
}

module.exports = { transporter, sendApprovalEmail }
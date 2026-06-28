const { Resend } = require('resend')
const resend = new Resend(process.env.RESEND_API_KEY)

const sendApprovalEmail = async (toEmail, visitorName, appointmentDate, appointmentTime) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: toEmail,
        subject: 'Appointment Approved',
        html: `
            <h2>Your appointment has been approved!</h2>
            <p>Dear ${visitorName},</p>
            <p>Your appointment on <b>${appointmentDate}</b> at <b>${appointmentTime}</b> has been approved.</p>
            <p>Thank You</p>
        `
    })
}

module.exports = { sendApprovalEmail }
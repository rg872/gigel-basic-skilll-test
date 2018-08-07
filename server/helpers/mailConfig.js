const nodemailer = require('nodemailer')
const CustomError = require('./customError')

const adminEmail = process.env.EMAIL
const adminEmailPass = process.env.EMAIL_PASS

module.exports = {
    async sendRegisterEmail (userEmail) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: adminEmail,
                    pass: adminEmailPass
                }
            })

            let mailOptions = {
                from: adminEmail,
                to: userEmail,
                subject: 'Gigel Daftar Akun',
                text: 'Terima kasih sudah mendaftar dengan Gigel. Selamat menikmati layanan kami'
            }

            await transporter.sendMail(mailOptions)
        } catch (error) {
            throw new CustomError('Error, failed sending email to new user', 500)
        }
    }
}
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendVerificationEmail(to: string, code: string) {
  const mailOptions = {
    from: `"Connectix2" <${process.env.EMAIL_USER}>`,
    to,
    subject: "【Connectix2】認証コードのご案内",
    html: `
      <p>以下の認証コードを5分以内に入力してください：</p>
      <h2 style="color: #333;">${code}</h2>
      <p>このコードの有効期限は5分です。</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`✅ 認証メール送信済み: ${to}`)
  } catch (error) {
    console.error("❌ 認証メール送信失敗:", error)
    throw error
  }
}

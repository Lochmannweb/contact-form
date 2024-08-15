
export default async function handler(req, res) {
    if (req.method === "POST") {
        const nodemailer = require("nodemailer");
        const {fullName, phone, email, message} = req.body;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        try {
            await transporter.sendMail({
                from: email,
                to: "Lochmannweb@gmail.com",
                subject: `New Contact Form Submission from ${fullName}`,
                html: `
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
                `,
            });

            res.status(200).json({ message: "Email sent successfully!"});
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ message: "Failed to send email"});
        } 
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}


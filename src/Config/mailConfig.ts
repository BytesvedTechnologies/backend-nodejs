import nodemailer from "nodemailer";

const emailVerificationMail = async (
    firstName: string,
    lowerEmailId: string,
    verifyEmailToken: string
) => {
    const link = `http://127.0.0.1:3000/user/verify-email/${verifyEmailToken}`;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: true,
            auth: {
                user: process.env.SENDER_EMAIL as string,
                pass: process.env.PASSWORD as string,
            },
        });

        await transporter.sendMail({
            from: {
                name: "E-Com Demo App!",
                address: process.env.SENDER_EMAIL as string,
            },
            to: lowerEmailId,
            subject: "Welcome to the E-Com Demo App!",
            html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - Your Snake Game</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            /* Ensure rounded corners are not cut off */
        }

        .header {
            background-color: #7db9f9;
            border-radius: 10px 10px 0 0;
            color: #fff;
            text-align: center;
            padding: 20px 0;
        }

        .content {
            padding: 40px;
        }

        h1 {
            color: #333;
            margin-bottom: 20px;
            text-align: center;
            font-size: 24px;
        }

        p {
            color: #555;
            margin-bottom: 20px;
            line-height: 1.6;
        }

        .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: #71b3fb;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .btn:hover {
            background-color: #289eff;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
            color: #888888;
            padding: 20px 0;
            background-color: #f2f2f2;
        }

        /* Responsive Styles */
        @media screen and (max-width: 600px) {
            .content {
                padding: 20px;
            }

            .header {
                padding: 15px 0;
            }

            h1 {
                font-size: 20px;
            }

            .btn {
                padding: 10px 20px;
            }
        }
    </style>
</head>

<body>

    <div class="container">

        <div class="header">
            <h2>Email Verification - Your Snake Game</h2>
        </div>

        <div class="content">
            <h1>Verify Your Email</h1>

            <p>Hello ${firstName},</p>

            <p>Click the button below to verify your email address and start enjoying <strong>Your Snake Game</strong>:
            </p>

            <p><a href="${link}" class="btn">Verify Email</a></p>

            <p>If you didn't register with <strong>Your Snake Game</strong>, please ignore this email.</p>
        </div>

    </div>

</body>

</html>
        `,
        });
    } catch (error) {
        console.log("Oops, there are some error in to send mail info.. " + error);
    }
};

export default emailVerificationMail;

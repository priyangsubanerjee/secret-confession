/* eslint-disable import/no-anonymous-default-export */
import nodemailer from "nodemailer";

export default async function (req, res) {
  const { method } = req;
  const { to, subject, html, text } = req.body;

  switch (method) {
    case "POST":
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NEXT_PUBLIC_EMAIL,
          pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
        },
      });

      var options = {
        from: `Secret confession <${process.env.NEXT_PUBLIC_EMAIL}>`,
        to,
        subject,
        html,
        text,
      };

      transporter.sendMail(options, function (err, info) {
        console.log("Sending mail");
        if (err) {
          console.log(err);
          res.send("Error");
        } else {
          res.send("Success");
        }
      });

      break;

    default:
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
  }
}

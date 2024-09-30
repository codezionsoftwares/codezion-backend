// const express = require("express");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http"],
//   })
// ); // Allow CORS for cross-origin requests
// app.use(bodyParser.json()); // Parse incoming request body

// // Email configuration
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587, // Use 465 for SSL
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: "ramkesh690@gmail.com", // Your email address
//     pass: "idaiffufuiciaxbn", // Your app-specific password
//   },
//   tls: {
//     rejectUnauthorized: false, // Accept self-signed certificates (if needed)
//   },
// });

// // Endpoint to send email
// app.post("/send-email", async (req, res) => {
//   const { name, email, subject, message, phone } = req.body;

//   // Validate the email format (simple regex check)
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return res
//       .status(400)
//       .json({ success: false, error: "Invalid email format" });
//   }

//   try {
//     await transporter.sendMail({
//       from: email, // Set dynamic sender email
//       to: "ramkesh690@gmail.com", // Your email to receive
//       subject: `New Contact Form Submission: ${subject}`,
//       html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p><p>Phone: ${phone}</p>`,
//     });

//     res.json({ success: true });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ success: false, error: "Failed to send email" });
//   }
// });

// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://codezion-iwci.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
); // Allow CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming request body

// Test route for Vercel deployment
app.get("/", (req, res) => {
  res.send("The server is running on Vercel!");
});

// Email configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Use 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: "ramkesh690@gmail.com", // Your email address
    pass: "idaiffufuiciaxbn", // Your app-specific password
  },
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates (if needed)
  },
});

// Endpoint to send email
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message, phone } = req.body;

  // Validate the email format (simple regex check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid email format" });
  }

  try {
    await transporter.sendMail({
      from: email, // Set dynamic sender email
      to: "ramkesh690@gmail.com", // Your email to receive
      subject: `New Contact Form Submission: ${subject}`,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p><p>Phone: ${phone}</p>`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

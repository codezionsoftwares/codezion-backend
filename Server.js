const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://codezion-iwci.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Test route for Vercel deployment
app.get("/", (req, res) => {
  res.send("The server is running on Vercel!");
});

// Email configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "ramkesh690@gmail.com",
    pass: "idaiffufuiciaxbn",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Endpoint to receive form data and send the email
app.post('/send-email', upload.single('resume'), async (req, res) => {
  const { name, email, phone, position, message } = req.body;
  const resume = req.file;

  // Validate the email format
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(email)) {
  //   return res.status(400).json({ success: false, error: "Invalid email format" });
  // }

  try {
    await transporter.sendMail({
      from: email,
      to: 'ramkesh690@gmail.com',
      subject: `New Job Application for ${position}`,
      html: `
        <h3>Job Application</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
      attachments: resume ? [{ filename: resume.filename, path: resume.path }] : [],
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

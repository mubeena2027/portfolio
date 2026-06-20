const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Route
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  console.log("Incoming:", name, email, message);

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // default test sender
      to: "shaikmubeenam6@gmail.com", // <-- CHANGE THIS
      subject: `Message from ${name}`,
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    console.log("Email sent:", response);

    res.json({ success: true });

  } catch (err) {
    console.error("Email Error:", err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.get("/test", async (req, res) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "shaikmubeenam6@gmail.com", // <-- PUT YOUR EMAIL
      subject: "Test",
      text: "It works"
    });

    res.json({ success: true, data });

  } catch (err) {
    console.error(err);
    res.json({ error: err.message });
  }
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
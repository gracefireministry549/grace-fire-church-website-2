const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/prayer-request", (req, res) => {
  const { name, phone, prayer } = req.body;
  if (!name || !prayer) return res.status(400).json({ success: false, message: "Please provide your name and prayer request." });
  console.log("NEW PRAYER REQUEST", { name, phone, prayer, date: new Date().toISOString() });
  res.json({ success: true, message: "Your prayer request has been received. God bless you." });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !message) return res.status(400).json({ success: false, message: "Please complete the required fields." });
  console.log("NEW CONTACT MESSAGE", { name, email, message, date: new Date().toISOString() });
  res.json({ success: true, message: "Your message has been received." });
});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(PORT, () => console.log(`Grace Fire website running on port ${PORT}`));

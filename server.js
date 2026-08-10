const express = require("express");
const path = require("path");
const PDFDocument = require("pdfkit");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const sermons = [
  {
    id: "1", slug: "walking-in-god-s-grace", title: "Walking in God's Grace", scripture: "Ephesians 2:8-9",
    summary: "Grace is God's undeserved kindness reaching toward us. We do not earn salvation by trying to become good enough; we respond to what God has offered through Christ.",
    points: ["Grace is a gift, not a reward.", "Grace gives us a new identity.", "Grace teaches us to forgive and show mercy.", "Grace empowers us to live differently.", "Grace gives hope when we fail."],
    application: "Begin each day by thanking God for His grace. Refuse to measure your worth only by your mistakes or achievements. Ask God to help you extend mercy to others.",
    prayer: "Father, thank You for Your grace. Help me to walk in humility, obedience and gratitude. Let Your grace strengthen me when I am weak and help me show grace to others. Amen."
  },
  {
    id: "2", slug: "the-power-of-prayer", title: "The Power of Prayer", scripture: "Jeremiah 33:3",
    summary: "Prayer is fellowship with God: speaking honestly, listening through His Word, giving thanks, confessing, interceding and seeking direction.",
    points: ["Pray with faith and sincerity.", "Pray consistently, not only during emergencies.", "Pray for other people.", "Let Scripture guide your prayers.", "Combine prayer with thanksgiving."],
    application: "Set aside a regular time for prayer. Keep a short prayer list and record answers so you can remember God's faithfulness.",
    prayer: "Lord, teach me to pray. Give me a faithful heart that seeks You in every season. Help me trust Your wisdom, wait patiently and pray for others with love. Amen."
  },
  {
    id: "3", slug: "faith-that-stands-firm", title: "Faith That Stands Firm", scripture: "Hebrews 11:1",
    summary: "Faith is confident trust in God even when we cannot see the entire road ahead. Biblical faith chooses to trust God's character in the middle of difficulty.",
    points: ["Faith looks beyond present circumstances.", "Faith grows through God's Word.", "Faith produces obedience.", "Faith gives courage in difficult seasons.", "Faith keeps hope alive."],
    application: "Write down three promises from Scripture that encourage you. Read them, pray over them and choose one practical step of obedience today.",
    prayer: "Father, strengthen my faith. When I am uncertain, help me remember Your faithfulness. Give me courage to obey You and patience to trust Your timing. Amen."
  },
  {
    id: "4", slug: "the-fire-of-the-holy-spirit", title: "The Fire of the Holy Spirit", scripture: "Acts 1:8",
    summary: "The Holy Spirit empowers believers to live as witnesses for Christ. Spiritual power is given for holy living, courageous service and pointing people toward Jesus.",
    points: ["The Holy Spirit empowers believers.", "Spiritual power should produce Christlike character.", "The Spirit helps us serve with courage.", "God's presence should affect everyday choices.", "We should seek to be useful, not impressive."],
    application: "Ask God daily for wisdom, courage and a heart willing to serve. Look for one person you can encourage, help or pray for.",
    prayer: "Holy Spirit, guide my life. Give me courage to represent Christ, wisdom to make good choices and love to serve people. Let my life point others toward Jesus. Amen."
  },
  {
    id: "5", slug: "healing-and-hope", title: "Healing and Hope", scripture: "Psalm 147:3",
    summary: "God cares about people who are hurting. Hope does not mean ignoring pain; it means refusing to believe that pain is the final word.",
    points: ["God sees hurting hearts.", "We should bring our pain honestly to God.", "We should support people who are struggling.", "Hope grows when we remember God's faithfulness.", "Healing and restoration can involve a process."],
    application: "Reach out to someone who may need encouragement. Pray with compassion and listen without judging. Encourage appropriate help when it is needed.",
    prayer: "Father, bring comfort to those who are hurting. Give us wisdom to support one another and courage to seek appropriate help when it is needed. Fill our hearts with hope. Amen."
  },
  {
    id: "6", slug: "serving-with-love", title: "Serving With Love", scripture: "Mark 10:45",
    summary: "Christian service is not about being noticed; it is about love expressed through action. Jesus modeled servant leadership by putting the needs of others before status.",
    points: ["Service begins with humility.", "Everyone has something valuable to contribute.", "Small acts of service can have a large impact.", "Healthy service includes wisdom and boundaries.", "We serve because Christ first loved us."],
    application: "Choose one practical way to help your family, church or community this week. Do it without waiting for applause.",
    prayer: "Jesus, teach me to serve with humility and love. Show me where I can make a difference. Help me serve faithfully without seeking recognition. Amen."
  },
  {
    id: "7", slug: "a-new-beginning", title: "A New Beginning", scripture: "2 Corinthians 5:17",
    summary: "The gospel announces that a new beginning is possible in Christ. Our past can teach us, but it does not have to become a permanent definition of our future.",
    points: ["Christ gives new identity.", "The past does not have to control the future.", "New beginnings require new choices.", "Growth happens step by step.", "God can use restored lives to encourage others."],
    application: "Identify one unhealthy pattern you want to leave behind and one godly habit you want to build. Ask a trusted mature Christian for accountability and encouragement.",
    prayer: "Father, thank You for new beginnings. Help me leave behind what needs to be left behind and walk faithfully into what You have prepared. Give me wisdom, courage and perseverance. Amen."
  }
];

app.get("/sermons/:slug.pdf", (req, res) => {
  const sermon = sermons.find(s => s.slug === req.params.slug);
  if (!sermon) return res.status(404).send("Sermon not found");

  const doc = new PDFDocument({ size: "A4", margin: 52 });
  const filename = `grace-fire-sermon-${sermon.id}-${sermon.slug}.pdf`;
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
  doc.pipe(res);

  doc.fillColor("#4C1D95").fontSize(11).font("Helvetica-Bold")
    .text("GRACE FIRE DELIVERANCE HEALING GLOBAL WORLD MINISTRY", { align: "center" });
  doc.moveDown(1.5);
  doc.fillColor("#B45309").fontSize(25).font("Helvetica-Bold")
    .text(sermon.title, { align: "center" });
  doc.moveDown(.5);
  doc.fillColor("#0E7490").fontSize(12).font("Helvetica-Bold")
    .text(`Main Scripture: ${sermon.scripture}`, { align: "center" });
  doc.moveDown(1.5);

  doc.fillColor("#22223B").fontSize(12).font("Helvetica")
    .text(sermon.summary, { lineGap: 5 });
  doc.moveDown(1);

  doc.fillColor("#B45309").fontSize(16).font("Helvetica-Bold").text("Key Lessons");
  doc.moveDown(.4);
  sermon.points.forEach((point, i) => {
    doc.fillColor("#22223B").fontSize(11).font("Helvetica")
      .text(`${i + 1}. ${point}`, { indent: 10, lineGap: 3 });
    doc.moveDown(.25);
  });

  doc.moveDown(.8);
  doc.fillColor("#B45309").fontSize(16).font("Helvetica-Bold").text("Practical Application");
  doc.moveDown(.4);
  doc.fillColor("#22223B").fontSize(11).font("Helvetica")
    .text(sermon.application, { lineGap: 5 });

  doc.moveDown(1);
  doc.fillColor("#B45309").fontSize(16).font("Helvetica-Bold").text("Prayer");
  doc.moveDown(.4);
  doc.fillColor("#4C1D95").fontSize(11).font("Helvetica-Oblique")
    .text(sermon.prayer, { lineGap: 5 });

  doc.moveDown(2);
  doc.fillColor("#667085").fontSize(9).font("Helvetica")
    .text("Original teaching resource prepared for the Grace Fire Ministry website.", { align: "center" });
  doc.end();
});

app.get("/api/sermons", (req, res) => {
  res.json(sermons.map(({ id, slug, title, scripture }) => ({ id, slug, title, scripture, pdf: `/sermons/${slug}.pdf` })));
});

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

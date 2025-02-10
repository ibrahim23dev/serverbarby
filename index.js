require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Portfolio Schema
const PortfolioSchema = new mongoose.Schema({
  bannerImage: String,
  title: String,
  description: String,
  technologies: [String],
  keyFeatures: [String],
});
const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

// Business Solutions Schema
const BusinessSolutionSchema = new mongoose.Schema({
  title: String,
  description: String,
  bannerImage: String,
});
const BusinessSolution = mongoose.model("BusinessSolution", BusinessSolutionSchema);

// Partner Schema
const PartnerSchema = new mongoose.Schema({
  image: String,
  name: String,
});
const Partner = mongoose.model("Partner", PartnerSchema);

// Testimonial Schema
const TestimonialSchema = new mongoose.Schema({
  name: String,
  image: String,
  feedback: String,
});
const Testimonial = mongoose.model("Testimonial", TestimonialSchema);

// CRUD Routes for Portfolio
app.post("/portfolio", async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send(
     "Server is up and running on port 5000"
);
});
app.get("/portfolio", async (req, res) => {
  res.json(await Portfolio.find());
});
app.put("/portfolio/:id", async (req, res) => {
  res.json(await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});
app.delete("/portfolio/:id", async (req, res) => {
  res.json(await Portfolio.findByIdAndDelete(req.params.id));
});

// CRUD Routes for Business Solutions
app.post("/business", async (req, res) => {
  res.json(await new BusinessSolution(req.body).save());
});
app.get("/business", async (req, res) => {
  res.json(await BusinessSolution.find());
});
app.put("/business/:id", async (req, res) => {
  res.json(await BusinessSolution.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});
app.delete("/business/:id", async (req, res) => {
  res.json(await BusinessSolution.findByIdAndDelete(req.params.id));
});

// CRUD Routes for Partners
app.post("/partners", async (req, res) => {
  res.json(await new Partner(req.body).save());
});
app.get("/partners", async (req, res) => {
  res.json(await Partner.find());
});
app.put("/partners/:id", async (req, res) => {
  res.json(await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});
app.delete("/partners/:id", async (req, res) => {
  res.json(await Partner.findByIdAndDelete(req.params.id));
});

// CRUD Routes for Testimonials
app.post("/testimonials", async (req, res) => {
  res.json(await new Testimonial(req.body).save());
});
app.get("/testimonials", async (req, res) => {
  res.json(await Testimonial.find());
});
app.put("/testimonials/:id", async (req, res) => {
  res.json(await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});
app.delete("/testimonials/:id", async (req, res) => {
  res.json(await Testimonial.findByIdAndDelete(req.params.id));
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

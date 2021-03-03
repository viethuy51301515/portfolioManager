const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ extended: true }));
app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.use("/api/test", require("./routes/api/test"));
app.use("/api/experience", require("./routes/api/experience"));
app.use("/api/achivement", require("./routes/api/achivement"));
app.use("/api/portfolio", require("./routes/api/portfolio"));
app.use("/api/skill", require("./routes/api/skill"));
app.use("/api/infor", require("./routes/api/Infor"));
app.listen(PORT, () => console.log("API is running"));

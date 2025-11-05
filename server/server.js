import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.post("/api/fields", (req, res) => {
  console.log("Received JSON:", req.body);
  res.json({ status: "ok", data: req.body });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

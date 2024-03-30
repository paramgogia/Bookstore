import express from "express";
import { PORT, mongoDBURL } from './config.js';
import mongoose from "mongoose";
import cors from "cors";
import bookRoutes from "./routes/booksRoutes.js";
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  console.log(req);
  return res.status(500).send("Param is here");

});

app.use('/books', bookRoutes);

mongoose.connect(mongoDBURL).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.log("Error: ", err);
});

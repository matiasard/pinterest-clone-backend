import 'dotenv/config';
import express from "express";
import { imagesRouter } from "./routes/images.routes";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api/image", imagesRouter);

app.get("/", (_req, res) => {
  res.send("Hello World!");
}); 

app.listen(port, () => {
  console.log(`Server is LIVE`);
  console.log(`Server is LIVE on port ${port}`);
});

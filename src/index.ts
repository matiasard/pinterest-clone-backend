import 'dotenv/config';
import express from "express";
import cors from "cors";
import { imagesRouter, authRouter, userRouter } from "./routes/index";
import { getConfig } from './config/serverconfig';

const port = process.env.PORT || 3000;
const app = express();
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({ origin: "https://pinterest-clone-frontend-git-main-matiasard.vercel.app/", credentials: true }));
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/image", imagesRouter);

app.get("/", (_req, res) => {
  res.send("Hello World!");
}); 

app.listen(port, () => {
  getConfig();
  console.log(`Server is LIVE on port ${port}`);
});

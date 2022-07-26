import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db";
import indexRouter from "./routes/index";
import urlRouter from "./routes/url";
import getUrlRouter from "./routes/GetUrlData";
import testAPI from "./routes/TestAPI";

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", indexRouter);
app.use("/api/test", testAPI);
app.use("/api/url", urlRouter);
app.use("/api/data", getUrlRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"));
  });
}

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

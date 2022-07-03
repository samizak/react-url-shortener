import express from "express";
import config from "../config/config";
import UrlShortenerSchema from "../models/Url";

const router = express.Router();

router.get("/:code", async (req, res) => {
  try {
    const baseUrl: string = config.baseUrl;

    const url = await UrlShortenerSchema.findOne({
      shortUrl: baseUrl + "/" + req.params.code,
    });

    if (url) return res.json(url);

    return res.status(404).json("Invalid Code!");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Failed to retrieve URL Data...");
  }
});

export default router;

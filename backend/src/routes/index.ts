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

    if (url) {
      // Update views count in database
      await UrlShortenerSchema.updateOne(
        { shortUrl: baseUrl + "/" + req.params.code },
        { $set: { views: url.views + 1 } }
      );

      return res.redirect(url.longUrl);
    }

    return res.status(404).send("Short URL does not exist!");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

export default router;

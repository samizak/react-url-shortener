import express from "express";
import shortid from "shortid";
import UrlShortenerSchema from "../models/Url";
import validator from "validator";
import config from "../config/config";

const router = express.Router();

function isValidHttpUrl(str: string) {
  let url;

  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

const validate = (value: string) => {
  return validator.isURL(value);
};

router.post("/shorten", async (req, res) => {
  let { longUrl }: { longUrl: string } = req.body;
  const baseUrl: string = config.baseUrl;

  if (!isValidHttpUrl(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  const urlCode = shortid.generate();

  if (!validate(longUrl)) {
    return res.status(401).json("Invalid long URL");
  }

  // if HTTP/HTTPS not added by default, add it!
  // if (
  //   longUrl.includes(".") &&
  //   (!longUrl.startsWith("http://") || !longUrl.startsWith("https://"))
  // ) {
  //   longUrl = "http://" + longUrl;
  // }

  if (!isValidHttpUrl(longUrl)) {
    return res.status(401).json("Invalid long URL");
  }

  try {
    let url: any = await UrlShortenerSchema.findOne({ longUrl });
    // Check if URL already exists and return it
    if (url) return res.json(url);

    const shortUrl = baseUrl + "/" + urlCode;

    url = new UrlShortenerSchema({
      longUrl,
      shortUrl,
      date: new Date(),
    });

    await url.save();

    return res.json(url);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

export default router;

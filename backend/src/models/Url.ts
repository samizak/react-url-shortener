import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: { type: String, required: true, unique: true },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
  date: { type: String, default: Date.now },
});

export default mongoose.model("UrlShortenerSchema", urlSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shortid_1 = __importDefault(require("shortid"));
const Url_1 = __importDefault(require("../models/Url"));
const validator_1 = __importDefault(require("validator"));
const config_1 = __importDefault(require("../config/config"));
const router = express_1.default.Router();
function isValidHttpUrl(str) {
    let url;
    try {
        url = new URL(str);
    }
    catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
const validate = (value) => {
    return validator_1.default.isURL(value);
};
router.post("/shorten", async (req, res) => {
    let { longUrl } = req.body;
    const baseUrl = config_1.default.baseUrl;
    if (!isValidHttpUrl(baseUrl)) {
        return res.status(401).json("Invalid base url");
    }
    const urlCode = shortid_1.default.generate();
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
        let url = await Url_1.default.findOne({ longUrl });
        // Check if URL already exists and return it
        if (url)
            return res.json(url);
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url_1.default({
            longUrl,
            shortUrl,
            date: new Date(),
        });
        await url.save();
        return res.json(url);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json("Server error");
    }
});
exports.default = router;

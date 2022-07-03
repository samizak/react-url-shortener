"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../config/config"));
const Url_1 = __importDefault(require("../models/Url"));
const router = express_1.default.Router();
router.get("/:code", async (req, res) => {
    try {
        const baseUrl = config_1.default.baseUrl;
        const url = await Url_1.default.findOne({
            shortUrl: baseUrl + "/" + req.params.code,
        });
        if (url) {
            // Update views count in database
            await Url_1.default.updateOne({ shortUrl: baseUrl + "/" + req.params.code }, { $set: { views: url.views + 1 } });
            return res.redirect(url.longUrl);
        }
        return res.status(404).send("Short URL does not exist!");
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});
exports.default = router;

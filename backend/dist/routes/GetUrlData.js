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
        if (url)
            return res.json(url);
        return res.status(404).json("Invalid Code!");
    }
    catch (err) {
        console.error(err);
        return res.status(500).json("Failed to retrieve URL Data...");
    }
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const urlSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("UrlShortenerSchema", urlSchema);

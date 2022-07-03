"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config/config"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    res.json("API is working fine!");
});
router.get("/database", async (req, res) => {
    if (config_1.default.mongooseURI === "") {
        res.status(500).json("mongooseURI cannot be empty!");
        process.exit(1);
    }
    try {
        await mongoose_1.default
            .connect(config_1.default.mongooseURI, {
            useNewUrlParser: true,
        })
            .then(() => res.json("Database connected!"));
    }
    catch (e) {
        res.status(500).json("Failed to connect to MongoDB database!");
    }
});
exports.default = router;

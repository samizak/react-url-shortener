"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
async function ConnectDB() {
    if (config_1.default.mongooseURI === "") {
        console.error("mongooseURI cannot be empty!");
        process.exit(1);
    }
    try {
        await mongoose_1.default
            .connect(config_1.default.mongooseURI, {
            useNewUrlParser: true,
        })
            .then(() => console.log("Database connected!"));
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}
exports.default = ConnectDB;

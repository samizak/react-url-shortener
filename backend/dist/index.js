"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./config/db"));
const index_1 = __importDefault(require("./routes/index"));
const url_1 = __importDefault(require("./routes/url"));
const GetUrlData_1 = __importDefault(require("./routes/GetUrlData"));
const TestAPI_1 = __importDefault(require("./routes/TestAPI"));
const PORT = process.env.PORT || 5000;
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", index_1.default);
app.use("/api/test", TestAPI_1.default);
app.use("/api/url", url_1.default);
app.use("/api/data", GetUrlData_1.default);
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../../frontend/build", "index.html"));
});
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

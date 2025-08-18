"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../database/db"));
const attendeeRoutes_1 = __importDefault(require("../routes/attendeeRoutes"));
const app = (0, express_1.default)();
const PORT = 3006;
dotenv_1.default.config();
(0, db_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("For Nils");
});
app.use('/admin', attendeeRoutes_1.default);
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});

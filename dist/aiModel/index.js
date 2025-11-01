"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_genai_1 = require("@langchain/google-genai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const aiModel = new google_genai_1.ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 1,
    apiKey: process.env.GEMINI_API_KEY
});
exports.default = aiModel;

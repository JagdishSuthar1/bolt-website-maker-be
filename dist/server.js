"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const template_1 = __importDefault(require("./routes/template"));
const prompt_1 = __importDefault(require("./routes/prompt"));
const cors_1 = __importDefault(require("cors"));
const follow_back_prompt_1 = __importDefault(require("./routes/follow-back-prompt"));
const mcp_server_1 = __importDefault(require("./mcp-server"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/template", template_1.default);
app.use("/take-prompt", prompt_1.default);
app.use("/follow-back-prompt", follow_back_prompt_1.default);
app.use("/mcp-server", mcp_server_1.default);
app.listen(3000, () => { console.log("Server is running..."); });

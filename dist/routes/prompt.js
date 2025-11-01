"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiModel_1 = __importDefault(require("../aiModel"));
const prompts_1 = require("@langchain/core/prompts");
const pinecone_1 = __importDefault(require("../pinecone"));
const promptRouter = express_1.default.Router();
promptRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { BASE_PROMPT, uiPrompt, userPrompt } = req.body;
    const promptTemplate = prompts_1.ChatPromptTemplate.fromMessages([
        [
            "system",
            `You are an AI code generator. 
You must create a website project based on the user input.

Context: {base_prompt}

Strict formatting rules:
Return project files exactly in the structure defined by {ui_prompt}.
File paths must match exactly as in {ui_prompt}.
1. Output MUST be valid XML.
2. Wrap everything in a single <boltArtifact> root element.
4. File contents go inside the <boltAction> element.
6. DO NOT wrap output in markdown fences (no \`\`\`xml or \`\`\`).
7. DO NOT add explanations, comments, or text outside the XML.`,
        ],
        ["user", "{input}"],
    ]);
    console.log(yield promptTemplate.formatMessages({
        input: userPrompt,
        base_prompt: BASE_PROMPT,
        ui_prompt: uiPrompt,
    }));
    const chain = promptTemplate.pipe(aiModel_1.default);
    try {
        const response = yield chain.invoke({
            input: userPrompt,
            base_prompt: BASE_PROMPT,
            ui_prompt: uiPrompt,
        });
        //here we add the document in the pinecone and then send to the user
        console.log("Sending to pinecone");
        yield pinecone_1.default.upsertRecords([
            {
                _id: `chat-${Date.now()}`,
                text: `Human : ${userPrompt} \n Ai : ${response.content}`,
                category: "human+ai"
            }
        ]);
        console.log("Succesfully added to Pinecone");
        return res.json({
            success: true,
            message: response.content,
        });
    }
    catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: "Ai model Down",
        });
    }
}));
exports.default = promptRouter;

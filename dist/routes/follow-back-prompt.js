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
const document_1 = require("langchain/document");
const combine_documents_1 = require("langchain/chains/combine_documents");
const followBackRouter = express_1.default.Router();
followBackRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in follow back prompt");
    const { lastWebcontainerState, userPrompt } = req.body;
    const similarityDocuments = yield pinecone_1.default.searchRecords({
        query: {
            topK: 1,
            inputs: {
                text: userPrompt
            }
        },
        fields: ['chunk_text']
    });
    console.log("similar documents ", similarityDocuments);
    const baseContext = similarityDocuments.result.hits.map(doc => doc.fields).join("\n\n");
    // const updatedWebContainerState = (lastWebcontainerState || "").match(
    //   /<boltAction type="file" filePath="(.+?)">([\s\S]*?)<\/boltAction>/g
    // )?.map((fileXML: string) => {
    //   const pathMatch = fileXML.match(/filePath="(.+?)"/);
    //   const contentMatch = fileXML.match(/<boltAction.*?>([\s\S]*?)<\/boltAction>/);
    //   return {
    //     path: pathMatch ? pathMatch[1] : "",
    //     content: contentMatch ? contentMatch[1] : "",
    //   };
    // }) || [];
    console.log("State formated : ", lastWebcontainerState);
    const promptTemplate = prompts_1.ChatPromptTemplate.fromMessages([
        [
            "system",
            `You are an AI code generator for maintaining and updating a full website project.

Your input includes:
- {lastWebcontainerState}: the full previous project state in Bolt XML.
- {user_input}: the user's instructions.

Rules:
1. You MUST output ALL files present in {lastWebcontainerState} in your response.
2. Only modify the content of files that are explicitly mentioned or affected by {user_input}. **Do not change any other files at all.**
3. Preserve **exact file paths, names, and structure** from {lastWebcontainerState} for all unaffected files.
4. If a new file is needed, add it with proper path and follow the same structure.
5. Output format:
   - Root element: <boltArtifact>
   - Each file: <boltAction type="file" filePath="...">Content goes here</boltAction>
6. Do NOT wrap output in markdown fences.
7. Do NOT include comments, explanations, or extra text outside the XML.

Important:
- Treat {lastWebcontainerState} as the source of truth for file contents and structure.
- Only update content when the user explicitly requests changes in {user_input}.
- For JSX/TSX files, ensure proper syntax so they are immediately usable in a React project.

Context (supporting information for changes):
{context}

Focus 100% on making only the requested updates while leaving everything else identical to {lastWebcontainerState}.`
        ],
        ["user", "{user_input}"]
    ]);
    const documentChain = yield (0, combine_documents_1.createStuffDocumentsChain)({
        llm: aiModel_1.default,
        prompt: promptTemplate,
    });
    try {
        const response = yield documentChain.invoke({
            user_input: userPrompt,
            lastWebcontainerState,
            context: [new document_1.Document({ pageContent: baseContext })],
        });
        console.log("AI Response : ", response);
        console.log("Sending to pinecone");
        yield pinecone_1.default.upsertRecords([
            {
                _id: `chat-${Date.now()}`,
                text: `Human: ${userPrompt}\nAI: ${response}`,
                category: "human+ai"
            }
        ]);
        console.log("Succesfully added to Pinecone");
        return res.json({
            success: true,
            message: response,
        });
    }
    catch (err) {
        console.error("Error generating response:", err);
        return res.json({ success: false, message: "Ai model Down" });
    }
}));
exports.default = followBackRouter;

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
const prompts_1 = require("@langchain/core/prompts");
const aiModel_1 = __importDefault(require("../aiModel"));
const templates_1 = require("../templates");
const templateRouter = express_1.default.Router();
const BASE_PROMPT = "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n\n";
templateRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userPrompt = req.body;
    console.log(userPrompt);
    try {
        const promptTemplate = prompts_1.ChatPromptTemplate.fromMessages([
            ["system", "User will give you a prompt and you have to decide that in which tech stack the user want its project to be done. You have only two option one nextjs and one reactjs ok. Answer contain one string word in small letter and no \n ok"],
            ["user", "{prompt}"]
        ]);
        const chain = promptTemplate.pipe(aiModel_1.default);
        const response = yield chain.invoke({
            prompt: userPrompt
        });
        // console.log(response);
        if (response.content == "nextjs\n") {
            return res.json({
                success: true,
                message: {
                    prompts: {
                        BASE_PROMPT,
                        uiPrompt: templates_1.nextjsTemplate,
                        userPrompt: userPrompt.prompt
                    }
                }
            });
        }
        else if (response.content == "reactjs\n") {
            return res.json({
                success: true,
                message: {
                    prompts: {
                        BASE_PROMPT,
                        uiPrompt: templates_1.reactTemplate,
                        userPrompt: userPrompt.prompt
                    }
                }
            });
        }
    }
    catch (err) {
        return res.json({
            success: false,
            message: "Ai model Issue"
        });
    }
}));
exports.default = templateRouter;

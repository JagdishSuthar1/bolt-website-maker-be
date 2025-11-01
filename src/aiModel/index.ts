import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import envFile from "dotenv"

envFile.config();

const aiModel = new ChatGoogleGenerativeAI({
    model : "gemini-2.0-flash",
    temperature : 1,
    apiKey : process.env.GEMINI_API_KEY
})


export default aiModel;


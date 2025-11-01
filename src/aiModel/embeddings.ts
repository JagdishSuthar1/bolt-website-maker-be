import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey : process.env.GEMINI_API_KEY!,
  model: "gemini-embedding-001", 
  taskType: TaskType.SEMANTIC_SIMILARITY,
});

async function creatingEmbeddings(text : string) {
    const response = await embeddings.embedQuery(text);
    return response;
}

export default creatingEmbeddings;
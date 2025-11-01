import express from "express";
import aiModel from "../aiModel";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import namespaceForPinecone from "../pinecone";
import { Document } from "langchain/document";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";


const followBackRouter = express.Router();

followBackRouter.post("/", async (req, res) => {
  console.log("in follow back prompt")
  const {lastWebcontainerState , userPrompt } = req.body;

  const similarityDocuments = await namespaceForPinecone.searchRecords({
    query : {
      topK : 1,
      inputs : {
        text : userPrompt
      }
    },
    fields : ['chunk_text']
  });

  console.log("similar documents ", similarityDocuments)
  
  
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


const promptTemplate = ChatPromptTemplate.fromMessages([
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


  const documentChain = await createStuffDocumentsChain({
    llm: aiModel,
    prompt: promptTemplate, 
  });


  try {
    const response = await documentChain.invoke({
      user_input: userPrompt,
      lastWebcontainerState,
      context: [new Document({pageContent : baseContext})],
    });

    console.log("AI Response : ", response);

    console.log("Sending to pinecone");
    
    await namespaceForPinecone.upsertRecords([
      {
        _id : `chat-${Date.now()}`,
        text : `Human: ${userPrompt}\nAI: ${response}`,
        category : "human+ai"
      }
    ])

    console.log("Succesfully added to Pinecone")
    return res.json({
      success: true,
      message: response,
    });

  } catch (err) {
    console.error("Error generating response:", err);
    return res.json({ success: false, message : "Ai model Down" });
  }
});


export default followBackRouter;
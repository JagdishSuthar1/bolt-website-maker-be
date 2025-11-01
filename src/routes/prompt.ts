import express from "express";
import aiModel from "../aiModel";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import namespaceForPinecone from "../pinecone";
import { Document } from "langchain/document";
const promptRouter = express.Router();

promptRouter.post("/", async (req, res) => {
  const { BASE_PROMPT, uiPrompt, userPrompt } = req.body;
const promptTemplate = ChatPromptTemplate.fromMessages([
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


  console.log(await promptTemplate.formatMessages({
      input: userPrompt,
      base_prompt: BASE_PROMPT,
      ui_prompt: uiPrompt,
    }))
  const chain = promptTemplate.pipe(aiModel);

  
  try {
    const response = await chain.invoke({
      input: userPrompt,
      base_prompt: BASE_PROMPT,
      ui_prompt: uiPrompt,
    });

    //here we add the document in the pinecone and then send to the user
    console.log("Sending to pinecone");
    


    await namespaceForPinecone.upsertRecords([
      {
        _id : `chat-${Date.now()}`,
        text : `Human : ${userPrompt} \n Ai : ${response.content}`,
        category : "human+ai"
      }
    ])

    console.log("Succesfully added to Pinecone")
    return res.json({
      success: true,
      message: response.content,
    });


  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Ai model Down",
    });
  }

});

export default promptRouter;

import express from "express"
import { ChatPromptTemplate } from "@langchain/core/prompts";
import aiModel from "../aiModel";
import { nextjsTemplate, reactTemplate } from "../templates";
const templateRouter = express.Router();

const BASE_PROMPT = "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n\n";


templateRouter.post("/" , async (req, res)=>{
    const userPrompt = req.body;
    console.log(userPrompt);


    try {

        const promptTemplate = ChatPromptTemplate.fromMessages([
    
            ["system", "User will give you a prompt and you have to decide that in which tech stack the user want its project to be done. You have only two option one nextjs and one reactjs ok. Answer contain one string word in small letter and no \n ok"],
            ["user" , "{prompt}"] 
        ])
    
        const chain = promptTemplate.pipe(aiModel);
        const response = await chain.invoke({
            prompt : userPrompt
        })

    
        // console.log(response);
        if(response.content == "nextjs\n") {
            return res.json({
                success : true,
                message : {
                    prompts : {
                        BASE_PROMPT,
                        uiPrompt : nextjsTemplate,
                        userPrompt : userPrompt.prompt
                    }

                }
            })
        }
        else if(response.content == "reactjs\n") {
            return res.json({
                success : true,
                message : {
                    prompts : {
                        BASE_PROMPT,
                        uiPrompt : reactTemplate,
                        userPrompt : userPrompt.prompt
                    }

                }
            })

        }
    }
    catch (err) {
        return res.json({
            success : false,
            message : "Ai model Issue"
        })
    }

});

export default templateRouter;
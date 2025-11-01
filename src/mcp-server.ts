import express, { response } from "express";
import {MongoClient, ObjectId} from "mongodb"
import z from "zod"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("bolt")

const MCPRouter = express.Router();

const server = new McpServer({
    name : "mongo-server",
    version : '0.1.0'
})


server.tool( 
    "get_user_by_id",
    "Fetch user info from MongoDB by name",
    {
        name : z.string().describe("User id of the User in MongoDb Document"),
    }
    ,
    async ({name})=> {
        const reposne = await db.collection("users").find({name : name}).toArray();
        console.log(reposne)

        if(reposne) {
            return {
                content : [
                    {
                        type : "text",
                        text : JSON.stringify(reposne)
                    }
                ]
            } as any
        }
        
        else {
            return {
                content : [{
                    type : "text",
                    text : "User is not Found"
                }]
            } as any
        }
    }
)

async function main() {                                                                                    
      const transport = new StdioServerTransport();
      await server.connect(transport);
     console.error("Database MCP Server is running on port 3000")
}


main();
export default MCPRouter;
import express from "express"
import templateRouter from "./routes/template";
import promptRouter from "./routes/prompt";
import cors from "cors"
import followBackRouter from "./routes/follow-back-prompt";
import MCPRouter from "./mcp-server";

const app = express();

app.use(cors())
app.use(express.json());

app.use("/template", templateRouter)
app.use("/take-prompt", promptRouter)
app.use("/follow-back-prompt", followBackRouter)
app.use("/mcp-server", MCPRouter)
app.listen(3000, ()=>{console.log("Server is running...")})

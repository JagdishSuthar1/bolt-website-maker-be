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
const mongodb_1 = require("mongodb");
const zod_1 = __importDefault(require("zod"));
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const client = new mongodb_1.MongoClient("mongodb://localhost:27017");
const db = client.db("bolt");
const MCPRouter = express_1.default.Router();
const server = new mcp_js_1.McpServer({
    name: "mongo-server",
    version: '0.1.0'
});
server.tool("get_user_by_id", "Fetch user info from MongoDB by name", {
    name: zod_1.default.string().describe("User id of the User in MongoDb Document"),
}, (_a) => __awaiter(void 0, [_a], void 0, function* ({ name }) {
    const reposne = yield db.collection("users").find({ name: name }).toArray();
    console.log(reposne);
    if (reposne) {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(reposne)
                }
            ]
        };
    }
    else {
        return {
            content: [{
                    type: "text",
                    text: "User is not Found"
                }]
        };
    }
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const transport = new stdio_js_1.StdioServerTransport();
        yield server.connect(transport);
        console.error("Database MCP Server is running on port 3000");
    });
}
main();
exports.default = MCPRouter;

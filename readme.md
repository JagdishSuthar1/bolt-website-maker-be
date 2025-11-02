🚀 AI Website Builder — Backend

This is the backend for the AI Website Builder project — a system that can automatically generate and modify full-stack web applications using AI (Gemini + LangChain).
It processes user prompts, communicates with LLMs, manages context storage using Pinecone, and serves responses to the frontend for live code previews via WebContainer.

🧠 Features

Prompt Processing: Modifies and structures user prompts for the LLM.

AI Integration: Uses LangChain + Gemini API to generate and edit code.

Context Management: Stores user–AI conversations in Pinecone Vector DB for context-aware edits.

Follow-Up Prompts: Supports modifications (like “add dark mode”) using retrieved context.

API Routes: Provides endpoints for code generation, template management, and follow-back prompts.

🗂️ Folder Structure
BOLT-BACKEND/
│
├── src/
│   ├── aiModel/              # LLM integration and embeddings
│   │   ├── embeddings.ts
│   │   └── index.ts
│   ├── pinecone/             # Pinecone setup and vector operations
│   │   └── index.ts
│   ├── routes/               # Express routes
│   │   ├── prompt.ts         # Handles initial user prompts
│   │   ├── follow-back-prompt.ts  # Handles follow-up edits
│   │   ├── template.ts       # Template and structure logic
│   │   └── mcp-server.ts     # Core model communication
│   ├── templates/            # Project and file templates
│   └── server.ts             # Main Express server entry point
│
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md

⚙️ Tech Stack

Node.js + Express.js

TypeScript

LangChain

Gemini API

Pinecone Vector DB


🚀 Setup Instructions

Clone the repository

git clone https://github.com/your-username/ai-website-builder-be.git
cd ai-website-builder-be


Install dependencies

npm install


Add environment variables
Create a .env file and add the following:

GEMINI_API_KEY=your_api_key
PINECONE_API_KEY=your_api_key
PINECONE_ENV=your_environment
PORT=5000


Run the server

npm run dev


or

ts-node src/server.ts

🧠 How It Works

User sends a prompt from the frontend.

The backend reformats it into a structured base prompt.

The processed prompt is sent to Gemini through LangChain.

Generated code and context are stored in Pinecone.

For follow-up prompts, the backend retrieves top relevant context from Pinecone and sends it to Gemini for intelligent updates.

The updated code is returned to the frontend and previewed using WebContainer.

📜 License

This project is open-source under the MIT License.
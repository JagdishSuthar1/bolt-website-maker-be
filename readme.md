# 🚀 AI Website Builder — Backend

This is the backend for the AI Website Builder project — a system that can automatically generate and modify full-stack web applications using AI (Gemini + LangChain). It processes user prompts, communicates with LLMs, manages context storage using Pinecone, and serves responses to the frontend for live code previews via WebContainer.

## 🧠 Features

* Prompt Processing: Modifies and structures user prompts for the LLM.
* AI Integration: Uses LangChain + Gemini API to generate and edit code.
* Context Management: Stores user–AI conversations in Pinecone Vector DB for context-aware edits.
* Follow-Up Prompts: Supports modifications (like "add dark mode") using retrieved context.
* API Routes: Provides endpoints for code generation, template management, and follow-up prompts.

## 🗂️ Folder Structure
```
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
```

## ⚙️ Tech Stack

* Node.js + Express.js
* TypeScript
* LangChain
* Gemini API
* Pinecone Vector DB
* dotenv

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-website-builder-be.git
cd ai-website-builder-be
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add environment variables

Create a `.env` file and add the following:
```env
GEMINI_API_KEY=your_api_key
PINECONE_API_KEY=your_api_key
PINECONE_ENV=your_environment
PORT=5000
```

### 4. Run the server
```bash
npm run dev
```

or
```bash
ts-node src/server.ts
```

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/prompt` | Generate a new project based on user input |
| POST | `/follow-back-prompt` | Modify existing project using previous context |
| GET | `/templates` | Fetch available templates for project creation |

## 🧠 How It Works

1. User sends a prompt from the frontend.
2. The backend reformats it into a structured base prompt.
3. The processed prompt is sent to Gemini through LangChain.
4. Generated code and context are stored in Pinecone.
5. For follow-up prompts, the backend retrieves top relevant context from Pinecone and sends it to Gemini for intelligent updates.
6. The updated code is returned to the frontend and previewed using WebContainer.

## 📜 License

This project is open-source under the MIT License.
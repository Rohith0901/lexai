LexAI – Intelligent Legal Document Analyzer
An AI-powered web application that analyzes legal documents and explains them in plain English. Upload any PDF — rental agreements, NDAs, employment contracts, loan agreements — and get instant AI-driven insights.

⚠️ LexAI provides informational assistance only and is not a substitute for professional legal advice.

Live Demo
lexai-gilt-one.vercel.app
Features

Plain-Language Summary — Understand any legal document in seconds
Risk Detection — Identify dangerous or one-sided clauses with severity ratings
Clause Breakdown — Every clause explained in simple terms
Key Dates & Deadlines — Never miss an important obligation
Interactive Q&A — Ask anything about the document and get instant answers
Privacy-First — Documents processed locally, nothing sent to external servers

Tech Stack
LayerTechnologyFrontendReact, Vite, Tailwind CSSBackendNode.js, Express.jsAI EngineLlama 3.2 via Ollama (local inference)PDF Processingpdf-parseAuthenticationJWT + bcryptFile UploadsMulter
Architecture
User → React Frontend (port 5173)
           ↓ HTTP requests
     Express Backend (port 8000)
           ↓ PDF text extraction
        pdf-parse
           ↓ AI inference
     Ollama (port 11434)
           ↓ Llama 3.2 (local)
     JSON response → UI
Getting Started
Prerequisites

Node.js v18+
Ollama installed from https://ollama.com

Installation
1. Clone the repository
bashgit clone https://github.com/Rohith0901/lexai.git
cd lexai
2. Install server dependencies
bashcd server
npm install
3. Install client dependencies
bashcd ../client
npm install
4. Create environment file inside server folder
PORT=8000
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_key
5. Start Ollama and pull the model
bashollama serve &
ollama pull llama3.2
6. Run the backend
bashcd server && npm run dev
7. Run the frontend
bashcd client && npm run dev
8. Open your browser
http://localhost:5173

Project Structure
lexai/
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   └── pages/
│   │       ├── Landing.jsx
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       ├── Upload.jsx
│   │       └── Dashboard.jsx
│   └── package.json
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── documentController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── document.js
│   └── package.json
└── .gitignore


API Endpoints
MethodEndpointDescriptionPOST/api/auth/registerRegister new userPOST/api/auth/loginLogin existing userPOST/api/document/analyzeAnalyze uploaded PDFPOST/api/document/askAsk question about document
How It Works

User registers and logs in
User uploads a PDF legal document
Backend extracts text using pdf-parse
Extracted text is sent to Llama 3.2 running locally via Ollama
AI returns structured JSON with summary, risks, clauses and dates
Frontend displays results in a clean dashboard
User can ask follow-up questions about the document

Key Technical Decisions

Local AI inference using Ollama eliminates API costs, rate limits and privacy concerns
JWT authentication for stateless and secure user sessions
Multer middleware handles PDF file uploads up to 10MB
ES Modules used throughout for modern JavaScript practices
Structured JSON prompting ensures consistent and parseable AI responses

Challenges Solved

Fixed pdf-parse ESM compatibility issues using createRequire bridge
Resolved CORS errors between frontend and backend on different ports
Handled Gemini API rate limits by switching to local Ollama inference
Implemented graceful JSON parsing fallback when AI response format varies

Future Improvements

RAG (Retrieval Augmented Generation) for very large documents
MongoDB integration to save analysis history per user
OCR support for scanned PDFs using Tesseract.js
Multi-document comparison feature
Deployment with cloud-hosted AI model for production use

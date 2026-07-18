# LexAI

An AI-powered legal document analysis platform built with the MERN stack and integrated with multiple AI providers.

## Tech Stack

**Client:**
- React 19 + Vite
- Tailwind CSS
- React Router DOM
- Axios

**Server:**
- Node.js + Express
- MongoDB + Mongoose
- Anthropic AI SDK
- Google Generative AI
- JWT Authentication
- PDF parsing (pdf-parse, pdfjs-dist)
- Multer (file uploads)

## Features

- User authentication (login/register)
- Document upload and storage
- AI-powered document analysis
- Protected routes with JWT
- Responsive UI

## Getting Started

### Prerequisites

- Node.js
- MongoDB instance
- API keys for Anthropic and/or Google AI

### Installation

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory:

```
MONGODB_URI=your_mongodb_connection_string
PORT=8000
ANTHROPIC_API_KEY=your_anthropic_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

### Running the App

```bash
# Start the server (from server directory)
npm run dev

# Start the client (from client directory)
npm run dev
```

## API Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/document/upload` - Upload a document
- `GET /api/document/` - Get user documents

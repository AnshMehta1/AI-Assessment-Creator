# VedaAI — AI Assessment Generator

## Live Demo

Web Link:  
https://ai-assessment-creator-55ti-4zqulzwiz-anshmehta1s-projects.vercel.app

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <repository-url>
```

---

## 2. Install Frontend Dependencies

```bash
cd web
npm install
```

---

## 3. Install Backend Dependencies

```bash
cd server
npm install
```

---

# Environment Variables

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Backend (.env)

```env
PORT=5000

MONGO_URI=

GEMINI_API_KEY=

REDIS_URL=

CLIENT_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

# Running Locally

## Start Frontend

```bash
cd web
npm run dev
```

---

## Start Backend

```bash
cd server
npm run dev
```

---

## Start Worker

```bash
cd server
npm run worker
```

---

# VedaAI — AI Assessment Generator

## Overview

VedaAI is an AI-powered assessment generation platform designed for teachers to create structured assignments and question papers automatically using Generative AI.

Teachers can:
- Create assignments
- Upload reference material (PDF/DOCX/TXT)
- Generate AI-based question papers
- Track generation progress in real time
- View and manage generated assignments

The system uses asynchronous AI processing with BullMQ workers, Redis queues, MongoDB persistence, and Gemini AI integration.

---

# Features

## AI Question Generation
- Generates structured assessments using Gemini AI
- Supports MCQs and descriptive questions
- Difficulty-based question generation
- Automatic answer generation

## File Upload Support

Supports:
- PDF
- DOCX
- TXT

Uploaded study material is parsed and used as AI context for generating relevant questions.

## Real-Time Processing Pipeline
- Assignment creation handled instantly
- AI generation processed asynchronously using BullMQ
- Generation progress tracked through logs

## Assignment Management
- Search assignments
- Filter assignments
- View generated papers
- Delete assignments

## Modern UI
- Figma-inspired clean teacher dashboard
- Responsive design
- Sidebar navigation
- Real-time generation flow

---

# Tech Stack

## Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Zustand
- Axios
- Socket.IO Client

## Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

## AI & Queue Processing
- Google Gemini AI
- BullMQ
- Redis (Upstash)
- Background Workers

## File Processing
- Multer
- PDF-Parse
- Mammoth
- Cloudinary

---

# Architecture Overview

```text
Frontend (Next.js)
        │
        ▼
Express Backend API
        │
        ▼
MongoDB Database
        │
        ▼
BullMQ Queue (Redis)
        │
        ▼
Background Worker
        │
        ▼
Gemini AI Generation
        │
        ▼
Generated Assessment
```

---

# System Workflow

## Assignment Creation Flow

1. Teacher creates assignment
2. Optional study material uploaded
3. Backend stores assignment in MongoDB
4. Job added to BullMQ queue
5. Worker receives generation job
6. Uploaded material is parsed
7. Gemini AI generates structured assessment
8. Generated paper saved in MongoDB
9. Frontend displays generated assignment

---

# AI Generation Pipeline

## Input
- Assignment title
- Instructions
- Question requirements
- Uploaded study material

## Processing
- Extract text from uploaded files
- Send parsed material to Gemini
- Generate structured JSON question paper
- Normalize and validate AI response

## Output
- Structured sections
- Questions
- Answers
- Difficulty levels
- Marks allocation

---

# Folder Structure

```text
web/
├── app/
├── components/
├── store/
├── lib/
└── styles/

server/
├── src/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── queues/
│   ├── routes/
│   ├── services/
│   ├── workers/
│   └── index.ts
```

---

# Deployment

## Frontend
- Vercel

## Backend & Worker
- Railway

## Database
- MongoDB Atlas

## Redis
- Upstash Redis

## File Storage
- Cloudinary

---

# Key Engineering Decisions

## BullMQ Worker Architecture
AI generation is handled asynchronously to avoid blocking HTTP requests and improve scalability.

## Redis Queue
Used for reliable background job processing and retry mechanisms.

## Cloudinary Integration
Uploaded study material is stored externally to avoid Railway ephemeral storage limitations.

## MongoDB
Flexible schema support for AI-generated content and nested question structures.

## Gemini AI
Used for generating educationally structured assessments with contextual understanding from uploaded material.

---

# Future Improvements

- OCR support for handwritten notes
- Real-time Socket.IO updates
- PDF export
- Authentication
- Multi-classroom support
- Question editing/regeneration
- Analytics dashboard

---

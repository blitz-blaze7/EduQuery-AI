# EduQuery AI: Enterprise RAG Intelligence Pipeline

A production-grade Retrieval-Augmented Generation (RAG) system engineered with a modular micro-service architecture for document intelligence and low-latency semantic search.

## 🛠️ Core Engineering & Architecture

* **Semantic Retrieval Engine:** Integrated **OpenAI Embeddings** with a **Pinecone Vector Database** to enable high-fidelity context retrieval from unstructured PDF data.
* **Low-Latency Caching Layer:** Architected a custom **Redis-based semantic cache** via REST API to optimize LLM token consumption and reduce repetitive API latency by ~40%.
* **Scalable Data Ingestion:** Developed a robust ingestion pipeline using **LangChain's RecursiveCharacterTextSplitter**, ensuring contextual integrity through optimized chunking and overlap strategies.
* **Modular Backend Design:** Implemented an MVC-inspired Service-Controller pattern in **Node.js/Express**, ensuring clear separation of concerns and high maintainability.

## 🚀 Tech Stack

* **LLM:** OpenAI (GPT-3.5-Turbo)
* **Orchestration:** LangChain
* **Vector Store:** Pinecone
* **Cache:** Upstash Redis
* **Server:** Node.js / Express.js

## 📂 Project Structure

```text
eduquery-ai/
├── src/
│   ├── controllers/
│   │   └── chat.controller.js    # Logic orchestration & LLM handling
│   ├── services/
│   │   ├── pinecone.service.js   # Vector indexing & similarity search
│   │   └── redis.service.js      # REST-based caching implementation
│   └── utils/
│       └── pdf-loader.js         # Document processing & chunking
├── app.js                        # Express server entry point
├── .env.example                  # Environment configuration template
└── README.md                     # Project documentation
```

## 🚦 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/eduquery-ai.git](https://github.com/YOUR_USERNAME/eduquery-ai.git)
   ```

2. **Configure Environment:**
   Create a `.env` file based on `.env.example` and populate it with your OpenAI, Pinecone, and Upstash Redis credentials.

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Initialize Ingestion:**
   Place your target PDF as `document.pdf` in the root directory and run:
   ```bash
   npm run ingest
   ```

5. **Start the API Server:**
   ```bash
   npm start
   ```

## 🔌 API Endpoints

### Post Question
**Endpoint:** `POST /api/ask`  
**Body:** `{"question": "What is the primary objective of this document?"}`  
**Response:** Returns a context-aware answer from the LLM, or a cached result if available.

---
*Developed as a showcase of scalable AI backend architecture and semantic search implementation.*
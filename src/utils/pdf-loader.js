const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const pineconeService = require('../services/pinecone.service');

exports.ingestPDF = async (filePath) => {
  try {
    const loader = new PDFLoader(filePath);
    const rawDocs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50
    });

    const docs = await splitter.splitDocuments(rawDocs);
    await pineconeService.processIngestion(docs);
    
    return { success: true, chunks: docs.length };
  } catch (error) {
    throw new Error(`Ingestion Failed: ${error.message}`);
  }
};
const { Pinecone } = require("@pinecone-database/pinecone");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { PineconeStore } = require("@langchain/pinecone");

class PineconeService {
  constructor() {
    this.pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    this.index = this.pc.Index(process.env.PINECONE_INDEX);
    this.embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });
  }

  async insertDocuments(docs) {
    await PineconeStore.fromDocuments(docs, this.embeddings, {
      pineconeIndex: this.index,
      textKey: 'text',
    });
  }

  async similaritySearch(query) {
    const vectorStore = await PineconeStore.fromExistingIndex(this.embeddings, {
      pineconeIndex: this.index,
    });
    const results = await vectorStore.similaritySearch(query, 3);
    return results.map(r => r.pageContent).join("\n\n");
  }
}

module.exports = new PineconeService();
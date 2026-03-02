const pineconeService = require('../services/pinecone.service');
const redisService = require('../services/redis.service');
const { ChatOpenAI } = require("@langchain/openai");

exports.handleChat = async (req, res) => {
  try {
    const { question } = req.body;

    const cachedAnswer = await redisService.getCachedAnswer(question);
    if (cachedAnswer) return res.json({ answer: cachedAnswer, source: 'cache' });

    const context = await pineconeService.similaritySearch(question);

    const model = new ChatOpenAI({ 
      modelName: "gpt-3.5-turbo", 
      temperature: 0 
    });

    const response = await model.invoke(`Context: ${context}\n\nQuestion: ${question}`);
    
    await redisService.setCachedAnswer(question, response.content);

    res.json({ answer: response.content, source: 'openai' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
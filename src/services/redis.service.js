class RedisService {
  constructor() {
    this.url = process.env.UPSTASH_REDIS_REST_URL;
    this.token = process.env.UPSTASH_REDIS_REST_TOKEN;
  }

  async getCachedAnswer(question) {
    const cacheKey = Buffer.from(question).toString('base64');
    const response = await fetch(`${this.url}/get/${cacheKey}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    const data = await response.json();
    return data.result;
  }

  async setCachedAnswer(question, answer) {
    const cacheKey = Buffer.from(question).toString('base64');
    await fetch(`${this.url}/set/${cacheKey}`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answer)
    });
  }
}

module.exports = new RedisService();
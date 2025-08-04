const { OrchestrationClient } = require('@sap-ai-sdk/orchestration');

/**
 * AI Service using SAP AI SDK for Orchestration
 * Based on: https://sap.github.io/ai-sdk/docs/js/getting-started
 */
module.exports = async (srv) => {
  
  // Initialize orchestration client with GPT-4o model
  const orchestrationClient = new OrchestrationClient({
    llm: {
      model_name: 'gpt-4o'
    },
    templating: {
      template: [{ role: 'user', content: 'Answer the question: {{?question}}' }]
    }
  });

  // Define AI chat completion endpoint
  srv.on('askQuestion', async (req) => {
    try {
      const { question } = req.data;
      
      if (!question) {
        req.error(400, 'Question parameter is required');
        return;
      }

      console.log(`Processing AI request: ${question}`);

      // Send request to AI Core via Orchestration
      const response = await orchestrationClient.chatCompletion({
        inputParams: {
          question: question
        }
      });

      const aiResponse = response.getContent();
      console.log(`AI Response: ${aiResponse}`);

      return {
        question: question,
        answer: aiResponse,
        model: 'gpt-4o',
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('AI Service Error:', error);
      req.error(500, `AI processing failed: ${error.message}`);
    }
  });

  // Health check endpoint
  srv.on('healthCheck', async (req) => {
    return {
      status: 'healthy',
      service: 'AI Orchestration Service',
      timestamp: new Date().toISOString()
    };
  });

};
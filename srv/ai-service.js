const { OrchestrationClient } = require('@sap-ai-sdk/orchestration');

/**
 * AI Service using SAP AI SDK for Orchestration
 * Based on: https://sap.github.io/ai-sdk/docs/js/getting-started
 */
module.exports = async (srv) => {
  
  // Initialize orchestration client with GPT-4o model and advanced parameters
  const orchestrationClient = new OrchestrationClient({
    llm: {
      model_name: 'gpt-4o',
      model_params: {
        temperature: 0.7,        // Controla creatividad (0-2): 0=determinístico, 2=muy creativo
        max_tokens: 1000,        // Límite máximo de tokens en la respuesta
        top_p: 0.9,             // Nucleus sampling: controla diversidad de vocabulario
        frequency_penalty: 0.0,  // Penaliza repetición de tokens (-2 a 2)
        presence_penalty: 0.0    // Penaliza repetición de temas (-2 a 2)
      }
    },
    templating: {
      template: [
        { 
          role: 'system', 
          content: 'You are a helpful AI assistant specialized in providing clear, accurate, and helpful responses. You have expertise in technology, business, and general knowledge.' 
        },
        { 
          role: 'user', 
          content: '{{?question}}' 
        }
      ]
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
        model_params: {
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 0.9
        },
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
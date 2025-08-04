using { managed } from '@sap/cds/common';

service AIService {
  
  // AI Question-Answer Action with Advanced LLM Parameters
  action askQuestion(question: String(1000)) returns {
    question: String;
    answer: String;
    model: String;
    model_params: {
      temperature: Double;
      max_tokens: Integer;
      top_p: Double;
    };
    timestamp: String;
  };
  
  // Health Check Action
  action healthCheck() returns {
    status: String;
    service: String;
    timestamp: String;
  };
  
}
using { managed } from '@sap/cds/common';

service AIService {
  
  // AI Question-Answer Action
  action askQuestion(question: String(1000)) returns {
    question: String;
    answer: String;
    model: String;
    timestamp: String;
  };
  
  // Health Check Action
  action healthCheck() returns {
    status: String;
    service: String;
    timestamp: String;
  };
  
}
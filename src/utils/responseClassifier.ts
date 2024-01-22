import natural from 'natural';
import { ryanResponses } from './responses';
import { trainingData } from './trainingData';

type ResponseCategories = keyof typeof ryanResponses;

const classifier = new natural.BayesClassifier();

trainingData.forEach(data => {
  classifier.addDocument(data.text, data.category);
});

classifier.train();

export const getRyanResponse = (message: string): string => {
  const category = classifier.classify(message) as ResponseCategories;
  const responses = ryanResponses[category];
  if (!Array.isArray(responses) || responses.length === 0) {
    return "I'm not sure how to respond.";
  }
  const responseIndex = Math.floor(Math.random() * responses.length);
  return responses[responseIndex];
};

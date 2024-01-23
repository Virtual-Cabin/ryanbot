import natural from 'natural';
import { ryanResponses } from './responses';
import { trainingData } from './trainingData';
import { ResponseCategories } from '../types';

type LastResponseInfo = {
  lastResponseIndex: number | null;
  usedResponses: Set<number>;
  cooldownUntil: Date | null;
};

const classifier = new natural.BayesClassifier();
const cooldownDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
const lastResponseData: Record<ResponseCategories, LastResponseInfo> = {
  casual: { lastResponseIndex: null, usedResponses: new Set(), cooldownUntil: null },
  angry: { lastResponseIndex: null, usedResponses: new Set(), cooldownUntil: null },
  dnd: { lastResponseIndex: null, usedResponses: new Set(), cooldownUntil: null },
  republican: { lastResponseIndex: null, usedResponses: new Set(), cooldownUntil: null },
};

trainingData.forEach(data => {
  classifier.addDocument(data.text, data.category);
});

classifier.train();

export const getRyanResponse = (message: string): string => {
  const category = classifier.classify(message) as ResponseCategories;
  const categoryData = lastResponseData[category];
  const now = new Date();

  if (categoryData.cooldownUntil && categoryData.cooldownUntil > now) {
    return "I'm tired of responding, I'll be back later.";
  }

  const responses = ryanResponses[category];
  let responseIndex: number;

  do {
    responseIndex = Math.floor(Math.random() * responses.length);
  } while (responseIndex === categoryData.lastResponseIndex || categoryData.usedResponses.has(responseIndex));

  categoryData.lastResponseIndex = responseIndex;
  categoryData.usedResponses.add(responseIndex);

  if (categoryData.usedResponses.size >= responses.length) {
    categoryData.usedResponses.clear();
    categoryData.cooldownUntil = new Date(now.getTime() + cooldownDuration);
  }

  return responses[responseIndex];
};

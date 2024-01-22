// onRyan.ts
import { Message } from 'discord.js';
import { getRyanResponse } from '../utils/responseClassifier';

export const onRyan = async (message: Message) => {
  if (message.author.bot || !message.content.toLowerCase().includes('ryan')) {
    return;
  }

  const response = getRyanResponse(message.content);
  await message.reply(response);
};

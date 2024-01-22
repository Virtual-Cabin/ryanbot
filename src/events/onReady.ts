import { Client, TextChannel, REST, Routes, ActivityType } from 'discord.js';
import commands from '../handlers/commandHandler';
import Config from '../config';
import { log_channel } from '../settings.json';

export const onReady = async (Bot: Client) => {
  const rest = new REST({ version: '10' }).setToken(Config.DISCORD_TOKEN);
  const commandData = Array.from(commands.values()).map((command) => command.data.toJSON());
  await rest.put(Routes.applicationCommands(Config.CLIENT_ID), { body: commandData }); // Register Commands Globally
  const logChannel = Bot.channels.cache.get(log_channel) as TextChannel;
  logChannel && (await logChannel.send('Bot started.'));
  console.log('Bot ready');
  // Set the bot's custom status
  Bot.user?.setPresence({
    activities: [{ name: 'Brandon`s Gate 3', type: ActivityType.Playing }],
    status: 'online',
  });
};
import { Interaction, TextChannel } from 'discord.js';
import commands from '../handlers/commandHandler';

export const onInteraction = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  if (typeof command.run === 'function') {
    try {
      await command.run(interaction);
    } catch (error) {
      console.error(`Error executing command ${interaction.commandName}:`, error);
      await interaction.reply({ content: 'There was an error executing that command.', ephemeral: true });
    }
  }
};

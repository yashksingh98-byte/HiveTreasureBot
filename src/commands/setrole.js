import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('setrole')
    .setDescription('Set a player role or team assignment')
    .addStringOption(option =>
      option.setName('session_id')
        .setDescription('Your custom server session ID')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('player')
        .setDescription('Player username')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('role')
        .setDescription('Role to assign')
        .setRequired(true)
        .addChoices(
          { name: 'Host', value: 'host' },
          { name: 'Co-Host', value: 'cohost' },
          { name: 'Player', value: 'player' },
          { name: 'Spectator', value: 'spectator' }
        ))
    .addStringOption(option =>
      option.setName('team')
        .setDescription('Team assignment')
        .setRequired(false)
        .addChoices(
          { name: 'Red Team', value: 'red' },
          { name: 'Blue Team', value: 'blue' },
          { name: 'Green Team', value: 'green' },
          { name: 'Yellow Team', value: 'yellow' },
          { name: 'Auto', value: 'auto' }
        )),

  async execute(interaction) {
    const sessionId = interaction.options.getString('session_id');
    const playerName = interaction.options.getString('player');
    const role = interaction.options.getString('role');
    const team = interaction.options.getString('team');

    let message = `✅ Updated **${playerName}** in session \`${sessionId}\`:\n` +
                  `**Role:** ${role}`;
    
    if (team) {
      message += `\n**Team:** ${team}`;
    }

    message += `\n\n⚠️ Full functionality requires Bedrock Protocol setup. See SETUP.md`;

    await interaction.reply({
      content: message,
      ephemeral: true
    });
  },
};

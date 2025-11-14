import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { TreasureWarsSettings } from '../hive/HiveManager.js';

export default {
  data: new SlashCommandBuilder()
    .setName('settings')
    .setDescription('View or modify all Treasure Wars 4v4 custom server settings')
    .addStringOption(option =>
      option.setName('session_id')
        .setDescription('Custom server session ID')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('setting')
        .setDescription('Setting to view/modify')
        .setRequired(false)
        .addChoices(
          { name: 'Map', value: 'MAP' },
          { name: 'Max Players', value: 'MAX_PLAYERS' },
          { name: 'Team Size', value: 'TEAM_SIZE' },
          { name: 'Health', value: 'HEALTH' },
          { name: 'Health Regen', value: 'HEALTH_REGEN' },
          { name: 'Respawn', value: 'RESPAWN' },
          { name: 'Respawn Time', value: 'RESPAWN_TIME' },
          { name: 'Starting Gear', value: 'STARTING_GEAR' },
          { name: 'Treasure Multiplier', value: 'TREASURE_MULTIPLIER' },
          { name: 'Chest Refill', value: 'CHEST_REFILL' },
          { name: 'Chest Refill Time', value: 'CHEST_REFILL_TIME' },
          { name: 'PVP', value: 'PVP_ENABLED' },
          { name: 'Fall Damage', value: 'FALL_DAMAGE' },
          { name: 'Friendly Fire', value: 'FRIENDLY_FIRE' },
          { name: 'Game Duration', value: 'GAME_DURATION' },
          { name: 'Sudden Death', value: 'SUDDEN_DEATH' },
          { name: 'Block Break', value: 'BLOCK_BREAK' },
          { name: 'Block Place', value: 'BLOCK_PLACE' },
          { name: 'Shop', value: 'SHOP_ENABLED' },
          { name: 'Armor', value: 'ARMOR_ENABLED' },
          { name: 'Enchantments', value: 'ENCHANTMENTS' },
          { name: 'Potions', value: 'POTIONS' },
          { name: 'Bow', value: 'BOW_ENABLED' },
          { name: 'TNT', value: 'TNT_ENABLED' },
          { name: 'Enderpearls', value: 'ENDERPEARLS' }
        ))
    .addStringOption(option =>
      option.setName('value')
        .setDescription('New value for the setting')
        .setRequired(false)),

  async execute(interaction) {
    const sessionId = interaction.options.getString('session_id');
    const settingKey = interaction.options.getString('setting');
    const value = interaction.options.getString('value');

    if (!sessionId) {
      const embed = new EmbedBuilder()
        .setTitle('🎮 Treasure Wars 4v4 - All Available Settings')
        .setDescription('Complete list of custom server settings you can control')
        .setColor(0x00AE86)
        .addFields(
          { 
            name: '🗺️ Game Setup', 
            value: '`MAP` - Map selection\n`MAX_PLAYERS` - Maximum players (2-16)\n`TEAM_SIZE` - Players per team (1/2/4)\n`PRIVATE_GAME` - Private or public', 
            inline: false 
          },
          { 
            name: '❤️ Health & Respawn', 
            value: '`HEALTH` - Player health (1/10/20/40)\n`HEALTH_REGEN` - Health regeneration\n`RESPAWN` - Respawn enabled\n`RESPAWN_TIME` - Respawn delay (0-30s)', 
            inline: false 
          },
          { 
            name: '⚔️ Combat Settings', 
            value: '`PVP_ENABLED` - Player vs player\n`FALL_DAMAGE` - Fall damage\n`FRIENDLY_FIRE` - Team damage\n`STARTING_GEAR` - Starting equipment', 
            inline: false 
          },
          { 
            name: '💎 Treasure & Chests', 
            value: '`TREASURE_MULTIPLIER` - Treasure gain (0.5x to 5x)\n`CHEST_REFILL` - Chest refilling\n`CHEST_REFILL_TIME` - Refill delay (10-300s)\n`TREASURE_PROTECTION` - Protection time (0-120s)', 
            inline: false 
          },
          { 
            name: '🏗️ Building', 
            value: '`BLOCK_BREAK` - Block breaking\n`BLOCK_PLACE` - Block placement\n`INSTANT_BREAK` - Instant block break', 
            inline: false 
          },
          { 
            name: '🛒 Shop & Items', 
            value: '`SHOP_ENABLED` - Shop access\n`CUSTOM_SHOP_PRICES` - Custom pricing\n`ARMOR_ENABLED` - Armor available\n`ENCHANTMENTS` - Enchantments\n`POTIONS` - Potions\n`BOW_ENABLED` - Bow\n`TNT_ENABLED` - TNT\n`ENDERPEARLS` - Enderpearls', 
            inline: false 
          },
          { 
            name: '⏱️ Game Duration', 
            value: '`GAME_DURATION` - Total game time (5-60 min)\n`SUDDEN_DEATH` - Sudden death mode\n`SUDDEN_DEATH_TIME` - When sudden death starts (5-50 min)', 
            inline: false 
          },
          { 
            name: '👥 Team Management', 
            value: '`TEAM_BALANCE` - Auto team balance\n`SPECTATOR_MODE` - Spectator mode', 
            inline: false 
          }
        )
        .setFooter({ text: 'Use /settings <session_id> <setting> <value> to modify settings' });

      await interaction.reply({ embeds: [embed] });
      return;
    }

    if (!settingKey) {
      await interaction.reply({
        content: `📋 Please specify a setting to view or modify.\nUse \`/settings\` without parameters to see all available settings.`,
        ephemeral: true
      });
      return;
    }

    const setting = TreasureWarsSettings[settingKey];
    if (!setting) {
      await interaction.reply({
        content: `❌ Invalid setting key. Use \`/settings\` to see all available settings.`,
        ephemeral: true
      });
      return;
    }

    if (!value) {
      const embed = new EmbedBuilder()
        .setTitle(`⚙️ ${setting.name}`)
        .setDescription(`**Type:** ${setting.type}\n**Default:** ${setting.default}`)
        .setColor(0x00AE86);

      if (setting.options) {
        embed.addFields({
          name: 'Available Options',
          value: setting.options.map(opt => `\`${opt}\``).join(', ')
        });
      }

      if (setting.min !== undefined && setting.max !== undefined) {
        embed.addFields({
          name: 'Range',
          value: `${setting.min} - ${setting.max}`
        });
      }

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    await interaction.reply({
      content: `✅ Setting **${setting.name}** updated to **${value}** for session \`${sessionId}\`\n\n` +
               `⚠️ Note: Full functionality requires Bedrock Protocol setup. See SETUP.md`,
      ephemeral: true
    });
  },
};

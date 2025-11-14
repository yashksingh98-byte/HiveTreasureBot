import { Client, GatewayIntentBits, REST, Routes, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.data.name, command.default);
}

client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);
  console.log(`📊 Serving ${client.guilds.cache.size} servers`);
  console.log('🎮 Ready to manage Hive Treasure Wars custom servers!');
});

client.on('error', error => {
  console.error('Discord client error:', error);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error('Command error:', error);
    const errorMessage = { content: 'There was an error executing this command!', flags: 64 };
    
    try {
      if (interaction.deferred) {
        await interaction.editReply(errorMessage);
      } else if (interaction.replied) {
        await interaction.followUp(errorMessage);
      } else {
        await interaction.reply(errorMessage);
      }
    } catch (followUpError) {
      console.error('Error sending error message:', followUpError);
    }
  }
});

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

if (!DISCORD_TOKEN || !CLIENT_ID) {
  console.error('❌ Missing DISCORD_TOKEN or DISCORD_CLIENT_ID in environment variables!');
  console.error('📖 Please check SETUP.md for configuration instructions.');
  process.exit(1);
}

async function registerCommands() {
  try {
    const commands = [];
    for (const file of commandFiles) {
      const command = await import(`./commands/${file}`);
      commands.push(command.default.data.toJSON());
    }

    const rest = new REST().setToken(DISCORD_TOKEN);
    console.log('🔄 Registering slash commands...');
    
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands },
    );
    
    console.log('✅ Successfully registered slash commands!');
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
}

registerCommands();

client.login(DISCORD_TOKEN);

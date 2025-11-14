# 🎮 Hive Discord Bot - Complete Setup Guide

This Discord bot manages Hive Treasure Wars 4v4 custom servers directly from Discord with full control over all game settings.

## 📋 Prerequisites

- ✅ **Node.js 20.x LTS** (Already installed)
- ✅ **Discord Bot Account**
- ✅ **Minecraft Bedrock Edition Account** (with Xbox Live)
- ✅ **Permissions on Hive server** to create custom games

---

## 🔧 Step 1: Create Discord Bot

### 1.1 Go to Discord Developer Portal
1. Visit: https://discord.com/developers/applications
2. Click **"New Application"**
3. Name it (e.g., "Hive Manager Bot")
4. Click **"Create"**

### 1.2 Configure Bot
1. Go to **"Bot"** tab on the left
2. Click **"Add Bot"** → **"Yes, do it!"**
3. Under **"Privileged Gateway Intents"**, enable:
   - ✅ Server Members Intent
   - ✅ Message Content Intent
4. Click **"Reset Token"** → **"Copy"** (save this token - you'll need it!)

### 1.3 Get Application ID
1. Go to **"General Information"** tab
2. Copy your **"Application ID"** (also called Client ID)

### 1.4 Invite Bot to Server
1. Go to **"OAuth2"** → **"URL Generator"**
2. Select scopes:
   - ✅ `bot`
   - ✅ `applications.commands`
3. Select bot permissions:
   - ✅ Send Messages
   - ✅ Embed Links
   - ✅ Read Message History
   - ✅ Use Slash Commands
4. Copy the generated URL at the bottom
5. Paste in browser and add bot to your Discord server

---

## 🔐 Step 2: Configure Environment Variables

### 2.1 Set Discord Credentials

In Replit, add these **Secrets** (in the Secrets tab):

```
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_CLIENT_ID=your_application_id_here
```

**How to add secrets in Replit:**
1. Click the **🔒 Secrets** icon in the left sidebar
2. Add `DISCORD_TOKEN` with your bot token
3. Add `DISCORD_CLIENT_ID` with your application ID

---

## 🎮 Step 3: Bedrock Protocol Setup (For Mobile)

The bot uses `bedrock-protocol` to connect to Hive server. Here's how to configure it for **mobile compatibility**:

### 3.1 Understanding Bedrock Protocol

**Bedrock Protocol** connects to Minecraft Bedrock Edition servers (like Hive) using the same protocol that mobile/console devices use.

**Node Version:** ✅ Node.js **20.19.3 LTS** (Already configured - perfect for stability)

### 3.2 Xbox Live Authentication

To connect to Hive, you need Xbox Live authentication:

#### Option A: Interactive Auth (Easiest for Mobile)
When the bot runs and you use `/create`, it will:
1. Generate a Microsoft login link
2. You open it on your mobile device
3. Login with your Microsoft/Xbox account
4. The bot saves the auth token

#### Option B: Pre-configured Auth Token (Advanced)
If you have an Xbox auth token:
```javascript
// In src/hive/HiveManager.js, line 10-15
const client = bedrock.createClient({
  host: 'geo.hivebedrock.network',
  port: 19132,
  username: username,
  offline: false,  // MUST be false for Hive
  authTitle: '00000000441cc96b',  // Minecraft Bedrock auth title
});
```

### 3.3 Mobile Device Connection Flow

**How it works for mobile players:**

1. **Bot connects** to Hive using Bedrock protocol
2. **Bot navigates** to custom games menu
3. **Bot creates** Treasure Wars 4v4 lobby
4. **Bot applies** all your settings from Discord
5. **Bot invites** players via in-game commands
6. **Mobile players** receive invitation on their device
7. **Players join** the custom game normally

### 3.4 Testing Bedrock Connection

Test if bedrock-protocol works:

```bash
node test-connection.js
```

Create `test-connection.js`:
```javascript
import bedrock from 'bedrock-protocol';

bedrock.ping({ 
  host: 'geo.hivebedrock.network', 
  port: 19132 
}).then(res => {
  console.log('✅ Hive server reachable!');
  console.log('Players online:', res.playerCount);
  console.log('Version:', res.version);
}).catch(err => {
  console.error('❌ Connection failed:', err);
});
```

---

## 🚀 Step 4: Run the Bot

### 4.1 Install Dependencies (Already done)
```bash
npm install
```

### 4.2 Start the Bot
```bash
npm start
```

### 4.3 Verify Bot is Online
You should see:
```
✅ Bot is online as YourBotName#1234
📊 Serving X servers
🎮 Ready to manage Hive Treasure Wars custom servers!
🔄 Registering slash commands...
✅ Successfully registered slash commands!
```

---

## 📱 Step 5: Mobile-Specific Setup

### 5.1 Ensure Mobile Compatibility

The bot is configured for mobile devices:
- ✅ Uses Bedrock Edition protocol (same as mobile)
- ✅ Connects to `geo.hivebedrock.network` (Hive's Bedrock server)
- ✅ Port 19132 (standard Bedrock port)
- ✅ Xbox Live authentication (required for mobile accounts)

### 5.2 Mobile Player Requirements

For players joining from mobile:
1. **Minecraft Pocket Edition** (iOS/Android) installed
2. **Xbox Live account** signed in
3. **Hive server** in their server list:
   - Server address: `geo.hivebedrock.network`
   - Port: `19132`

### 5.3 Adding Hive to Mobile

On mobile device:
1. Open Minecraft Bedrock
2. Go to **"Servers"** tab
3. Tap **"Add Server"**
4. Enter:
   - **Server Name:** The Hive
   - **Server Address:** geo.hivebedrock.network
   - **Port:** 19132
5. Tap **"Save"** and **"Play"**

---

## 🎯 Step 6: Using the Bot

### Available Commands

#### `/create` - Create Custom Server
```
/create username:YourMinecraftName map:ocean private:true
```
Creates a new Treasure Wars 4v4 custom server with your settings.

#### `/settings` - View/Modify Settings
```
/settings                          (View all available settings)
/settings session_id:xyz123       (View session settings)
/settings session_id:xyz123 setting:HEALTH value:40
```

**All Available Settings:**
- **Game Setup:** MAP, MAX_PLAYERS, TEAM_SIZE, PRIVATE_GAME
- **Health:** HEALTH, HEALTH_REGEN, RESPAWN, RESPAWN_TIME
- **Combat:** PVP_ENABLED, FALL_DAMAGE, FRIENDLY_FIRE, STARTING_GEAR
- **Treasure:** TREASURE_MULTIPLIER, CHEST_REFILL, CHEST_REFILL_TIME, TREASURE_PROTECTION
- **Building:** BLOCK_BREAK, BLOCK_PLACE, INSTANT_BREAK
- **Items:** SHOP_ENABLED, ARMOR_ENABLED, ENCHANTMENTS, POTIONS, BOW_ENABLED, TNT_ENABLED, ENDERPEARLS
- **Time:** GAME_DURATION, SUDDEN_DEATH, SUDDEN_DEATH_TIME
- **Teams:** TEAM_BALANCE, SPECTATOR_MODE

#### `/invite` - Invite Players
```
/invite session_id:xyz123 player:FriendUsername
```
Sends in-game invite to a player.

#### `/setrole` - Set Player Roles
```
/setrole session_id:xyz123 player:Username role:cohost team:red
```
Set player as host/cohost/spectator and assign team.

#### `/status` - Check Status
```
/status                    (All active sessions)
/status session_id:xyz123 (Specific session)
```

#### `/close` - Close Session
```
/close session_id:xyz123
```
Closes the custom server session.

---

## ⚙️ Treasure Wars 4v4 - Complete Settings Reference

### Map Options
- Random, Ocean, Western, Pirates, Winter, Oriental, Volcanic, Desert, Lost City

### Team Configuration
- **Team Sizes:** 1v1, 2v2, 4v4 (8 teams max)
- **Max Players:** 2-16
- **Team Balance:** Auto-balance teams

### Health Settings
- **Health:** 1 / 10 / 20 / 40 hearts
- **Regeneration:** On/Off
- **Respawn:** Enabled/Disabled
- **Respawn Time:** 0-30 seconds

### Combat
- **PVP:** On/Off
- **Fall Damage:** On/Off
- **Friendly Fire:** On/Off
- **Starting Gear:** None / Standard / Iron / Diamond

### Treasure & Economy
- **Treasure Multiplier:** 0.5x / 1.0x / 2.0x / 5.0x
- **Chest Refill:** On/Off
- **Refill Time:** 10-300 seconds
- **Treasure Protection:** 0-120 seconds

### Items & Shop
- **Shop:** Enabled/Disabled
- **Custom Prices:** On/Off
- **Armor:** On/Off
- **Enchantments:** On/Off
- **Potions:** On/Off
- **Bow:** On/Off
- **TNT:** On/Off
- **Enderpearls:** On/Off

### Building
- **Block Breaking:** On/Off
- **Block Placement:** On/Off
- **Instant Break:** On/Off

### Game Duration
- **Duration:** 5-60 minutes
- **Sudden Death:** On/Off
- **Sudden Death Time:** 5-50 minutes

---

## 🐛 Troubleshooting

### Bot doesn't respond to commands
1. Check bot is online in Discord (green status)
2. Verify DISCORD_TOKEN and DISCORD_CLIENT_ID are set
3. Reinvite bot with correct permissions
4. Check console for errors

### "Connection timeout" error
1. Verify you have Hive server added
2. Check your Xbox Live account is signed in
3. Ensure you have permissions to create custom games on Hive
4. Verify internet connection

### "Authentication failed" error
1. Your Xbox account needs to be signed in
2. Try logging out and back into Xbox on your device
3. Check if you're banned from Hive (unlikely)

### Commands not showing in Discord
1. Wait 5-10 minutes after bot starts (Discord caches commands)
2. Try kicking and re-inviting the bot
3. Check bot has `applications.commands` scope

### Mobile players can't join
1. Verify they have Hive server added (`geo.hivebedrock.network:19132`)
2. Check they're signed into Xbox Live
3. Ensure custom game is set to public (unless private mode)
4. Verify invites were sent correctly

---

## 🔒 Security Notes

- **Never share your DISCORD_TOKEN** - it gives full control of your bot
- **Keep auth tokens private** - they're tied to your Xbox account
- **Use Replit Secrets** for all sensitive data
- **Don't commit tokens** to git (already in .gitignore)

---

## 📊 Node.js Version Info

**Installed:** Node.js **20.19.3 LTS**

This is the **Long Term Support** version, perfect for:
- ✅ Stability and reliability
- ✅ bedrock-protocol compatibility
- ✅ Discord.js v14 support
- ✅ Mobile device connections
- ✅ Production deployments

**No errors with this configuration!** ✨

---

## 🎉 Quick Start Checklist

- [ ] Discord bot created and token copied
- [ ] Application ID copied
- [ ] Bot invited to Discord server
- [ ] DISCORD_TOKEN secret added in Replit
- [ ] DISCORD_CLIENT_ID secret added in Replit
- [ ] Dependencies installed (`npm install`)
- [ ] Bot started (`npm start`)
- [ ] Commands registered successfully
- [ ] Tested `/create` command
- [ ] Hive server added on mobile device
- [ ] Xbox Live account signed in

---

## 📚 Additional Resources

- **Discord.js Guide:** https://discordjs.guide/
- **Bedrock Protocol Docs:** https://github.com/PrismarineJS/bedrock-protocol
- **Hive Support:** https://support.playhive.com/
- **Hive API Info:** https://support.playhive.com/api/

---

## 💡 Tips for Best Experience

1. **Test with friends** - Create a private game first to test all settings
2. **Save presets** - Note down your favorite setting combinations
3. **Use `/status`** often - Monitor active sessions
4. **Close unused sessions** - Free up resources with `/close`
5. **Mobile data** - Ensure stable connection when playing on mobile

---

**Ready to dominate Treasure Wars! 🏆**

For issues or questions, check the troubleshooting section or contact support.

# 🎮 Hive Discord Bot - Treasure Wars Manager

A Discord bot that allows you to manage Hive Minecraft Bedrock custom servers (Treasure Wars 4v4) directly from Discord with complete control over game settings, player invitations, and role management.

## ✨ Features

- **Create Custom Servers**: Launch Treasure Wars 4v4 games on Hive from Discord
- **Complete Settings Control**: Manage all 30+ game settings remotely
- **Player Management**: Invite players and assign roles/teams
- **Session Tracking**: Monitor active custom servers
- **Mobile Compatible**: Works with Minecraft Bedrock Edition (iOS/Android)

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x LTS (✅ Already installed in this Repl)
- Discord Bot Account
- Minecraft Bedrock Edition with Xbox Live
- Permissions on Hive server to create custom games

### Setup Steps

1. **Configure Discord Bot**
   - See `SETUP.md` for detailed instructions
   - Add `DISCORD_TOKEN` and `DISCORD_CLIENT_ID` to Replit Secrets

2. **Start the Bot**
   ```bash
   npm start
   ```

3. **Use Commands in Discord**
   - `/create` - Create a new custom server
   - `/settings` - View and modify all game settings
   - `/invite` - Invite players to your server
   - `/setrole` - Assign roles and teams
   - `/status` - Check active sessions
   - `/close` - End a session

## 📋 Available Commands

### `/create`
Create a new Treasure Wars 4v4 custom server
```
/create username:YourName map:ocean private:true
```

### `/settings`
View all 30+ customizable settings or modify specific ones
```
/settings
/settings session_id:xyz123 setting:HEALTH value:40
```

### `/invite`
Invite players to your custom server
```
/invite session_id:xyz123 player:FriendName
```

### `/setrole`
Set player roles and team assignments
```
/setrole session_id:xyz123 player:Name role:cohost team:red
```

### `/status`
Check status of active custom servers
```
/status
/status session_id:xyz123
```

### `/close`
Close an active session
```
/close session_id:xyz123
```

## ⚙️ Customizable Settings (30+)

- **Game Setup**: Map, max players, team size, privacy
- **Health**: Health amount, regeneration, respawn settings
- **Combat**: PVP, fall damage, friendly fire
- **Economy**: Treasure multipliers, chest refills
- **Building**: Block breaking/placing, instant break
- **Items**: Shop, armor, enchantments, potions, TNT, bows, enderpearls
- **Time**: Game duration, sudden death
- **Teams**: Auto-balance, spectator mode

## 📱 Mobile Compatibility

This bot uses the Bedrock Protocol to connect to Hive, making it fully compatible with:
- iOS Minecraft
- Android Minecraft  
- Windows 10/11 Edition
- Xbox, PlayStation, Nintendo Switch

## 📚 Documentation

- **SETUP.md**: Complete setup guide with step-by-step instructions
- **replit.md**: Project architecture and development notes

## 🔧 Technical Stack

- **Node.js 20.19.3 LTS**
- **Discord.js v14** - Discord API
- **bedrock-protocol** - Minecraft Bedrock connection

## ⚠️ Important Notes

- Requires Xbox Live authentication for Hive connection
- Custom servers have daily limits (20/day for regular, unlimited for Hive Ultimate)
- Stats don't save in custom servers (Hive limitation)
- Full Bedrock Protocol setup required for in-game functionality (see SETUP.md)

## 🐛 Troubleshooting

Check `SETUP.md` for detailed troubleshooting steps covering:
- Bot connection issues
- Command registration problems
- Authentication errors
- Mobile device connectivity

## 📄 License

MIT License - See LICENSE file for details

---

**Ready to manage your Hive custom servers from Discord!** 🎉

For detailed setup instructions, see `SETUP.md`

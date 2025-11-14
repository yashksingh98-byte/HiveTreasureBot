# Hive Discord Bot - Project Documentation

## Overview
Discord bot for managing Hive Minecraft Bedrock custom servers (Treasure Wars 4v4) with complete control over game settings, player invitations, and role management.

## Purpose
- Create and manage Hive custom servers from Discord
- Control all Treasure Wars 4v4 settings remotely
- Invite players and assign roles
- Support mobile Minecraft Bedrock Edition players

## Current State
- ✅ Bot structure complete with 7 slash commands
- ✅ Full Treasure Wars settings implementation (38 settings)
- ✅ Bedrock Protocol integration for mobile support
- ✅ Node.js 20.19.3 LTS installed
- ✅ Discord.js v14 and bedrock-protocol installed
- ⚠️ Requires Discord bot token configuration (see SETUP.md)
- ⚠️ Requires Xbox Live authentication for Hive connection

## Recent Changes
- **2025-11-14**: Initial project setup
  - Installed Node.js 20 LTS
  - Created Discord bot with command handler
  - Implemented HiveManager with all Treasure Wars settings
  - Created 7 slash commands: create, settings, invite, setrole, status, close
  - Added comprehensive SETUP.md guide for mobile compatibility
  - Configured bedrock-protocol for Hive server connection

## User Preferences
- Uses Discord slash commands for user interaction
- Supports mobile Minecraft Bedrock Edition
- Needs clear setup instructions for non-technical users
- Requires no errors and correct Node.js version (20.x LTS)

## Project Architecture

### Technology Stack
- **Runtime:** Node.js 20.19.3 LTS
- **Discord:** discord.js v14.14.1
- **Minecraft:** bedrock-protocol v3.9.0
- **Module Type:** ES Modules (import/export)

### File Structure
```
/
├── src/
│   ├── index.js                 # Main bot entry point
│   ├── commands/                # Slash command handlers
│   │   ├── create.js           # Create custom server
│   │   ├── settings.js         # View/modify settings
│   │   ├── invite.js           # Invite players
│   │   ├── setrole.js          # Set roles and teams
│   │   ├── status.js           # Check server status
│   │   └── close.js            # Close sessions
│   └── hive/
│       └── HiveManager.js      # Hive server management & settings
├── package.json                 # Dependencies and scripts
├── SETUP.md                     # Complete setup guide
├── .gitignore                   # Git ignore rules
└── replit.md                    # This file
```

### Key Components

#### 1. Discord Bot (src/index.js)
- Client initialization with required intents
- Command loading and registration
- Interaction handling
- Automatic slash command deployment

#### 2. Hive Manager (src/hive/HiveManager.js)
- Bedrock protocol connection management
- Custom server creation and navigation
- Session tracking (Map-based storage)
- Player invitation system
- All 38 Treasure Wars settings

#### 3. Slash Commands
- **create**: Initialize new Treasure Wars 4v4 game
- **settings**: Complete settings control (38 options)
- **invite**: Send player invitations
- **setrole**: Assign roles (host/cohost/player/spectator) and teams
- **status**: Monitor active sessions
- **close**: End custom server sessions

### Treasure Wars Settings (Complete List)

#### Game Setup
- MAP, MAX_PLAYERS, TEAM_SIZE, PRIVATE_GAME

#### Health & Respawn
- HEALTH, HEALTH_REGEN, RESPAWN, RESPAWN_TIME

#### Combat
- PVP_ENABLED, FALL_DAMAGE, FRIENDLY_FIRE, STARTING_GEAR

#### Treasure & Economy
- TREASURE_MULTIPLIER, CHEST_REFILL, CHEST_REFILL_TIME, TREASURE_PROTECTION

#### Building
- BLOCK_BREAK, BLOCK_PLACE, INSTANT_BREAK

#### Shop & Items
- SHOP_ENABLED, CUSTOM_SHOP_PRICES, ARMOR_ENABLED, ENCHANTMENTS, POTIONS, BOW_ENABLED, TNT_ENABLED, ENDERPEARLS

#### Time Management
- GAME_DURATION, SUDDEN_DEATH, SUDDEN_DEATH_TIME

#### Team Features
- TEAM_BALANCE, SPECTATOR_MODE

### Dependencies
- **discord.js**: Discord API wrapper with slash command support
- **bedrock-protocol**: Minecraft Bedrock Edition protocol client
- **cmake**: Required for bedrock-protocol native modules

### Environment Variables Required
- `DISCORD_TOKEN`: Discord bot authentication token
- `DISCORD_CLIENT_ID`: Discord application ID

### Hive Server Details
- **Address:** geo.hivebedrock.network
- **Port:** 19132
- **Edition:** Bedrock (Mobile/Console compatible)
- **Auth:** Xbox Live required

### Mobile Compatibility
- ✅ Bedrock protocol (same as mobile devices)
- ✅ Xbox Live authentication
- ✅ Works with iOS/Android Minecraft
- ✅ Custom server invitations
- ✅ Full feature parity with in-game settings

## Setup Requirements
1. Discord bot created with proper permissions
2. Bot token and client ID added to Replit Secrets
3. Xbox Live account for Hive authentication
4. Permissions to create custom games on Hive server

## Known Limitations
- Requires manual Xbox Live authentication on first connection
- Hive custom server limit: 20 per day (no limit for Hive Ultimate members)
- Stats don't save in custom servers (Hive limitation)
- bedrock-protocol operates at packet level (manual navigation required)

## Future Enhancements
- Automated game templates/presets
- Match statistics and leaderboards
- Tournament bracket management
- Automated player management
- Scheduled game sessions
- Spectator mode controls
- Live game updates in Discord

## Development Notes
- Uses ES Modules (import/export syntax)
- Command registration happens automatically on bot startup
- Session management via Map (in-memory, resets on restart)
- Bedrock protocol requires CMake for native bindings

## Security Considerations
- Discord token stored in Replit Secrets (never committed)
- Xbox auth tokens cached locally (gitignored)
- Session data ephemeral (no persistent storage)
- All sensitive data excluded from version control

---

Last Updated: 2025-11-14

import bedrock from 'bedrock-protocol';

class HiveManagerSingleton {
  constructor() {
    this.activeSessions = new Map();
    this.hiveServerAddress = 'geo.hivebedrock.network';
    this.hiveServerPort = 19132;
  }

  async createCustomServer(username, xboxAuthToken, settings, demoMode = true) {
    const sessionId = `${username}_${Date.now()}`;
    
    if (demoMode) {
      this.activeSessions.set(sessionId, {
        client: null,
        settings: settings,
        createdAt: new Date(),
        players: [],
        playerRoles: new Map(),
        status: 'demo',
        username: username
      });
      
      console.log(`✅ Created demo session ${sessionId} for ${username}`);
      return { sessionId, status: 'demo', mode: 'offline' };
    }

    try {
      const client = bedrock.createClient({
        host: this.hiveServerAddress,
        port: this.hiveServerPort,
        username: username,
        offline: false,
        authTitle: '00000000441cc96b',
        profilesFolder: './auth_cache',
      });

      this.activeSessions.set(sessionId, {
        client: client,
        settings: settings,
        createdAt: new Date(),
        players: [],
        playerRoles: new Map(),
        status: 'connecting',
        username: username
      });

      return new Promise((resolve, reject) => {
        const connectionTimeout = setTimeout(() => {
          const session = this.activeSessions.get(sessionId);
          if (session && session.status === 'connecting') {
            console.log(`⏱️ Connection timeout for session ${sessionId}`);
            if (client) {
              try {
                client.disconnect();
              } catch (e) {
                console.error('Error disconnecting client:', e);
              }
            }
            this.activeSessions.delete(sessionId);
            reject(new Error('Connection timeout - Xbox Live authentication may be required. See SETUP.md'));
          }
        }, 30000);

        client.on('spawn', () => {
          clearTimeout(connectionTimeout);
          console.log(`✅ Connected to Hive as ${username}`);
          const session = this.activeSessions.get(sessionId);
          if (session) {
            session.status = 'connected';
          }
          
          setTimeout(() => {
            this.navigateToCustomGames(client, sessionId, settings);
          }, 2000);
          
          resolve({ sessionId, status: 'connected', mode: 'live' });
        });

        client.on('disconnect', (packet) => {
          clearTimeout(connectionTimeout);
          console.log('Disconnected:', packet.message);
          const session = this.activeSessions.get(sessionId);
          if (session) {
            session.status = 'disconnected';
          }
        });

        client.on('text', (packet) => {
          console.log('Chat message:', packet);
          this.handleChatMessage(sessionId, packet);
        });

        client.on('error', (error) => {
          clearTimeout(connectionTimeout);
          console.error('Client error:', error);
          if (client) {
            try {
              client.disconnect();
            } catch (e) {}
          }
          this.activeSessions.delete(sessionId);
          reject(new Error(`Connection error: ${error.message}`));
        });
      });
    } catch (error) {
      console.error('Error creating custom server:', error);
      this.activeSessions.delete(sessionId);
      throw error;
    }
  }

  navigateToCustomGames(client, sessionId, settings) {
    console.log('Navigating to custom games...');
    
    setTimeout(() => {
      this.createTreasureWars4v4(client, sessionId, settings);
    }, 3000);
  }

  createTreasureWars4v4(client, sessionId, settings) {
    console.log('Creating Treasure Wars 4v4 custom server with settings:', settings);
    
    this.activeSessions.get(sessionId).status = 'creating_game';
  }

  async applySettings(sessionId, settings) {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    session.settings = { ...session.settings, ...settings };
    console.log(`Updated settings for session ${sessionId}`);
    
    return session.settings;
  }

  async invitePlayer(sessionId, playerName) {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    if (!session.players.includes(playerName)) {
      session.players.push(playerName);
    }

    console.log(`Inviting player ${playerName} to session ${sessionId}`);
    
    return { success: true, players: session.players };
  }

  async setPlayerRole(sessionId, playerName, role, team = null) {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    if (!session.playerRoles) {
      session.playerRoles = new Map();
    }

    const playerData = { role };
    if (team) {
      playerData.team = team;
    }

    session.playerRoles.set(playerName, playerData);
    console.log(`Set ${playerName} role to ${role}${team ? ` on team ${team}` : ''} in session ${sessionId}`);
    
    return { success: true, role, team };
  }

  handleChatMessage(sessionId, packet) {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

  }

  getSessionStatus(sessionId) {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      return null;
    }

    return {
      sessionId,
      status: session.status,
      settings: session.settings,
      players: session.players,
      createdAt: session.createdAt
    };
  }

  getAllActiveSessions() {
    const sessions = [];
    for (const [sessionId, session] of this.activeSessions) {
      sessions.push(this.getSessionStatus(sessionId));
    }
    return sessions;
  }

  async closeSession(sessionId) {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    if (session.client) {
      session.client.disconnect();
    }

    this.activeSessions.delete(sessionId);
    console.log(`Closed session ${sessionId}`);
    
    return { success: true };
  }
}

export const TreasureWarsSettings = {
  GAME_MODE: {
    name: 'Game Mode',
    type: 'string',
    default: 'treasure_wars_4v4',
    options: ['treasure_wars_4v4']
  },
  MAP: {
    name: 'Map Selection',
    type: 'string',
    default: 'random',
    options: ['random', 'ocean', 'western', 'pirates', 'winter', 'oriental', 'volcanic', 'desert', 'lost_city']
  },
  MAX_PLAYERS: {
    name: 'Max Players',
    type: 'integer',
    default: 16,
    min: 2,
    max: 16
  },
  TEAM_SIZE: {
    name: 'Team Size',
    type: 'integer',
    default: 4,
    options: [1, 2, 4]
  },
  HEALTH: {
    name: 'Player Health',
    type: 'integer',
    default: 20,
    options: [1, 10, 20, 40]
  },
  HEALTH_REGEN: {
    name: 'Health Regeneration',
    type: 'boolean',
    default: true
  },
  RESPAWN: {
    name: 'Respawn Enabled',
    type: 'boolean',
    default: true
  },
  RESPAWN_TIME: {
    name: 'Respawn Time (seconds)',
    type: 'integer',
    default: 5,
    min: 0,
    max: 30
  },
  STARTING_GEAR: {
    name: 'Starting Gear',
    type: 'string',
    default: 'standard',
    options: ['none', 'standard', 'iron', 'diamond']
  },
  TREASURE_MULTIPLIER: {
    name: 'Treasure Multiplier',
    type: 'number',
    default: 1.0,
    options: [0.5, 1.0, 2.0, 5.0]
  },
  CHEST_REFILL: {
    name: 'Chest Refill',
    type: 'boolean',
    default: true
  },
  CHEST_REFILL_TIME: {
    name: 'Chest Refill Time (seconds)',
    type: 'integer',
    default: 60,
    min: 10,
    max: 300
  },
  PVP_ENABLED: {
    name: 'PVP Enabled',
    type: 'boolean',
    default: true
  },
  FALL_DAMAGE: {
    name: 'Fall Damage',
    type: 'boolean',
    default: true
  },
  FRIENDLY_FIRE: {
    name: 'Friendly Fire',
    type: 'boolean',
    default: false
  },
  GAME_DURATION: {
    name: 'Game Duration (minutes)',
    type: 'integer',
    default: 20,
    min: 5,
    max: 60
  },
  SUDDEN_DEATH: {
    name: 'Sudden Death',
    type: 'boolean',
    default: true
  },
  SUDDEN_DEATH_TIME: {
    name: 'Sudden Death Time (minutes)',
    type: 'integer',
    default: 15,
    min: 5,
    max: 50
  },
  TREASURE_PROTECTION: {
    name: 'Treasure Protection Time (seconds)',
    type: 'integer',
    default: 30,
    min: 0,
    max: 120
  },
  BLOCK_BREAK: {
    name: 'Block Breaking',
    type: 'boolean',
    default: true
  },
  BLOCK_PLACE: {
    name: 'Block Placement',
    type: 'boolean',
    default: true
  },
  INSTANT_BREAK: {
    name: 'Instant Block Break',
    type: 'boolean',
    default: false
  },
  SHOP_ENABLED: {
    name: 'Shop Enabled',
    type: 'boolean',
    default: true
  },
  CUSTOM_SHOP_PRICES: {
    name: 'Custom Shop Prices',
    type: 'boolean',
    default: false
  },
  ARMOR_ENABLED: {
    name: 'Armor Enabled',
    type: 'boolean',
    default: true
  },
  ENCHANTMENTS: {
    name: 'Enchantments Enabled',
    type: 'boolean',
    default: true
  },
  POTIONS: {
    name: 'Potions Enabled',
    type: 'boolean',
    default: true
  },
  BOW_ENABLED: {
    name: 'Bow Enabled',
    type: 'boolean',
    default: true
  },
  TNT_ENABLED: {
    name: 'TNT Enabled',
    type: 'boolean',
    default: true
  },
  ENDERPEARLS: {
    name: 'Enderpearls Enabled',
    type: 'boolean',
    default: true
  },
  TEAM_BALANCE: {
    name: 'Auto Team Balance',
    type: 'boolean',
    default: true
  },
  SPECTATOR_MODE: {
    name: 'Spectator Mode',
    type: 'boolean',
    default: true
  },
  PRIVATE_GAME: {
    name: 'Private Game',
    type: 'boolean',
    default: false
  }
};

export const hiveManager = new HiveManagerSingleton();

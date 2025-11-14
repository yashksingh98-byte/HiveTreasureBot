# 🚀 Hive Discord Bot - Deployment Guide

Two options to run this bot: **On Your Computer** (easiest) or **Oracle Cloud Free Tier** (for mobile users).

---

## ✅ Option 1: Run on Your Computer (EASIEST)

### Requirements
- Windows, Mac, or Linux computer
- 10 minutes setup time

### Step-by-Step

**1. Download Node.js**
- Go to: https://nodejs.org/
- Download **LTS version 20.x**
- Install it (click Next, Next, Finish)

**2. Download This Code**
- In Replit: Click three dots (⋮) → "Download as ZIP"
- Extract the ZIP to a folder (e.g., Desktop/hive-bot)

**3. Get Discord Credentials**
- Go to: https://discord.com/developers/applications
- Create New Application → Name it → Go to "Bot" tab
- Click "Reset Token" → Copy the token
- Go to "General Information" → Copy the Application ID

**4. Set Up Bot**

Open terminal/command prompt in the bot folder:

**Windows:** Right-click folder → "Open in Terminal"  
**Mac:** Right-click folder → "New Terminal at Folder"  
**Linux:** Right-click folder → "Open Terminal Here"

Run these commands:

```bash
# Create .env file
echo DISCORD_TOKEN=paste_your_token_here > .env
echo DISCORD_CLIENT_ID=paste_your_app_id_here >> .env

# Install dependencies
npm install

# Start the bot
npm start
```

**5. Invite Bot to Discord Server**
- Discord Developer Portal → OAuth2 → URL Generator
- Select: `bot` and `applications.commands`
- Permissions: Send Messages, Embed Links, Use Slash Commands
- Copy URL → Paste in browser → Add to server

**6. Test It**
- Open Discord
- Type `/create username:YourMinecraftName`
- On first use, bot will show Microsoft login link
- Open link, sign in with Xbox account
- Done! Bot is now connected

### Keep Bot Running
The bot runs as long as your computer is on and the terminal window is open.

**To run in background (optional):**
```bash
npm install -g pm2
pm2 start src/index.js --name hive-bot
pm2 save
```

---

## ☁️ Option 2: Oracle Cloud Free Tier (FOR MOBILE USERS)

### Why Oracle Cloud?
- **FREE FOREVER** (no credit card after trial)
- Full UDP support (unlike Replit/Codespaces)
- Can setup and manage from mobile
- 24/7 uptime

### Requirements
- Mobile phone (Android/iOS)
- Email address
- 30-45 minutes setup time
- Patience for technical setup

---

### Part A: Create Oracle Cloud Account

**1. Sign Up (Mobile Browser)**
- Go to: https://www.oracle.com/cloud/free/
- Click "Start for free"
- Fill in details (email, password, country)
- Verify email
- Add payment method (won't be charged, just for verification)
- Wait for account approval (can take 10 minutes)

**2. Create a VM Instance**
- Login to: https://cloud.oracle.com/
- Click hamburger menu (≡) → Compute → Instances
- Click "Create Instance"

**Settings:**
- **Name:** hive-discord-bot
- **Image:** Ubuntu 22.04 (default)
- **Shape:** VM.Standard.E2.1.Micro (Always Free)
- **Network:** Leave default
- **SSH Keys:** Click "Generate SSH key pair" → **Download both keys** (save to your phone)
- Click "Create"

**3. Configure Firewall**
- Click your instance name
- Click "Subnet" link
- Click "Default Security List"
- Click "Add Ingress Rules"
- Add rule:
  - **Source CIDR:** 0.0.0.0/0
  - **IP Protocol:** UDP
  - **Destination Port:** 19132
  - Click "Add Ingress Rules"

**4. Get SSH App**

**Android:** Install **JuiceSSH** from Play Store  
**iOS:** Install **Termius** from App Store

---

### Part B: Install Bot on Oracle Cloud

**1. Connect via SSH**

Open SSH app and create new connection:
- **Host:** [Your instance's Public IP from Oracle Console]
- **Username:** ubuntu
- **Authentication:** SSH Key (use the private key you downloaded)
- Connect

**2. Install Node.js 20**

Run these commands in SSH terminal:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version
# Should show v20.x.x
```

**3. Upload Bot Code**

**Option A: From GitHub (If you pushed from Replit)**
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

**Option B: Manual Upload (Via SFTP)**
- Use app like **FTP Rush** (Android) or **Documents by Readdle** (iOS)
- Connect to your Oracle instance via SFTP
- Upload all bot files to `/home/ubuntu/hive-bot/`

**4. Configure Bot**

In SSH terminal:

```bash
cd hive-bot  # or wherever you put the files

# Create .env file
nano .env
```

Type:
```
DISCORD_TOKEN=your_discord_token_here
DISCORD_CLIENT_ID=your_client_id_here
```

Press: `Ctrl+X` → `Y` → `Enter` to save

**5. Install and Run**

```bash
# Install dependencies
npm install

# Install PM2 (keeps bot running)
sudo npm install -g pm2

# Start bot
pm2 start src/index.js --name hive-bot

# Save PM2 config
pm2 save

# Auto-start on reboot
pm2 startup
# Copy and run the command it shows

# Check status
pm2 status
```

**6. Configure UFW Firewall (Ubuntu)**

```bash
sudo ufw allow 22/tcp
sudo ufw allow 19132/udp
sudo ufw enable
sudo ufw status
```

---

### Part C: Xbox Live Authentication

**1. Test Bot in Discord**
- Type `/create username:YourMinecraftName`

**2. Check Logs on Server**
```bash
pm2 logs hive-bot
```

Look for a Microsoft login URL like:
```
https://login.microsoftonline.com/...
```

**3. Open URL on Mobile Browser**
- Copy the URL from logs
- Paste in mobile browser
- Sign in with your Xbox/Microsoft account
- Follow the prompts

**4. Verify Connection**
```bash
pm2 logs hive-bot
# Should show: "✅ Connected to Hive as YourUsername"
```

---

### Managing the Bot (Oracle Cloud)

**Check if running:**
```bash
pm2 status
```

**View logs:**
```bash
pm2 logs hive-bot
```

**Restart bot:**
```bash
pm2 restart hive-bot
```

**Stop bot:**
```bash
pm2 stop hive-bot
```

**Update bot code:**
```bash
cd hive-bot
git pull  # if using git
npm install
pm2 restart hive-bot
```

---

## 📊 Comparison

| Feature | Computer | Oracle Cloud |
|---------|----------|--------------|
| **Cost** | Free | Free (forever) |
| **Setup Time** | 10 mins | 30-45 mins |
| **Difficulty** | ⭐ Easy | ⭐⭐⭐⭐ Hard |
| **24/7 Uptime** | No (only when PC on) | Yes |
| **Mobile Setup** | No (need computer) | Yes |
| **UDP Support** | ✅ Yes | ✅ Yes |

---

## 🎮 Using the Bot (Same for Both Options)

Once running, use these commands in Discord:

### Create Custom Server
```
/create username:YourMinecraftName map:ocean private:true
```

### Modify Settings
```
/settings session_id:xyz123 setting:HEALTH value:40
/settings session_id:xyz123 setting:PVP_ENABLED value:true
```

### Invite Players
```
/invite session_id:xyz123 player:FriendName
```

### Assign Roles
```
/setrole session_id:xyz123 player:Name role:cohost team:red
```

### Check Status
```
/status
/status session_id:xyz123
```

### Close Session
```
/close session_id:xyz123
```

---

## 🐛 Troubleshooting

### "Connection timeout" error
- Check UDP port 19132 is open in firewall
- Verify Xbox Live authentication is complete
- Check internet connection

### "Session not found"
- Make sure you're using the correct session ID
- Session IDs expire when bot restarts (unless in demo mode)

### Bot not responding in Discord
- Check bot is online: `pm2 status` (Oracle) or check terminal (Computer)
- Verify Discord token is correct
- Re-invite bot to Discord server

### "Cannot connect to Hive"
- This is normal without Xbox auth
- Complete Xbox Live authentication first
- Check if Hive server is online: https://playhive.com/

---

## 📝 Notes

**Computer Option:**
- Simplest setup
- Only works when computer is on
- Perfect for testing and development

**Oracle Cloud Option:**
- 24/7 uptime
- More complex setup
- Best for long-term use
- Can manage entirely from mobile

**Both options support:**
- Full Bedrock Protocol
- Xbox Live authentication
- All 30+ Treasure Wars settings
- Real Hive server connections

---

## ✅ Final Checklist

**Before you start:**
- [ ] Discord bot created and tokens copied
- [ ] Decided: Computer or Oracle Cloud?
- [ ] Read the relevant guide above
- [ ] Have Xbox/Microsoft account ready

**After setup:**
- [ ] Bot shows online in Discord
- [ ] Commands registered (type `/` to see them)
- [ ] Tested `/create` command
- [ ] Completed Xbox Live auth
- [ ] Bot successfully connected to Hive

---

**Need help?** Check SETUP.md for detailed Discord bot configuration.

**Good luck! 🎉**

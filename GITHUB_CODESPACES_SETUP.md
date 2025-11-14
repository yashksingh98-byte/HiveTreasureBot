# 🚀 Running the Hive Discord Bot on GitHub Codespaces

GitHub Codespaces supports UDP connections, so this bot **SHOULD WORK** there (unlike Replit).

## Quick Setup Guide (Mobile-Friendly)

### Step 1: Create GitHub Account
1. Go to https://github.com/signup on your mobile browser
2. Create a free account if you don't have one
3. Verify your email

### Step 2: Export This Code from Replit

**Option A: Download ZIP (if you can transfer files)**
1. In Replit, click the three dots menu
2. Select "Download as ZIP"
3. Extract the ZIP on a computer
4. Upload to GitHub (need computer for this)

**Option B: Use Replit's GitHub Integration (EASIEST for mobile)**
1. In Replit sidebar, click the **Version Control** icon (looks like branches)
2. Click "Create a Git Repo"
3. Click "Connect to GitHub"
4. Authorize Replit to access GitHub
5. Push your code to a new repository

### Step 3: Open in GitHub Codespaces

1. Go to your GitHub repository (on mobile browser)
2. Tap the **Code** button (green button)
3. Switch to **Codespaces** tab
4. Tap **"Create codespace on main"**
5. Wait for it to load (might take 2-3 minutes)

### Step 4: Set Up Secrets

In the Codespace terminal, run:

```bash
# Create .env file
cat > .env << 'EOF'
DISCORD_TOKEN=your_discord_token_here
DISCORD_CLIENT_ID=your_client_id_here
EOF
```

Replace `your_discord_token_here` and `your_client_id_here` with your actual Discord credentials.

### Step 5: Install and Run

```bash
# Install dependencies
npm install

# Start the bot
npm start
```

### Step 6: Keep It Running

**Important:** Codespaces stops when you close the browser. To keep the bot running 24/7:

**Option A: Use tmux (in Codespace)**
```bash
# Start tmux session
tmux new -s bot

# Run the bot
npm start

# Detach: Press Ctrl+B then D
# The bot keeps running even if you close browser

# Reconnect later:
tmux attach -t bot
```

**Option B: Use PM2 (recommended)**
```bash
# Install PM2
npm install -g pm2

# Start bot with PM2
pm2 start src/index.js --name hive-bot

# Save the process list
pm2 save

# Check status anytime
pm2 status

# View logs
pm2 logs hive-bot
```

### Step 7: Test the Bot

1. Open Discord on your mobile
2. Go to your server
3. Type `/create` and test the command
4. It should now connect to Hive (unlike Replit!)

## GitHub Codespaces Free Limits

- **120 core-hours/month** for free accounts
- **15 GB storage**
- **2-core machine** (default)

This is enough to run the bot for most of the month!

## Important Notes

### UDP Should Work
Unlike Replit, Codespaces runs full Linux containers with UDP support enabled by default.

### Xbox Live Authentication
When you run `/create` for the first time:
1. The bot will generate a Microsoft login link
2. Open that link on your mobile browser
3. Sign in with your Xbox account
4. The bot will cache the auth token

### Keeping Codespace Alive
Codespaces auto-stops after 30 minutes of inactivity. To prevent this:
- Use PM2 (as shown above)
- Keep the browser tab open
- Set up a cron job to ping it

### Alternative: GitHub Actions (Advanced)
You could also run the bot via GitHub Actions, but this is complex and has time limits.

## Troubleshooting

### "Port already in use"
```bash
# Kill any existing Node processes
pkill node

# Restart
npm start
```

### "Cannot find module"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "Permission denied"
```bash
# Make sure you're in the right directory
cd /workspaces/your-repo-name
```

## Full Command Reference

```bash
# Start bot normally
npm start

# Start with PM2 (stays running)
pm2 start src/index.js --name hive-bot

# View bot logs
pm2 logs hive-bot

# Stop bot
pm2 stop hive-bot

# Restart bot
pm2 restart hive-bot

# Check if bot is running
pm2 status
```

## Mobile Browser Tips

1. **Use Desktop Mode**: In your mobile browser settings, enable "Desktop Site" for better GitHub UI
2. **Terminal Controls**: Swipe or pinch to zoom in terminal if text is small
3. **Copy/Paste**: Long-press to copy text in Codespace terminal

## Advantages Over Replit

✅ UDP connections work (Bedrock Protocol works!)
✅ More generous free tier
✅ Better Linux environment
✅ Can keep processes running with PM2
✅ Full control over network/ports

## Next Steps After Setup

Once running, you can:
1. Use `/create` to test Hive connection
2. Try all the Discord commands
3. Invite friends to your Discord server
4. Manage Treasure Wars games from Discord!

---

**Questions?** Check the main SETUP.md file for Discord bot configuration details.

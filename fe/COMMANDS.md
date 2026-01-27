# NPM Scripts & Commands Guide

## 🚀 Available Commands

### Development

```bash
# Start development server (hot reload enabled)
npm run dev

# Start at custom port
npm run dev -- -p 3001
```

**Output**: Server runs at `http://localhost:3000`

### Production

```bash
# Build for production
npm run build

# Start production server (after build)
npm start
```

### Type Checking

```bash
# Check TypeScript errors without building
npm run type-check

# Watch mode (re-checks on file changes)
npm run type-check -- --watch
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix ESLint errors automatically
npm run lint -- --fix
```

### All Scripts (from package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 📊 Typical Workflow

### 1️⃣ Development Cycle

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2 (optional): Type checking in watch mode
npm run type-check -- --watch

# Terminal 3 (optional): Code formatting/linting
npm run lint -- --fix
```

### 2️⃣ Before Committing

```bash
# Check types
npm run type-check

# Fix linting issues
npm run lint -- --fix

# Review changes
git diff

# Commit
git add .
git commit -m "feature: add new component"
```

### 3️⃣ Production Deployment

```bash
# Build
npm run build

# Test build locally
npm start

# Deploy to hosting (e.g., Vercel)
# vercel deploy
```

---

## 🔧 Advanced Commands

### Clear Next.js Cache

```bash
# Remove build artifacts
rm -rf .next

# Remove node_modules (if needed)
rm -rf node_modules
npm install
```

### Environment-Specific Builds

```bash
# Development build
NODE_ENV=development npm run build

# Production build
NODE_ENV=production npm run build
```

### Port Management

```bash
# Use different port
npm run dev -- -p 3001

# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

---

## 🐛 Troubleshooting Commands

### If Build Fails

```bash
# 1. Clear cache
rm -rf .next

# 2. Reinstall dependencies
rm -rf node_modules
npm install

# 3. Type check
npm run type-check

# 4. Lint check
npm run lint

# 5. Try build again
npm run build
```

### If Dev Server Won't Start

```bash
# Check if port is in use
lsof -i :3000

# Kill existing process
kill -9 <PID>

# Try again
npm run dev
```

### Check Dependencies

```bash
# List outdated packages
npm outdated

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (may break things)
npm audit fix --force
```

---

## 📈 Performance Monitoring

### Build Analysis

```bash
# Analyze bundle size
npm run build

# Output shows:
# ✓ Compiled successfully
# Creating an optimized production build ...
# ✓ Optimized
# ✓ Linting and checking validity of types
```

### Production Metrics

After `npm start`:
- Page load time
- TTL (Time to Live)
- CPU usage
- Memory usage

---

## 🚀 Deployment Commands

### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Docker Deployment

```bash
# Build Docker image
docker build -t retail-chain-fe .

# Run container
docker run -p 3000:3000 retail-chain-fe
```

### Static Export

```bash
# Configure next.config.js
output: 'export'

# Build static site
npm run build

# Output in ./out directory
```

---

## 📝 Creating a Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 🔒 Security Checks

```bash
# Check for vulnerabilities
npm audit

# Get detailed report
npm audit --json

# Only show high/critical
npm audit --audit-level=moderate
```

---

## 💾 Backup & Version Control

```bash
# Create backup
npm run build
tar -czf backup-$(date +%s).tar.gz .

# Initialize git
git init
git add .
git commit -m "initial commit"

# Add remote
git remote add origin <repo-url>
git push -u origin main
```

---

## 🎯 Quick Reference Card

| Task | Command |
|------|---------|
| Start dev | `npm run dev` |
| Build prod | `npm run build` |
| Run prod | `npm start` |
| Type check | `npm run type-check` |
| Lint code | `npm run lint` |
| Fix lint | `npm run lint -- --fix` |
| Check deps | `npm outdated` |
| Audit security | `npm audit` |
| Fix vulnerabilities | `npm audit fix` |
| Clear cache | `rm -rf .next` |
| Reinstall | `npm install` |

---

## 📚 Useful Links

- [Next.js CLI Reference](https://nextjs.org/docs/app/api-reference/next-cli)
- [npm Scripts Documentation](https://docs.npmjs.com/cli/v8/commands/npm-run-script)
- [TypeScript CLI](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [ESLint CLI](https://eslint.org/docs/user-guide/command-line-interface)

---

**Last Updated**: January 27, 2026
**Framework**: Next.js 14.2

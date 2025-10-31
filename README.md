# BrainWave
BrainWave ,a TypeScript project, is a personal knowledge management application designed to help users store, organize, and retrieve information effortlessly from multiple content sources like - Twitter, YouTube, Google Docs, and more — all in one centralized hub. Second Brain enables users to build a personal digital repository that grows with them over time.

## Key Features:
- ✨ Save content from various platforms (Twitter threads, YouTube links/notes, Google Docs references, and custom text entries)
- 📂 Categorize and tag content for easy organization
- 🧠 Knowledge dashboard to view, filter, and explore saved content
- 🏷️ Smart tagging and content grouping for meaningful organization
- 🔐 Secure personal access with user authentication
- ☁️ Cloud-based storage to access information anywhere

## Technology Stack:
- Frontend: React.js (with component-based UI)
- Backend: Node.js + Express.js REST API
- Database: MongoDB for scalable and flexible content storage
- Other Tools: JWT authentication, APIs for fetching content metadata, and modern UI libraries for clean UX

## Objective:
To create a centralized personal knowledge system that streamlines content capture from multiple sources, helping users store, learn, and revisit valuable information seamlessly — essentially building a digital extension of their memory and learning system.

## Installation:
```
Will Update after project completion
```


<br/><br/><br/>

## Steps for Project creation:

### Step 1 -
- initializing the project - 
```
npm init -y
```
- installing TypeScript as a dev dependency & initializing ts project -
```
npm install -D typescript

npx tsc --init
```

- change rootDir and outDir in tsconfig.json
```javascript
"rootDir": "./src",
"outDir": "./dist"
```
<br/>

- install express - 
```
npm install express
```
<br/>

- src/index.ts - 
```typescript
import express from "express"
const app = express()
```

<br/>

- add/change in tsconfig.json
```javascript
{
  "compilerOptions": {
    "module": "ESNext",     // or "NodeNext"
    "target": "ES2020",     // or higher
    "moduleResolution": "NodeNext", 
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}

```

- change in package.json -
```javascript
{
  "type": "module"
}

```

<br/><br/><br/>
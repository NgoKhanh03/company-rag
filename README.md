# Novadoc — RAG Workspace cho tài liệu doanh nghiệp

> **AI-powered RAG workspace** — Upload documents, ask questions in natural language, get instant answers with source citations.

[![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-7C3AED?style=flat-square)](https://lovable.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square)](https://react.dev)
[![TanStack Start](https://img.shields.io/badge/TanStack%20Start-latest-FF4154?style=flat-square)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square)](https://tailwindcss.com)

---

## 🌟 Overview

Novadoc is a **Retrieval-Augmented Generation (RAG) workspace** that lets teams upload internal documents and ask questions in natural language. The system retrieves relevant content from your documents and generates accurate answers with source citations — no more digging through folders or PDFs.

**Built for:** HR, legal, finance, operations, and knowledge management teams.

---

## ✨ Features

### 📊 Dashboard & Analytics
- Real-time usage analytics (queries, documents ingested, active users)
- Topic distribution breakdown
- Daily/weekly trend charts
- Accuracy rate tracking

### 📄 Document Management
- Upload documents (PDF, DOCX, TXT, Markdown)
- Document categorization by topic
- Version history & restore
- Backup/restore workspace

### 🔍 AI-Powered Search & Q&A
- Natural language querying
- Source-attributed answers
- Multi-document cross-referencing
- Relevance scoring

### 👥 Team Collaboration
- Multi-user workspace
- Role-based access (admin, editor, viewer)
- Shared document library
- Activity feed & notifications

### 🌐 Internationalization
- Multi-language UI (Vietnamese & English)
- Language switcher
- Extensible i18n framework

### ⚙️ Admin & Settings
- User management
- Workspace configuration
- API key management (coming soon)
- Audit logs

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [TanStack Start](https://tanstack.com/start) (React 19 + Vite 8) |
| **Language** | TypeScript 5.8 |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Routing** | TanStack Router (file-based) |
| **State** | TanStack Query / React Query |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod |
| **i18n** | Custom I18nProvider |
| **Build** | Bun + Vite |

---

## 📁 Project Structure

```
src/
├── components/        # UI components
│   ├── ui/            # shadcn/ui primitives
│   ├── app-shell.tsx  # Main app layout
│   ├── app-sidebar.tsx
│   ├── auth-shell.tsx
│   ├── backup-dialog.tsx
│   ├── restore-dialog.tsx
│   ├── document-actions.tsx
│   ├── empty-state.tsx
│   ├── language-switcher.tsx
│   ├── notifications-popover.tsx
│   ├── settings-layout.tsx
│   ├── stat-card.tsx
│   ├── status-badge.tsx
│   ├── upload-document-dialog.tsx
│   ├── user-menu.tsx
│   └── workspace-switcher.tsx
├── hooks/             # Custom React hooks
├── lib/               # Utilities
│   ├── i18n.ts        # Internationalization
│   └── lovable-error-reporting.ts
├── routes/            # File-based routes (TanStack Router)
│   ├── __root.tsx     # Root layout + error boundary
│   └── index.tsx      # Dashboard page
├── server.ts          # Server entry
├── start.ts           # App entry
└── styles.css         # Global styles (Tailwind)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [Bun](https://bun.sh/) (recommended) or npm/pnpm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/NgoKhanh03/company-rag.git
cd company-rag

# Install dependencies
bun install

# Start development server
bun dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
bun run build
bun run preview
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NgoKhanh03/company-rag)

1. Push to GitHub
2. Connect repo to Vercel
3. Set build command: `bun run build`
4. Set output directory: `dist`
5. Deploy 🚀

### Deploy to Netlify

1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `bun run build`
4. Publish directory: `dist`

---

## 📸 Screenshots

> *Screenshots coming soon — deploy the app to see it in action!*

| Dashboard | Document Upload | Analytics |
|---|---|---|
| ![Dashboard](https://via.placeholder.com/400x250?text=Dashboard) | ![Upload](https://via.placeholder.com/400x250?text=Upload) | ![Analytics](https://via.placeholder.com/400x250?text=Analytics) |

---

## 🗺️ Roadmap

- [ ] **Backend API** — Node.js/NestJS server with document processing pipeline
- [ ] **AI Integration** — OpenAI/Claude API for RAG queries
- [ ] **Vector Database** — Store embeddings for semantic search
- [ ] **Authentication** — OAuth / JWT user auth
- [ ] **Full-text Search** — PostgreSQL full-text search integration
- [ ] **Mobile Responsive** — Better mobile experience
- [ ] **Dark Mode** — Theme toggle

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📄 License

MIT © [Ngo Khanh](https://github.com/NgoKhanh03)

---

## 🙏 Built With

- [Lovable](https://lovable.dev) — AI-powered web app builder
- [shadcn/ui](https://ui.shadcn.com) — Beautifully designed components
- [TanStack](https://tanstack.com) — High-quality React libraries
- [Recharts](https://recharts.org) — Composable charting library

---

<p align="center">
  <sub>Built by <a href="https://github.com/NgoKhanh03">Ngo Khanh</a> · Full-stack Developer · Node.js · React · AWS</sub>
</p>

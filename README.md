````md
# 🚀 RwgPulse – AI-Powered Risk & Compliance Dashboard

RwgPulse is a modern **Next.js 13 (App Router)** application designed for **AI-driven document analysis**, **risk assessment**, and **regulatory compliance workflows**.  
It integrates **Google Gemini**, **Supabase**, and a clean dashboard architecture to support scalable, production-ready development.

---

## ✨ Features

- ⚡ **Next.js 13 App Router** (modern routing & layouts)
- 🤖 **AI PDF Analysis Pipeline**
  - Powered by **Google Gemini (1.5 Flash)**
  - Persona-driven regulatory analysis
- 📊 **Dashboard-first architecture**
- 🔐 **Supabase integration**
  - Auth-ready middleware
  - Future database & storage support
- 🎨 **Tailwind CSS** for fast, consistent UI
- 🧱 Clean separation of concerns (`app`, `components`, `lib`, `types`)
- 🧪 Robust error handling & API responses

---

## 🗂️ Project Structure

```text
.
├── app/
│   ├── api/                # API routes (AI analysis, etc.)
│   ├── dashboard/          # Dashboard pages (/dashboard)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Entry route (redirects or landing page)
│   ├── globals.css
│   └── favicon.ico
│
├── components/             # Reusable UI components
├── lib/                    # Helpers, clients, utilities
├── supabase/               # Supabase related config/types
├── types/                  # Global TypeScript types
├── public/                 # Static assets
│
├── middleware.ts           # Edge middleware (auth / guards)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
````

---

## 🧠 AI Analysis Pipeline

* Endpoint: `POST /api/analyze`
* Model: **Google Gemini 1.5 Flash**
* Persona: **RegPulse** (strict regulatory & compliance analyst)
* Output: Structured JSON with risks, findings, and recommendations

Designed to:

* Analyze PDFs or extracted text
* Identify compliance risks
* Produce deterministic, audit-friendly responses

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key

# Google Gemini
GOOGLE_GENERATIVE_AI_API_KEY=your_google_gemini_api_key
```

> ⚠️ **Never commit `.env.local` to GitHub**

---

## ▶️ Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📍 Routes Overview

| Route          | Description                       |
| -------------- | --------------------------------- |
| `/`            | Entry route (landing or redirect) |
| `/dashboard`   | Main dashboard UI                 |
| `/api/analyze` | AI analysis endpoint              |

---

## 🛡️ Middleware & Auth

* Edge middleware is set up in `middleware.ts`
* Supabase auth can be enabled or disabled safely
* API routes can be selectively bypassed or protected

> Middleware is intentionally modular to support future auth hardening.

---

## 🎨 Styling

* **Tailwind CSS**
* Global styles in `app/globals.css`
* Component-level styling encouraged

---

## 🧪 Error Handling

* API routes return structured JSON errors
* Runtime guards prevent crashes from missing env vars
* Development-friendly logging

---

## 🚧 Roadmap

* [ ] Supabase Auth UI
* [ ] Persistent risk reports
* [ ] Role-based access control
* [ ] File upload & storage
* [ ] Production deployment (Vercel)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit with clear messages
4. Open a pull request

---

## 📄 License

MIT License © 2026

---

## 💡 Acknowledgements

* Next.js
* Supabase
* Google Generative AI
* Tailwind CSS

---

> Built with focus on **clarity, stability, and scalability**.

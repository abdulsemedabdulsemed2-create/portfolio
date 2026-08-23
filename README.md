# Personal Portfolio

A personal portfolio website built with **React + Vite**. Showcases an about
section, skills, projects, work experience, and contact info.

## Editing your content

All content lives in plain data files — no need to touch the components:

| File | What to edit |
| --- | --- |
| `src/data/profile.js` | Your name, role, tagline, about text, email, social links |
| `src/data/skills.js` | Skill groups and badges |
| `src/data/projects.js` | Your projects (title, description, tech, links) |
| `src/data/experience.js` | Internships and work experience |

Also update the `<title>` in `index.html`.

## Run locally

```
npm install
npm run dev
```

## Build for production

```
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to vercel.com, click Add New -> Project, and import the repo.
3. Vercel auto-detects Vite (build: `npm run build`, output: `dist`).
4. Click Deploy. Every push redeploys automatically.

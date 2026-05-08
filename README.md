# [Your Business Name] — Website

Small Business Operations & Technology Growth Partner — company website.

## Quick Start

Open `index.html` in your browser to preview the site locally. No build tools needed.

```bash
# Optional: use Live Server in VSCode for auto-refresh on save
# Install the "Live Server" extension, then right-click index.html → "Open with Live Server"
```

## Project Structure

```
consulting-website/
├── index.html          ← Main page (all sections in one file)
├── css/
│   └── style.css       ← All styles, colors, responsive layout
├── js/
│   └── main.js         ← Interactions: nav, mobile menu, animations, form
├── images/             ← Drop your own photos here
│   └── (your images)
├── .gitignore
└── README.md
```

## Things To Update

Search for these placeholders and replace them with your real info:

| Placeholder | What to put |
|---|---|
| `[Your Business Name]` | Your actual business name |
| `[your@email.com]` | Your contact email |
| `[Your Phone Number]` | Your phone number |
| `[Your City, State]` | Your location |
| `YOUR_FORM_ID` | Your Formspree form ID (see below) |

## Swapping the Hero Photo

In `css/style.css`, find `.hero` and update the `background-image` URL:

```css
.hero {
  background-image: url('images/your-hero-photo.jpg'); /* local file */
  /* OR */
  background-image: url('https://your-photo-url.com/photo.jpg'); /* external */
}
```

## Setting Up the Contact Form (Formspree)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — it gives you a Form ID like `xyzabcde`
3. In `index.html`, find the `<form>` tag and replace `YOUR_FORM_ID`:
   ```html
   <form action="https://formspree.io/f/xyzabcde" ...>
   ```
4. Done — form submissions will go straight to your email.

## Deploying to GitHub Pages (Free Hosting)

1. Push this repo to GitHub (see below)
2. Go to your repo on GitHub → Settings → Pages
3. Source: `main` branch → `/ (root)` → Save
4. Your site will be live at: `https://malakm2003.github.io/consulting-website/`

## Connecting to GitHub

```bash
# 1. Create a new repo on github.com named "consulting-website" (no README, no .gitignore)
# 2. Then run these commands in this folder:

git remote add origin https://github.com/malakm2003/consulting-website.git
git add .
git commit -m "Initial commit: consulting website"
git push -u origin main
```

## Color Palette (for reference)

| Name | Hex | Usage |
|---|---|---|
| Parchment | `#FAF7F2` | Page background |
| Light Sand | `#F0E8D8` | Alt sections |
| Medium Sand | `#D9C9B0` | Borders |
| Stone | `#8B7B6B` | Secondary text |
| Dark Walnut | `#3D3530` | Dark sections, text |
| Sage Green | `#7A9E7E` | Primary accent, buttons |
| Sage Dark | `#527A56` | Hover states |
| Sage Light | `#A8C5AA` | Tints, hero text |

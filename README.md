
# 🌞 Sunshine Boyz Mindanao – Landing Page

This is the official landing page for **SSB Mindanao (Sunshine Boyz Mindanao)** – a community of motorcycle enthusiasts united by camaraderie, discipline, and a shared passion for riding.

Built with **React** and **Bootstrap**, this responsive page includes dynamic member profiles, a clear mission section, and a smooth UI optimized for desktop and mobile.

---

## 📁 Project Structure

```
ssb-mindanao/
├── public/
│   ├── logo.png                # Logo of the group
│   └── members/                # Folder for member photos
│       ├── john.jpg
│       ├── jane.jpg
│       └── default.jpg         # Fallback image if photo is missing
├── src/
│   ├── App.js                  # Main application
│   ├── App.css                 # Custom styling
│   └── index.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install dependencies

Ensure you're in the project root, then run:

```bash
npm install
```

---

### 2. Run in development mode

```bash
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

### 3. Build for production

```bash
npm run build
```

---

## 🧑‍🤝‍🧑 Adding or Updating Members

1. Go to `App.js`
2. Find the `members` array:
```js
const members = [
  {
    name: 'John Doe',
    role: 'President',
    image: '/members/john.jpg',
    bio: 'Experienced rider and founding member.'
  },
  // Add more members here
];
```

3. Upload the member’s image to:
```
public/members/
```

> ✅ Image should be named the same as referenced in the `image` field (e.g., `john.jpg`)

4. If a member has no photo, the default image (`default.jpg`) will be used automatically.

---

## ✨ Features

- Responsive layout (Bootstrap-based)
- Navigation bar with smooth scroll
- Sections:
  - Hero Banner
  - About
  - Origin & Purpose
  - Clarification of Status
  - Member Profiles (with modal)
- Member image fallback
- Easy-to-maintain JSON-style data array

---

## 🔧 Optional Enhancements

- Add form for "Join Us"
- Connect to a database or CMS for live updates
- Add animations with Framer Motion or AOS
- Social media links and gallery page

---

## 📄 License

This project is for internal use by **SSB Mindanao** only. All rights reserved.

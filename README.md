# Digi-Lib — Digital Library Book Finder (React)

A multi-page React app for a digital library, built with Vite, React Router, and Context API. Same experience as the design mockup: Get Started → Sign Up / Log In → full dashboard with Home, Explore, Categories, My Books, Bookmarks, History, Help & Support, and Profile.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  main.jsx              # React entry point
  App.jsx                # Route definitions
  index.css              # Imports all stylesheets in order
  assets/
    logo.png              # Digi-Lib logo
  context/
    AppContext.jsx         # Global state: auth, books, bookmarks, wishlist, reservations, history, toast
  data/
    books.js               # Book catalogue + cover gradient helper
    categories.js           # Category list with icons/colors
    faqs.js                  # Help & Support FAQ content
  components/
    Logo.jsx                 # Brand lockup (logo + wordmark)
    Sidebar.jsx                # App navigation
    Topbar.jsx                  # Top bar with breadcrumb, notifications, avatar
    BookCard.jsx                 # Grid book card (Home, Bookmarks)
    BookModal.jsx                 # Book detail modal
    EmptyState.jsx                 # Empty-list placeholder
    Toast.jsx                       # Bottom toast notification
  pages/
    GetStarted.jsx           # Landing page with "Get Started" CTA
    Auth.jsx                   # Combined Login / Sign Up screen
    AppLayout.jsx                # Sidebar + Topbar shell, guards auth, renders nested route
    Home.jsx
    Explore.jsx
    Categories.jsx
    MyBooks.jsx
    Bookmarks.jsx
    HistoryPage.jsx
    Help.jsx
    Profile.jsx
  styles/
    tokens.css               # Color/typography/spacing variables + resets
    layout.css                # Sidebar, topbar, page shell
    components.css              # Buttons, book cards, modal, toast, empty state
    getstarted.css, auth.css, home.css, explore.css,
    categories.css, mybooks.css, history.css, help.css, profile.css
```

## Notes

- All state (auth session, borrowed/reserved/bookmarked books, history) lives in memory via React Context — refreshing the page resets it, since there's no backend.
- Signing up or logging in with any email/password works — this is a front-end prototype without real authentication.
- The brand color (`#05703D`) is sampled directly from the provided Digi-Lib logo.

# MovieFlix

A movie and TV show discovery app built with React, powered by the [TMDB API](https://www.themoviedb.org/documentation/api). Browse trending content, search across movies and shows, and save your favorites.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss)

---

## Features

- **Hero section** — featured trending title with backdrop image on the homepage
- **Carousels** — horizontally scrollable rows for Trending, Popular Movies, Popular Shows, and Top Rated
- **Multi-search** — debounced search across movies and TV shows via TMDB's `/search/multi` endpoint; results replace the homepage without navigating away
- **Movie detail page** — full info including poster, overview, rating, and release date
- **Favorites** — add/remove favorites from any card, persisted to `localStorage` via Redux Toolkit
- **Responsive layout** — mobile-first grid and carousel breakpoints with Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19, JSX |
| Styling | Tailwind CSS 4 |
| State management | Redux Toolkit 2 + React Redux |
| Routing | React Router DOM 7 |
| Build tool | Vite 8 |
| Testing | Vitest + React Testing Library |
| API | TMDB REST API v3 |

---

## Project Structure

```
src/
  components/
    Carousel.jsx      # Reusable horizontal scroll row — accepts fetchFunction or staticMovies
    Grid.jsx          # Search results grid
    Hero.jsx          # Full-width featured movie banner
    MovieCard.jsx     # Poster card with favorite toggle
    Navbar.jsx        # Fixed nav with debounced search input
    SearchBar.jsx     # Expandable search input with close button
  hooks/
    useFetch.js       # Generic async data fetching hook (data, isLoading, error)
  pages/
    HomePage.jsx      # Browse mode (hero + carousels) or search mode (grid)
    DetailPage.jsx    # Single movie detail view
    FavoritesPage.jsx # User's saved favorites
  services/
    tmdb.js           # All TMDB API calls — fetch and throw on failure
    config.js         # Base URL constant
  store/
    favoritesSlice.js # Redux slice — addFavorite, removeFavorite, localStorage hydration
    store.js          # Redux store configuration
```

---

## Architecture Decisions

**Custom `useFetch` hook** — centralizes loading, error, and data state for all async operations. Accepts a function reference (not a call) so it controls when the fetch fires. Handles null fetch functions for conditional fetching.

**Service layer** — all TMDB calls live in `services/tmdb.js`. Components never call `fetch` directly. Services throw on non-OK responses; error handling lives in the hook and UI layers.

**Redux for favorites only** — local UI state uses `useState`, global shared state (favorites) uses Redux Toolkit. Favorites are initialized from `localStorage` on load and synced back on every change via a `useEffect` in `App.jsx`.

**URL as search state** — the search query lives in the URL (`?query=batman`), not in React state. `Navbar` writes to it, `HomePage` reads from it. This makes searches bookmarkable and shareable.

**Debounced search** — 400ms debounce on the search input using `useEffect` + `setTimeout` + cleanup to avoid firing a request on every keystroke.

**`useCallback` for stable references** — fetch functions passed to `useFetch` are memoized with `useCallback` to prevent infinite re-fetch loops caused by new function references on every render.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Setup

```bash
git clone https://github.com/JoacoGDev/MovieFlix.git
cd MovieFlix
npm install
```

Create a `.env` file in the project root:

```
VITE_TMDB_API_KEY=your_api_key_here
```

```bash
npm run dev
```

### Running Tests

```bash
npx vitest
```

The test suite covers:
- `useFetch` — loading state, error handling, successful data fetch, null fetch function guard
- `favoritesSlice` — `addFavorite` and `removeFavorite` reducers

---

## API Endpoints Used

| Endpoint | Usage |
|---|---|
| `/trending/all/week` | Hero section + Trending carousel |
| `/movie/popular` | Popular Movies carousel |
| `/tv/popular` | Popular Shows carousel |
| `/movie/top_rated` | Top Rated carousel |
| `/search/multi?query=` | Multi-search (movies + TV shows) |
| `/movie/:id` | Movie detail page |

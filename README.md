# Lola's Galaxy Blog 🐾✨

**Interactive, multi-page website built with HTML5, CSS3, and vanilla JavaScript.**

[**Live Demo**](https://elizageorgiana0920.github.io/LOLA-S-BLOG/) · [**Source Code**](https://github.com/elizageorgiana0920/LOLA-S-BLOG)

Lola's Galaxy Blog is a playful, space-themed website featuring stories and photos of Lola, a cat. I independently designed and implemented it as a university web development project, focusing on **responsive design, DOM manipulation, event handling, browser storage, form validation, and asynchronous data loading**—without frontend frameworks.

## Features

- **Multi-page experience:** home, stories, photo gallery, contact, and sign-in pages with thematic navigation and media content.
- **Responsive styling:** layouts built with CSS Grid, Flexbox, media queries, animations, transitions, and interactive navigation elements.
- **Interactive home page:** an HTML5 Canvas mini-game where users click animated objects to increase a score.
- **Client-side registration and sessions:** registration form with email/password checks and a `UserSession` JavaScript class that saves display-name/session information in `localStorage` and updates the interface after login or logout.
- **Comments:** asynchronous loading of initial comments from `comentarii.json` using the Fetch API; visitor-added comments are stored in their own browser's `localStorage`.
- **Form validation:** regular-expression email validation, password length and confirmation checks, and minimum message-length validation with visual feedback.
- **Dynamic UI:** DOM element creation, event listeners, keyboard and mouse interactions, timed updates, and interactive media.

## Technology Stack

| Area | Technologies |
| --- | --- |
| Structure | Semantic HTML5, multi-page documents |
| Styling | CSS3, Flexbox, Grid, media queries, transitions, animations |
| Programming | Vanilla JavaScript (ES6 classes, arrays, objects, timers) |
| Browser APIs | DOM, Events, Canvas, `localStorage`, Fetch |
| Data format | JSON |
| Deployment | GitHub Pages |

## How It Works

### Browser-based session state

The `UserSession` class stores a username and login date in `localStorage`, restores the stored state after a refresh, and supports logout by removing that data. The interface displays a customized greeting for a signed-in visitor.

**Important:** This is a **client-side demonstration**, not secure authentication. There is no backend, account database, server-side password verification, or real access control.

### JSON comments and local persistence

The site retrieves sample comments from `comentarii.json` using `fetch()`. Visitors can add comments that appear in the interface and persist in **their own browser** using `localStorage`. These comments are not written back to the repository and are not shared between visitors.

### Canvas interaction

The home page includes an HTML5 Canvas mini-game with animated objects, pointer interactions, and score tracking. Other pages use DOM events to provide feedback and update interface elements without a framework.

## Project Structure

```text
LOLA-S-BLOG/
├── index.html          # Homepage and interactive Canvas game
├── povesti.html        # Stories
├── poze.html           # Photo gallery
├── contact.html        # Contact and interactive forms
├── signin.html         # Client-side registration / sign-in experience
├── style.css           # Shared styling and responsive layouts
├── script.js           # Interactivity, validation, storage, fetch, Canvas
├── comentarii.json     # Sample comment data loaded through Fetch API
├── logo.png            # Branding asset
├── fundal*.png / .jpg  # Background images
├── poza*.jpeg / .jpg   # Gallery and content images
└── video*.mp4          # Video content
```

## Run Locally

### Option 1: Open the hosted site

Visit the **[Live Demo](https://elizageorgiana0920.github.io/LOLA-S-BLOG/)**. No installation is required.

### Option 2: Run a local server

Clone the repository:

```bash
git clone https://github.com/elizageorgiana0920/LOLA-S-BLOG.git
cd LOLA-S-BLOG
```

Start a simple HTTP server with Python:

```bash
python -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

> Use a local server rather than opening `index.html` with `file://` because `fetch('comentarii.json')` may be blocked by browser restrictions for local files.

## What I Practiced

- Building a complete responsive website independently, without a framework.
- Writing event-driven JavaScript and updating the DOM dynamically.
- Working with asynchronous JSON requests through the Fetch API.
- Managing browser-local state with classes, `localStorage`, and JSON serialization.
- Validating user input and providing interactive feedback.
- Implementing Canvas-based interactions and animations.
- Publishing a static website through GitHub Pages.

## Limitations and Next Steps

This is a **frontend-only university project** rather than a production web application.

- The login/logout feature is a browser-local simulation, **not** production-grade authentication.
- Comments saved by visitors remain local to their browser; there is no shared database.
- User-generated comment text is currently inserted using `innerHTML`. A security improvement would be to construct DOM nodes and insert untrusted text via `textContent`, reducing cross-site scripting (XSS) risk.
- The JSON fetch flow could benefit from explicit error handling and a user-visible fallback state.
- Next steps could include accessibility audits, automated UI tests, and separating JavaScript into smaller modules.

## Author

**Eliza-Georgiana Boroș**  
Computer Science student, University of Bucharest  
[GitHub](https://github.com/elizageorgiana0920) · [LinkedIn](https://www.linkedin.com/in/eliza-boro%C8%99-b39020225/)

**Project type:** Individual university web development project.

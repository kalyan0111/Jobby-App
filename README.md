# Jobby App 💼 [Live Demo](https://jobby-app-liard-ten.vercel.app/login)

A full-featured, responsive job portal web application built with **React.js**. Jobby enables job seekers to authenticate, browse through job listings, filter opportunities based on employment type and salary brackets, search by keywords, and view detailed information for individual job postings alongside similar recommendations.

---

## 🚀 Features

* **User Authentication & Authorization**
  * Secure JWT-based authentication storing tokens using `js-cookie`.
  * Custom higher-order `ProtectedRoute` wrapper preventing unauthorized access to core application routes.
  * Auto-redirection for authenticated users attempting to access the login page.

* **Dynamic Job Search & Multi-Criteria Filtering**
  * Simultaneous filtering by **Employment Type** (Full Time, Part Time, Freelance, Internship).
  * Filter jobs by **Minimum Salary Range** brackets.
  * Real-time dynamic search bar with query keyword filtering.

* **Detailed Job Views & Recommendations**
  * Dynamic routing (`/jobs/:id`) to display detailed descriptions, location, package (LPA), required skills, company details, and external links.
  * "Similar Jobs" section rendered dynamically based on current job specifications.

* **User Profile & State Handling**
  * User profile details fetched directly from backend APIs.
  * Comprehensive state management across **Loading** (Spinners), **Success**, **Failure** (Retry options), and **Empty Results** views.

---

## 🛠️ Tech Stack & Dependencies

* **Frontend Framework:** React.js
* **Routing:** React Router DOM (v5)
* **Authentication:** Cookies (`js-cookie`), JSON Web Tokens (JWT)
* **Icons & Styling:** React Icons, Pure CSS3
* **Package Manager / Runtime:** Node.js, npm / pnpm / Bun

---

## 📁 Project Structure

```text
jobby-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── Components/
│   │   ├── Header/             # Navigation bar with brand logo & logout
│   │   ├── Home/               # Hero section & landing view
│   │   ├── JobItemDetails/     # Detailed job specs & similar job recommendations
│   │   ├── Jobs/               # Main dashboard, profile section & multi-filters
│   │   ├── Login/              # Authentication form & error alerts
│   │   ├── NotFound/           # Fallback 404 page
│   │   └── ProtectedRoute/     # Auth-guard route wrapper
│   ├── App.css
│   ├── App.js                  # Main application routing setup
│   ├── index.js                # React DOM entry point
│   └── setupTests.js
├── package.json
└── README.md
```
## 🔑 Demo Credentials
Use the following test credentials on the Login page to access the application dashboard:

Username: ```rahul```

Password: ``` rahul@2021```

[Live Demo](https://jobby-app-liard-ten.vercel.app/login)

<img width="1911" height="967" alt="Screenshot 2026-08-12 063935" src="https://github.com/user-attachments/assets/bd0c8523-094a-4981-b35d-1908c971b17a" />

<img width="1919" height="968" alt="Screenshot 2026-08-12 063953" src="https://github.com/user-attachments/assets/00eae848-c7ec-43f7-b6fa-aaada4a560b8" />

<img width="1919" height="962" alt="Screenshot 2026-08-12 064014" src="https://github.com/user-attachments/assets/184c226a-2c12-4915-b6c8-2d19baa6c3cf" />


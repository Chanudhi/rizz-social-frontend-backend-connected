# Social Media Platform

A full-stack social media application built with React (frontend) and Node.js (backend).

## Project Structure

```
SocialMediaPlatform/
├── rizz-social/                 # Frontend (React)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/              # Page components
│   │   └── assets/             # Static assets
│   └── package.json
├── Social-media-web-Backend-main/  # Backend (Node.js/Express)
│   ├── controllers/            # Route handlers
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   ├── middlewares/           # Custom middleware
│   ├── configs/               # Configuration files
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Frontend Setup
```bash
cd rizz-social
npm install
npm start
```

### Backend Setup
```bash
cd Social-media-web-Backend-main
npm install
npm start
```

## Features
- User authentication and registration
- Create, edit, and delete posts
- User profiles
- Social interactions (friends, etc.)
- Responsive design with Tailwind CSS

## Technologies Used

### Frontend
- React.js
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- Database integration
- JWT authentication
- File upload handling



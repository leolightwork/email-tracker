# MailPilot — Automated Email Reminder System

MailPilot is a full-stack web application that allows users to create, schedule, manage, and automatically send structured email reminders. The system stores submissions in a MongoDB database and tracks message status to ensure reliability and transparency.

This project demonstrates practical experience building and integrating a React frontend with a Node.js/Express backend, REST APIs, database modeling, and automated email workflows.

---

## Features

- Create, update, and delete scheduled email reminders
- Automatic email delivery using Nodemailer
- Track email status (pending, sent, failed)
- Form validation and error handling
- Persistent storage with MongoDB
- RESTful API architecture

---

## Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- CSS

### Backend
- Node.js
- Express

### Database
- MongoDB

### Email Service
- Nodemailer

### Tools
- Git
- npm

---

## Architecture Overview

The React client communicates with an Express API using HTTP requests.  
The Express server handles business logic, validates input, interacts with MongoDB through Mongoose models, and triggers email delivery through Nodemailer.
#### AUTOMATED EMAIL SUBMISSION UI INTERFACE

The Automated Email Submission Interface is a web-based tool designed to automate and simplify the process of sending structured emails for submissions. It an admin users to compose, schedule, and automatically send messages to specific recipients. Provides real-time status tracking for sent, pending, and failed messages, ensuring reliability and transparency. This project demonstrates an understanding of automation, input validation, and API integration in modern web applications

### Tech Stach
* React (node js required)
* Flask
* Python (3.12+ Required)

### Getting started

### 1. Clone the repository

```bash
git clone https://github.com/leolightwork/email-tracker-frontend.git
cd email-tracker-frontend
```

### 2. Setup Client (React)

```bash
cd client
npm install
npm run build
```

### 3. Setup Backend (Flask)

```bash
cd server

#create virtual environment
py -3 -m venv .venv #windows
python3 -m venv .venv #mac/linux

#activate virtual environment (do this every time before launch)
.venv\Scripts\activate #windows
. .venv/bin/activate #mac/linux

pip install -r requirements.txt
flask --app .\main.py run --port=8080
```

You can now open the app by navigating to http://127.0.0.1:8080 in your browser.
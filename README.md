#### AUTOMATED EMAIL SUBMISSION UI INTERFACE

The Automated Email Submission Interface is a web-based application that streamlines the creation, scheduling, and delivery of structured email submissions. It enables administrators to compose messages, define delivery times, and automatically send emails to targeted recipients. The system provides real-time status tracking for sent, pending, and failed messages, ensuring transparency and reliability throughout the submission process. This project demonstrates practical experience with automation workflows, input validation, and API integration in a modern web application environment.

### Tech Stack

JavaScript (ES6+)
React (Node.js required)
Express.js (Node.js backend)

### GETTING STARTED

### 1. Clone the repository

```bash
git clone https://github.com/leolightwork/email-tracker.git
cd email-tracker
```

### 2. Setup Client (React)

```bash
cd client
npm install
npm run build
```

### 3. Setup Backend (Express)

```bash
cd ../server

#create virtual environment
py -3 -m venv .venv #windows
python3 -m venv .venv #mac/linux

#activate virtual environment (do this every time before launch)
.venv\Scripts\activate #windows
source .venv/bin/activate #mac/linux

pip install -r requirements.txt
flask --app .\main.py run --port=8080 #windows
flask --app ./main.py run --port=8080 #linux/mac
```

You can now open the app by navigating to http://127.0.0.1:8080 in your browser.

import os
from flask import Flask, flash, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename

import json
import datetime
import time
import schedule

import smtplib
from email.message import EmailMessage

import threading

app = Flask(__name__, static_folder = "../client/dist", static_url_path='/')

@app.route('/')
def home():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/upload', methods=['POST'])
def upload():
    emailContent = request.json
    print(emailContent)
    send_email(emailContent)
    return ''

@app.route('/getemails', methods=['GET'])
def download():
    return ''

def run_continuously(interval=1):
    cease_continuous_run = threading.Event()

    class ScheduleThread(threading.Thread):
        @classmethod
        def run(cls):
            while not cease_continuous_run.is_set():
                schedule.run_pending()
                time.sleep(interval)

    continuous_thread = ScheduleThread()
    continuous_thread.start()
    return cease_continuous_run

def send_email(_emailContent):
    global sender
    
    emailContent = _emailContent

    recipients = emailContent["recipients"]
    msg = EmailMessage()
    msg.set_content("hello")
    msg['Subject'] = "test email"
    msg['From'] = sender
    msg['To'] = recipients

    smtp_server.sendmail(sender, recipients, msg.as_string())
    print("Message sent!")


def test_job():
    print('hello from the schedular thread')

sender = "csc414group6@gmail.com"
password = "wstb cpkj pxir jyra"

smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
smtp_server.login(sender, password)

email_thread = run_continuously()
# schedule.every().second.do(test_job)
email_thread.set()



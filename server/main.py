import os
import json
import schedule
import time
import smtplib
import threading
from flask import Flask, flash, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
from flask import Flask, request, redirect, url_for, send_from_directory
from flask_cors import CORS
from datetime import datetime
from datetime import timedelta
from email.message import EmailMessage

app = Flask(__name__, static_folder = "../client/dist", static_url_path='/')
CORS(app, origins=["http://localhost:5173"])

@app.route('/')
def home():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/upload', methods=['POST'])
def upload():
    emailContent = request.json
    print(emailContent)
    schedule_email(emailContent)
    return ''

@app.route('/getemails', methods=['GET'])
def download():
    return emailObjs

@app.route('/delete', methods=['POST'])
def delete():
    incRequest = request.json['ids'][0]
    # print(request.json['ids'])
    for id in incRequest:
        # print(id)
        cancel_email(id)
    # cancel_email(incRequest['id'])
    # print(schedule.get_jobs())
    return('', 200)

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

def send_email(_emailId):
    global emailObjs
    global sender

    email_to_send = [email for email in emailObjs if email["id"] == _emailId]
    # print(email_to_send)
    sendDate = datetime.strptime(email_to_send[0]['date'], '%d/%m/%Y %H:%M')

    # print(datetime.now())
    # print(sendDate)
    if datetime.now() > sendDate:
        try:
            msg = EmailMessage()
            
            msg.set_content("""Hello, this is a reminder from The University of Southern Charesa administration requesting that you complete the ABET Accreditation Assessment Tracker.

The University of Southern Charesa is responsible for reporting course metrics for its Computer Science and Computer Engineering courses to attain/maintain its accreditation with the Accreditation Board for Engineering and Technology.
        
The ABET Accreditation Assessment Tracker is available at https://google.com""")
            msg['Subject'] = email_to_send[0]['class'] + " - ABET Submission"

            msg['From'] = sender
            msg['To'] = email_to_send[0]['recipients']

            smtp_server.sendmail(sender, msg['To'], msg.as_string())
            print("recurring email with id " + str(_emailId) + " has been sent")
            
            delta = timedelta(days=email_to_send[0]['repeat']) 
            sendDate = datetime.now() + delta

            email_to_send[0]['date'] = sendDate.strftime('%d/%m/%Y %H:%M')

            emailObjs = [
                email for email in emailObjs
                if email["id"] != _emailId
            ]
            
            emailObjs.append(email_to_send[0])

            with open(email_file, 'w') as data_out:
                json.dump(emailObjs, data_out)

        except Exception as e:
            print("error sending email id " + str (_emailId) + " with exception: ")
            print(e)

def send_email_once(_emailId):
    global emailObjs
    global sender

    email_to_send = [email for email in emailObjs if email["id"] == _emailId]
    # print(email_to_send)
    sendDate = datetime.strptime(email_to_send[0]['date'], '%d/%m/%Y %H:%M')

    # print(datetime.now())
    # print(sendDate)
    if datetime.now() > sendDate:
        try:
            msg = EmailMessage()
            
            msg.set_content("""Hello, this is a reminder from The University of Southern Charesa administration requesting that you complete the ABET Accreditation Assessment Tracker.

The University of Southern Charesa is responsible for reporting course metrics for its Computer Science and Computer Engineering courses to attain/maintain its accreditation with the Accreditation Board for Engineering and Technology.
        
The ABET Accreditation Assessment Tracker is available at https://google.com""")
            msg['Subject'] = email_to_send[0]['class'] + " - ABET Submission"

            msg['From'] = sender
            msg['To'] = email_to_send[0]['recipients']

            smtp_server.sendmail(sender, msg['To'], msg.as_string())
            print("one time email with id " + str(_emailId) + " has been sent")

            #remove our email from email dict and write to the file again
            emailObjs = [
                email for email in emailObjs
                if email["id"] != _emailId
            ]
            with open(email_file, 'w') as data_out:
                json.dump(emailObjs, data_out)

            return schedule.CancelJob
        except Exception as e:
            print("error sending email id " + str (_emailId) + " with exception: ")
            print(e)

def schedule_email(_emailContent):
    global email_file
    global emailObjs
    
    #get next email id
    idList = [email.get('id') for email in emailObjs]
    # print(idList)
    for i in range(1,10000):
        if i not in idList:
            emailId = i
            break
    
    _emailContent['id'] = emailId

    emailObjs.append(_emailContent)

    with open(email_file, 'w') as data_out:
        json.dump(emailObjs, data_out)
 
    if _emailContent['repeat'] == 0:
        schedule.every().second.do(send_email_once, _emailId=emailId).tag(str(emailId))
    else:
        schedule.every().second.do(send_email, _emailId=emailId).tag(str(emailId))
        
def schedule_email_from_file(_emailContent):
    global email_file
    global emailObjs
    
    emailId = _emailContent['id']
    if _emailContent['repeat'] == 0:
        schedule.every().second.do(send_email_once, _emailId=emailId).tag(str(emailId))
    else:
        schedule.every().second.do(send_email, _emailId=emailId).tag(str(emailId))

def cancel_email(_emailId):
    global emailObjs
    global email_file
    print(schedule.get_jobs(str(_emailId)))
    schedule.clear(str(_emailId))

    emailObjs = [
        email for email in emailObjs
        if email["id"] != _emailId
    ]
    with open(email_file, 'w') as data_out:
        json.dump(emailObjs, data_out)


def test_job():
    print('hello from the schedular thread')

emailObjs = []

email_file = "emails.json"
if os.path.isfile(email_file):
    with open(email_file, 'r') as data_in:
        emailObjs = json.load(data_in)

print(emailObjs)

for email in emailObjs:
    schedule_email_from_file(email)

sender = "csc414group6@gmail.com" #ignore this typo in the email address
password = "wstb cpkj pxir jyra"

smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
smtp_server.login(sender, password)

email_thread = threading.Thread(target = run_continuously)
email_thread.daemon = True
email_thread.start()
# schedule.every().second.do(test_job)

# email_thread.set()


# print(schedule.get_jobs())

import os
from flask import Flask, flash, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename

app = Flask(__name__, static_folder = "../client/dist", static_url_path='/')

@app.route('/')
def home():
    return send_from_directory(app.static_folder, "index.html")
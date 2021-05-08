from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from flask_mysqldb import MySQL
from flask import request
from werkzeug.utils import secure_filename
import datetime
import json
import random
import time
import sys
from flask import Flask, render_template, Response
from camera import VideoCamera
import webbrowser
import sys
import base64
import time
import cv2
from gaze_tracking import GazeTracking

app = Flask(__name__)
app.secret_key = 'your secret key'
app.config["DEBUG"] = True
app.config['MYSQL_HOST'] = 'remotemysql.com'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'i1Sf7ITP41'
app.config['MYSQL_PASSWORD'] = 'Jvio19ruVG'
app.config['MYSQL_DB'] = 'i1Sf7ITP41'
app.config['JSON_SORT_KEYS'] = False

CORS(app)
mysql = MySQL(app)

@app.route('/')
def index():
    return jsonify({"msg":"Welcome to Lecture and Exam Proctoring API!"})

# Login as a Student
@app.route('/login/student', methods=['POST'])
def login_student():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM user WHERE username = % s AND password = % s AND type = % s', (request.json['username'], request.json['password'], 1,))
    student=cursor.fetchone()

    if (student is None):
        return jsonify({"result":False,"msg":"Invalid Username or Password"})
    else:
        return jsonify({"result":True,"msg":"Successfully Logged In!","user":student})

# Login as a Teacher
@app.route('/login/teacher', methods=['POST'])
def login_teacher():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM user WHERE username = % s AND password = % s AND type = % s', (request.json['username'], request.json['password'], 2,))
    teacher=cursor.fetchone()

    if (student is None):
        return jsonify({"result":False,"msg":"Invalid Username or Password"})
    else:
        return jsonify({"result":True,"msg":"Successfully Logged In!","user":teacher})

# Get All Lectures
@app.route('/lectures', methods=['GET'])
def get_lectures():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM lecture')
    lectures=cursor.fetchall()

    return jsonify({"result":True, "lectures":lectures})

# Get a Lecture Given the ID of the Lecture
@app.route('/lecture/<int:lecture_id>', methods=['GET'])
def get_lecture(lecture_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM lecture WHERE id = % s', (lecture_id,))
    lecture=cursor.fetchone()

    if (lecture is not None):
        cursor.execute('SELECT * FROM question WHERE lecture = % s', (lecture['id'],))
        questions = cursor.fetchall()
        lecture['questions'] = questions

    return jsonify({"result":True, "lecture":lecture})

# Create a New Lecture
@app.route('/lecture', methods=['POST'])
def save_lecture():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('INSERT INTO lecture (name, teacher, start_time, end_time) VALUES (% s, % s, % s, % s)', (request.json['name'],request.json['teacher'],request.json['start_time'],request.json['end_time'],))
    mysql.connection.commit()

    # Iterate Questions
    questions = request.json['questions']
    for question in questions:
        cursor.execute('INSERT INTO question (question, answer1, answer2, answer3, correct) VALUES (% s, % s, % s, % s, % s)', (question['questionName'], question['answer1'], question['answer2'], question['answer3'], question['correct'],))
        mysql.connection.commit()

    return jsonify({"result":True,"msg":"Successfully Added Lecture"})

# Get All Students
@app.route('/students', methods=['GET'])
def get_students():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM user WHERE type = % s', (1,))
    students=cursor.fetchall()

    return jsonify({"result":True, "students":students})

# Get a Student Given the ID of the Student
@app.route('/student/<int:student_id>', methods=['GET'])
def get_student(student_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM user WHERE id = % s AND type = % s', (student_id, 1,))
    student=cursor.fetchall()

    return jsonify({"result":True, "student":student})

# Get All Teachers
@app.route('/teachers', methods=['GET'])
def get_teachers():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM user WHERE type = % s', (1,))
    teachers=cursor.fetchall()

    return jsonify({"result":True, "teachers":teachers})

# Get a Teacher Given the ID of the Teacher
@app.route('/teacher/<int:teacher_id>', methods=['GET'])
def get_teacher(teacher_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM user WHERE id = % s AND type = % s', (teacher_id, 2,))
    teacher=cursor.fetchall()

    return jsonify({"result":True, "teacher":teacher})

# Add a New User
@app.route('/user', methods=['POST'])
def add_user():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('INSERT INTO user (name, status, description, password, type) VALUES (% s, % s, % s, % s, % s)', (request.json['name'], request.json['status'], request.json['description'], request.json['password'], request.json['title'],))
    mysql.connection.commit()

    return jsonify({"result":True,"msg":"Successfully Created User!"})



@app.route('/predict', methods=['GET'])
@cross_origin(origin='*')
def predict_get():
    return jsonify({"left_pupil":456,"right_pupil":567})

@app.route('/predict', methods=['POST'])
@cross_origin(origin='*')
def predict_post():
    img = request.form['image']
    img_arr = img.split('data:image/jpeg;base64,')

    imgdata = base64.b64decode(img_arr[1])
    filename = 'some_image.jpg'  # I assume you have a way of picking unique filenames
    with open(filename, 'wb') as f:
        f.write(imgdata)

    result = check_gaze()
    
    return jsonify({"result":result,"left_pupil":456,"right_pupil":567})

def check_gaze():
    gaze = GazeTracking()
    
    while True:
        # We get a new frame from the webcam
        # _, frame = webcam.read()
        frame = cv2.imread('some_image.jpg')
    
        # We send this frame to GazeTracking to analyze it
        gaze.refresh(frame)
    
        frame = gaze.annotated_frame()
        text = ""
    
        if gaze.is_blinking():
            return "Blinking"
        elif gaze.is_right():
            return "Looking right,please look at the screen"
        elif gaze.is_left():
            return "Looking left,please look at the screen"
        elif gaze.is_center():
            return "Looking center"

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')



@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

def main():
    #sites=r"website.txt"
    #sites="http://0.0.0.0:5000/"
    #browser ="chrome"
    chrome_path=r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
    webbrowser.register("chrome",None,webbrowser.BackgroundBrowser(chrome_path))
    web = webbrowser.get("chrome")
    webbrowser.open_new_tab("http://localhost:5000/")
    '''with open(sites) as fobj:
        try:
            for num,url in enumerate(fobj):
                web.open_new_tab(url.strip())
                time.sleep(1)
        except Exception as e:
            print(e)'''

if __name__ == '__main__':
    app.debug = True
    app.run(host="127.0.0.1",port="8080")
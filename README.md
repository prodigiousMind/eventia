![image](https://github.com/prodigiousMind/eventia/assets/76691910/afa49548-badf-460c-87aa-24d76cb879fb)

An event scheduler written in Python3, Flask, REST APIs to manage events 

# How to download/install?
1. Download this repository or clone it using `git clone https://github.com/prodigiousMind/eventia.git`
2. Once downloaded/cloned (if downloaded, then unzip it using a suitable tool), then cd to the project directory `cd eventia`, download the required libraries using pip, if not installed
`pip/pip3 install flask flask_cors json` or `python/python3 -m pip install flask flask_cors json` or simply execute the command
`pip3 install -r requirement.txt`
3. Now, if you have a web server running such as Apache HTTP then move the folder (eventia) to the server directory, then execute `flask run` this will run the app.py
4. Access the index.py (note: this is accessed through HTTP server, not through the port number the flask app is running on). By making few changes we can also implement to let index.html run on the same port as flask app (through route establishment)
![image](https://github.com/prodigiousMind/eventia/assets/76691910/d5cdc3fa-373a-4ebd-9dbb-b781e8c23570)
![image](https://github.com/prodigiousMind/eventia/assets/76691910/bbfb5aa8-0c69-4450-b830-e3c101a34b0a)

# What we can do?
1. Add events (2 sample events are already added)

![image](https://github.com/prodigiousMind/eventia/assets/76691910/dfef11d4-48d4-4c5b-a7bb-a6df65fa2664)
![image](https://github.com/prodigiousMind/eventia/assets/76691910/ec3d45c3-46e6-4d88-b001-b7abd18f97e6)
![image](https://github.com/prodigiousMind/eventia/assets/76691910/41ee3672-b8bb-4389-8de2-fd813b2061f6)

3. Modify an existing event

![image](https://github.com/prodigiousMind/eventia/assets/76691910/bd09f977-86f5-4862-b5bb-f57995d0e071)
![image](https://github.com/prodigiousMind/eventia/assets/76691910/03fdae81-f20b-4d4b-974b-5dad7820afd5)
![image](https://github.com/prodigiousMind/eventia/assets/76691910/6e5e37fe-cb26-4786-b6c9-a7af144a490c)

4. Delete an event

![image](https://github.com/prodigiousMind/eventia/assets/76691910/5ae35691-b97e-4190-a50d-ad044e05ff49)
![image](https://github.com/prodigiousMind/eventia/assets/76691910/2b5d2004-95c8-4525-88e1-d0c7df9acdb7)

5. Search for event(s) with keyword(s) matching event title or event description

![image](https://github.com/prodigiousMind/eventia/assets/76691910/1a8c1572-380d-46f8-b7fe-f9d4c020c543)


Future Implementation:
1. Add support for events that recur daily, weekly, or monthly.
2. Notification through email
3. Desktop app version
4. etc



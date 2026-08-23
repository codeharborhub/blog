---
slug: face-recognition-attendance-system-python
title: Build a Face Recognition Attendance System Using Machine Learning from Scratch
authors: [ajay-dhangar]
tags: [python, machine-learning, opencv, computer-vision, tutorial]
image: /img/face-recognition-attendance-system-python.png
---

Automating roll calls and check-ins doesn't require expensive hardware. With Python, computer vision, and machine learning, you can build a highly accurate, real-time facial recognition attendance tracker using a basic computer webcam.

In this tutorial, we will set up and build a production-ready attendance logging pipeline from absolute scratch.

<!--truncate-->

![Face Recognition Attendance System in Python](/img/face-recognition-attendance-system-python.png)

:::note Prerequisite
This project is beginner-friendly, but you will need **Python 3.10 or 3.11** installed on your system. Using a virtual environment (like `venv` or Conda) is highly recommended to prevent dependency conflicts.
:::

### How the System Works
Instead of basic pixel matching, modern computer vision projects use deep convolutional neural networks to extract structural landmarks. Our setup follows a 4-step execution pipeline:
1. **Face Detection:** Scans live camera streams to isolate coordinates containing human faces using a Histogram of Oriented Gradients (HOG) framework.
2. **Facial Feature Vector Encoding:** Deep learning models translate face structures into a unique 128-dimensional mathematical vector (a digital facial fingerprint).
3. **Distance Matching Classifier:** Measures the Euclidean distance between the live camera vectors and your saved database records.
4. **Automated Logging:** Writes matching profiles along with instant timestamps straight into an un-duplicated `.csv` text spreadsheet.

---

### Step-by-Step Implementation Guide

#### Step 1: Install Visual Studio C++ Compiler (Windows Only)
The underlying machine learning library (`dlib`) compiles raw C++ files directly on your machine. 

:::danger Windows System Requirement
If you are on Windows, the `face-recognition` installation will **fail** without a C++ compiler. 
1. Download the free **[Visual Studio Community Edition](https://microsoft.com)**.
2. During installation, check the box for **"Desktop development with C++"**.
3. Finish installation and restart your system before moving to Step 2.
:::

#### Step 2: Establish the Project Structure
Create a root workspace folder on your machine titled `FaceAttendance` and organize your directories exactly like this:

```text
FaceAttendance/
│
├── main.py
├── attendance.csv
└── ReferenceImages/
    ├── elon_musk.jpg
    └── jeff_bezos.jpg
```

:::tip Image Database Optimization
Place **exactly one clear, front-facing photo** of each user inside the `ReferenceImages` directory. Name the image file exactly how you want their name to display in records, using underscores for spaces (e.g., `albert_einstein.jpg`). The script automatically converts underscores to spaces and capitalizes names!
:::

#### Step 3: Install Required Dependencies
Open your Command Prompt or Terminal, navigate to your root project workspace, and install the required core packages:

```bash
pip install opencv-python dlib face-recognition numpy
```

---

### The Complete Python Source Code

Create a file named `main.py` in your folder and drop in the complete tracking engine script:

```python
import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime

# --- CONFIGURATION & LOADING ---
IMAGE_PATH = 'ReferenceImages'
known_encodings = []
known_names = []

print("⚡ Step 1: Scanning reference database profiles...")
if not os.path.exists(IMAGE_PATH):
    print(f"❌ Error: '{IMAGE_PATH}' directory could not be located.")
    exit()

image_files = os.listdir(IMAGE_PATH)

for file_name in image_files:
    if file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
        img = cv2.imread(f'{IMAGE_PATH}/{file_name}')
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Calculate 128-dimensional facial vectors
        encodings = face_recognition.face_encodings(rgb_img)
        
        if len(encodings) > 0:
            known_encodings.append(encodings[0])
            clean_name = os.path.splitext(file_name)[0].replace('_', ' ').title()
            known_names.append(clean_name)
            print(f"✅ Registered profile: {clean_name}")
        else:
            print(f"⚠️ Warning: No clear face detected in {file_name}. Skipping.")

print("🚀 Core profiles loaded! Launching hardware camera feed...")

# --- RECORD KEEPING ENGINE ---
def record_attendance(name):
    file_name = 'attendance.csv'
    
    if not os.path.exists(file_name):
        with open(file_name, 'w') as f:
            f.write('Name,Timestamp\n')
            
    with open(file_name, 'r') as f:
        lines = f.readlines()
        logged_names = [line.split(',')[0] for line in lines]
        
    if name not in logged_names:
        with open(file_name, 'a') as f:
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            f.write(f'{name},{timestamp}\n')
            print(f"✨ Attendance logged securely for: {name}")

# --- CAMERA FRAME INTERCEPT PIPELINE ---
camera = cv2.VideoCapture(0)

while True:
    success, frame = camera.read()
    if not success:
        break
        
    # Compress frame scale down to 1/4 layout for optimized processing speeds
    small_frame = cv2.resize(frame, (0, 0), None, 0.25, 0.25)
    rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)
    
    faces_in_frame = face_recognition.face_locations(rgb_small_frame)
    encodings_in_frame = face_recognition.face_encodings(rgb_small_frame, faces_in_frame)
    
    for face_encode, face_loc in zip(encodings_in_frame, faces_in_frame):
        matches = face_recognition.compare_faces(known_encodings, face_encode)
        face_distances = face_recognition.face_distance(known_encodings, face_encode)
        
        name = "Unknown"
        if len(face_distances) > 0:
            best_match_idx = np.argmin(face_distances)
            # Strict tolerance index threshold value lower than 0.50 yields optimal precision
            if matches[best_match_idx] and face_distances[best_match_idx] < 0.50:
                name = known_names[best_match_idx]
                record_attendance(name)
                
        # Scale face detection vector overlay mapping up to standard canvas layout size
        top, right, bottom, left = face_loc
        top, right, bottom, left = top * 4, right * 4, bottom * 4, left * 4
        
        box_color = (0, 255, 0) if name != "Unknown" else (0, 0, 255)
        
        # Render visual overlay feedback shapes onto the interface
        cv2.rectangle(frame, (left, top), (right, bottom), box_color, 2)
        cv2.rectangle(frame, (left, bottom - 30), (right, bottom), box_color, cv2.FILLED)
        cv2.putText(frame, name, (left + 6, bottom - 6), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        
    cv2.imshow('CodeharborHub Attendance Monitor Terminal', frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

camera.release()
cv2.destroyAllWindows()
```

---

### Running the Tracker
Execute the program from your terminal:
```bash
python main.py
```
A desktop tracking window will pop up. Stand directly in front of your camera. The model will instantly frame your profile with a **Green Tag Box** containing your name and create an entry inside your `attendance.csv` file.

:::info Graceful Exit
To shut down operations safely without causing file stream corruptions, click on the video feed window and press the **`q`** key on your keyboard.
:::

---

### Advanced Next Steps for CodeharborHub Users
To scale this baseline project up for hackathons or portfolio milestones, try adding these enhancements:
* **Anti-Spoofing Filters:** Implement texture validation or blink tracking algorithms so users can't use static printed photos to cheat the scanner.
* **SQL/Database Integrations:** Swap out flat local `.csv` files for high-velocity database systems like **SQLite** or **MongoDB** to handle concurrent lookups cleanly.
* **Web-Based Dashboard:** Use **Flask** or **FastAPI** to feed the live canvas stream directly to a responsive frontend web UI panel.

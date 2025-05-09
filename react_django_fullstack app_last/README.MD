create and activate 
    python3 -m venv venv
    venv/Scripts/activate

install all requirements
    pip install -r requirements.txt

django-admin startproject backend
cd backend
python manage.py startapp api

---
add api and rest_framework to installed apps

create models.py, urls and serializers.py
cd ..

---



<!-- ????????????????????????    frontend create   ????????????????????????????? -->
npm create vite@latest frontend -- --template react
 cd frontend
  npm install
  npm run dev
npm install axios
npm install react-router-dom
npm install jwt-decode



add:
"proxy": "http://localhost:8000",
to package.json
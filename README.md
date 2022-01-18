# Loan-Application-App
Loan application app built with React and Fast API

## Steps to run this application
clone this repository into a desired location on your computer
cd into the application directory.

### Running with Docker
You will need to have Docker installed on your computer

Run the command below

docker-compose up -d

### Run without Docker
#### Ensure you have python3.6+ and node installed on your computer

cd into the backend folder

#### create a virtual environment with

python -m venv env

#### install the dependencies with
pip install -r requirements.txt

#### start the uvicorn server
uvicorn client.main:app

cd into the frontend folder

#### install the dependencies with
npm install

####
run the application server with
npm start


This should start both the frontend and the backend applications.

The default port for the frontend application is 3000 and 8000 for the backend.

Now, the backend application should be running on port 8000 and the frontend on port 3000

Go to http://localhost:3000 on your browser to access the web interface.

or

Go to http://localhost:8000/docs or http://localhost:8000/redoc on your browser to access the documentation for the backend.



# timesheets

Set up instructions:
Front end:
npm start

Back end:
Create virtual environment
Download requirements.txt

Command to start FastAPI Server:
uvicorn routers:router --reload






# Timely 

## Description
Timely is a web application that allows you to create and store timesheets for your organization. It also allows you to access timesheet summary data for each project's your team is working on.

## Installation and Setup

#NOTE:
This app was created on MacOS.

#Back End:
1. To set up the project on your machine, fork the repo and clone it.
2. Navigate to the `fastapi-server` directory
3. Create a virtual environment: `python -m venv .venv`
4. Now, activate the virtual environment:
```
#macOs:
source .venv/bin/activate

#windows:
./.venv/Scripts/Activate.ps1 
```
4. Update pip `python -m pip install --upgrade pip`
5. Install all the dependencies in the requirements.txt file `pip install -r requirements.txt`
6. Create a new requirements.txt file from the installed pip packages `pip freeze > requirements.txt`

#Front End:
7. Navigate to the `client` directory
8. Run the command `npm start`
9. This will allow you to access the application through your browser at http://localhost:3000. 

* ### Need help?
The back end is set up to run on localhost:8000, while the front end is set to localhost:3000. If you would like to use different ports, you may have to change the CORS settings (found in `fastapi-server -> routers.py`) or the API fetch calls (found in `client -> src -> Table.jsx` AND `client -> src -> TimesheetForm.jsx`).


## Future
Below are some features to improve the application in the future:
* Support update and delete functionality for each timesheet.
* Allow user to retrieve a list of all timesheets, as opposed to an aggregate of timesheets based on project name.

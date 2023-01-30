# Timely 

## Description
Timely is a web application that allows you to create and store timesheets for your organization. It also provides access to timesheet summary data for each project your team is working on.


## Installation and Setup

### NOTE:
This app was created on MacOS.


### Back End:
1. To set up the project on your machine, fork the repo and clone it.
2. Navigate to the `fastapi-server` directory.
3. Create a virtual environment: `python -m venv .venv`.
4. Now, activate the virtual environment:
```
#macOs:
source .venv/bin/activate

#windows:
./.venv/Scripts/Activate.ps1 
```
4. Update pip `python -m pip install --upgrade pip`.
5. Install all the dependencies in the requirements.txt file `pip install -r requirements.txt`.
6. Create a new requirements.txt file from the installed pip packages `pip freeze > requirements.txt`.
7. While within the `fastapi-server` and with the virtual environment activated, run the command `uvicorn routers:router --reload` to start the FastAPI server. It should run on http://localhost:8000. 


### Front End:
8. Navigate to the `client` directory.
9. Run the command `npm start`.
10. This will allow you to access the application through your browser at http://localhost:3000.
11. You can now mess around with the app by creating timesheets and checking out how the table changes with each new timesheet.

### Need help?
* The back end is set up to run on localhost:8000, while the front end is set to localhost:3000. If you would like to use different ports, you may have to change the CORS settings (found in `fastapi-server -> routers.py`) or the API fetch calls (found in `client -> src -> Table.jsx` AND `client -> src -> TimesheetForm.jsx`).
* If for some reason the table doesn't automatically populate with each project's information upon first accessing the webpage:
1. Make sure the `timesheet-data.csv` file is located in the project's root directory.
2. Delete the `timesheets.db` file under the `fastapi-server directory`.
3. Now if you access the webpage, the table should appear.


## Future
Below are some features to improve the application in the future:
* Support update and delete functionality for each timesheet.
* Allow user to retrieve a list of all timesheets, as opposed to an aggregate of timesheets based on project name.

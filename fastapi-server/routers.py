from fastapi import FastAPI, Depends
from typing import List
from queries import TimesheetIn, TimesheetOut, TimesheetRepo
from db_setup import run_initial_setup

router = FastAPI()

@router.get("/api/timesheets", response_model=List[TimesheetOut])
def get_all_timesheets(repo: TimesheetRepo = Depends()):
    run_initial_setup() #sets up the database first time app is used
    return repo.get_all()

@router.post("/api/timesheets")
def create(timesheet: TimesheetIn, repo: TimesheetRepo= Depends()) -> TimesheetOut:
    return repo.create(timesheet)
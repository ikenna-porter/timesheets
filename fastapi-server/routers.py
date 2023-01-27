from fastapi import APIRouter, Depends
from typing import List
from queries import TimesheetIn, TimesheetOut, TimesheetRepo

router = APIRouter() #a mini FastAPI() class - same functionality

@router.get("/api/timesheets", response_model=List[TimesheetOut])
def get_all_timesheets(repo: TimesheetRepo = Depends()):
    return repo.get_all()


@router.post("/api/timesheets")
def create(message: TimesheetIn, repo: TimesheetRepo= Depends()) -> TimesheetOut:
    return repo.create(message)
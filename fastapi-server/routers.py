from fastapi import FastAPI, Depends
from typing import List
from queries import TimesheetIn, TimesheetOut, TimesheetRepo
from db_setup import run_initial_setup
from fastapi.middleware.cors import CORSMiddleware

router = FastAPI()

#CORS Settings:
origins = ["*"]
router.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@router.get("/api/timesheets", response_model=List[TimesheetOut])
def get_all_timesheets(repo: TimesheetRepo = Depends()):
    run_initial_setup() #sets up the database first time app is used
    return repo.get_all()

@router.post("/api/timesheets")
def create(timesheet: TimesheetIn, repo: TimesheetRepo= Depends()) -> TimesheetOut:
    return repo.create(timesheet)
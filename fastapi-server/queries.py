import sqlite3
from pydantic import BaseModel
from contextlib import closing
from typing import List


class TimesheetOut(BaseModel):
    date: str
    client: str
    project: str
    project_code: str
    hours: float
    billable: str
    first_name: str
    last_name: str
    billable_rate: float


class TimesheetIn(BaseModel):
    date: str
    client: str
    project: str
    project_code: str
    hours: float
    billable: str
    first_name: str
    last_name: str
    billable_rate: float


class TimesheetRepo:
    def get_all(self) -> List[TimesheetOut]:
        with sqlite3.connect("timesheets.db") as conn:
            with closing(conn.cursor()) as db:
                db.execute(
                    """
                        SELECT 
                          date
                        , client
                        , project
                        , project_code
                        , hours
                        , billable
                        , first_name
                        , last_name
                        , billable_rate
                        FROM timesheets
                        """
                )

                result = [
                    TimesheetOut(
                        date=record[0],
                        client=record[1],
                        project=record[2],
                        project_code=record[3],
                        hours=record[4],
                        billable=record[5],
                        first_name=record[6],
                        last_name=record[7],
                        billable_rate=record[8]
                    )
                    for record in db
                ]
                return result
    
    def create(self, timesheet: TimesheetIn) -> TimesheetOut:
        with sqlite3.connect("timesheets.db") as conn:
            with closing(conn.cursor()) as db:
                db.execute(
                    """
                INSERT INTO timesheets (
                    date
                    , client
                    , project
                    , project_code
                    , hours
                    , billable
                    , first_name
                    , last_name
                    , billable_rate 
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) 
                RETURNING project;

                """,
                    [
                        timesheet.date,
                        timesheet.client,
                        timesheet.project,
                        timesheet.project_code,
                        timesheet.hours,
                        timesheet.billable,
                        timesheet.first_name,
                        timesheet.last_name,
                        timesheet.billable_rate
                        ],
                )
                old_data = timesheet.dict()

                return TimesheetOut(**old_data)
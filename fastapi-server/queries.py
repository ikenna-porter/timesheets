from pydantic import BaseModel, Field
from uuid import UUID
from typing import List


class TimesheetOut(BaseModel):
    id: UUID
    name: str = Field(min_length=1)
    client: str = Field(min_length=1)
    hours: int = Field(gt=0)
    billable_hours: int
    billable_amount: int


class TimesheetIn(BaseModel):
    name: str
    client: str
    hours: int
    billable_hours: int
    billable_amount: int


class TimesheetRepo:
    def get_all(self) -> List[TimesheetOut]:
        pass
    
    def create(self, timesheet: TimesheetIn) -> TimesheetOut:
        pass
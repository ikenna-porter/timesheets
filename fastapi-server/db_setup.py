import sqlite3
import csv
import uuid


def convert_csv_file():
    with open("../timesheet-data.csv", "r") as csvfile:
        #creates csv.reader() object for db storage
        return list(csv.reader(csvfile, delimiter=","))

def does_timesheets_table_exist():
    """Checks if timesheets table exists. Will return a 0 if it does not and a 1 if it does."""
    conn = sqlite3.connect("timesheets.db")
    c = conn.cursor()
    is_table_real = c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='timesheets'")
    return len(is_table_real.fetchall())

def create_timesheets_table():
    """Creates a table to store timesheet data."""
    conn = sqlite3.connect("timesheets.db")
    c = conn.cursor()
    c.execute("""
        CREATE TABLE timesheets (
            date text,
            client text,
            project text,
            project_code text,
            hours float,
            billable text,
            first_name text,
            last_name text,
            billable_rate float
        )""")
    conn.commit()
    conn.close()

def populate_timesheet_table(timesheet_data):
    """Adds data from csv file into timesheets table."""
    conn = sqlite3.connect("timesheets.db")
    c = conn.cursor()
    # id = 1
    for i in range(2, len(timesheet_data)):
        with conn:
            c.execute("""
            INSERT INTO timesheets VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""", 
            (# (int(uuid.uuid1()),
             timesheet_data[i][0],
             timesheet_data[i][1],
             timesheet_data[i][2],
             timesheet_data[i][3],
             timesheet_data[i][4],
             timesheet_data[i][5],
             timesheet_data[i][6],
             timesheet_data[i][7],
             timesheet_data[i][8]))
        
        # id += 1

def run_initial_setup():
    if does_timesheets_table_exist() == 0: #if timesheets tables doesn't exist 
        create_timesheets_table() 
        csv_file = convert_csv_file()
        populate_timesheet_table(csv_file) #fill table with data
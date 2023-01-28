import db_setup as setup

def main():
    if setup.does_timesheets_table_exist() == 0: #if timesheets tables doesn't exist 
        setup.create_timesheets_table() 
        csv_file = setup.convert_csv_file()
        setup.populate_timesheet_table(csv_file) #fill table with data




if __name__ == "__main__":
    main()
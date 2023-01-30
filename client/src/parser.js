
export const parseTimesheets = (unfilteredTimesheets) => {
    const filteredTimesheets = [];
    
    unfilteredTimesheets.filter((oldTimesheet) => {
        const newTimesheet = {};

        newTimesheet.client = oldTimesheet.client;
        newTimesheet.project = oldTimesheet.project;
        newTimesheet.hours = oldTimesheet.hours;
        newTimesheet.billableHours = calculateBillableHours(oldTimesheet);
        newTimesheet.billableAmount = newTimesheet.billableHours * oldTimesheet.billable_rate;

        filteredTimesheets.push(newTimesheet);
    });
    
    return objToArr(reduceTimesheets(filteredTimesheets));
}

const calculateBillableHours = (timesheet) => {
    let billableHours;
    if (timesheet.billable == "no") billableHours = 0;
    else billableHours = timesheet.hours;
    return billableHours;
}

const reduceTimesheets = (timesheets) => {
    return timesheets.reduce( (accumulator, timesheet) => {
        
        const projectName = timesheet["project"];
        if (projectName in accumulator) {
            accumulator[projectName].billableAmount += timesheet.billableAmount;
            accumulator[projectName].billableHours += timesheet.billableHours;
            accumulator[projectName].hours += timesheet.hours;
            accumulator[projectName].client = timesheet.client;
        } else {
            const newProject = {};
            newProject["billableAmount"] = timesheet.billableAmount;
            newProject["billableHours"] = timesheet.billableHours;
            newProject["hours"] = timesheet.hours;
            newProject["client"] = timesheet.client;

            accumulator[projectName] = newProject;
        }
        return accumulator;
    }, {});
}

const objToArr = (obj) => {
    const result = [];
    for (let key in obj) {
        obj[key]["project"] = key;
        result.push(obj[key]);
    }
    return result;
}
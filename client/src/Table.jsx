import {useState, useEffect} from "react";
import Row from "./Row";
import {parseTimesheets} from "./parser"

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

function Table(props) {
    const [timesheets, setTimesheets] = useState([]);

    useEffect(() => {

        const fetchAndParseTimesheets = async () => {
            const response = await fetch("http://localhost:8000/api/timesheets");
            
            let unfilteredTimesheets;
            if (response.ok) {
                unfilteredTimesheets = await response.json();
            }
            
            const data = parseTimesheets(unfilteredTimesheets);
            setTimesheets(data)

            //Updates total billable amount and total hours tracked
            props.setTotalHoursTracked(data.reduce((acc, sheet) => acc + sheet.hours, 0).toFixed(2));
            props.setTotalBillableAmount(formatter.format(data.reduce((acc, sheet) => acc + sheet.billableAmount, 0)));
        }

        fetchAndParseTimesheets();
    }, []);

    return(
        <table>
            <thead>
                <tr>
                    <th className="first-header">Name</th>
                    <th>Clients</th>
                    <th>Hours</th>
                    <th colSpan="2">Billable Hours</th>
                    <th>Billable Amount</th>
                </tr>
            </thead>
            <tbody>
                {timesheets.map(timesheet => {
                    return (
                    <Row timesheet={timesheet} key={timesheet.project}/>
                    )
                })}
            </tbody>
      </table>
    )
}

export default Table;
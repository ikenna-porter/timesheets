import {useState, useEffect} from "react";
import Row from "./Row";
import {parseTimesheets} from "./parser"

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
        }

        fetchAndParseTimesheets();
    }, []);

    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
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
import {useState, useEffect} from "react";
import Row from "./Row";
import {parseTimesheets} from "./parser";

// Formatter for US dollar
const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

// Function to add a comma to indicate the thousandth's place in a number
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
            setTimesheets(data);

            //Updates total hours tracked and adds a comma to total for thousand's place
            props.setTotalHoursTracked(
                numberWithCommas(
                    data.reduce((acc, sheet) => acc + sheet.hours, 0).toFixed(2)
                )
            );
            //Updates total billable amount
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
import {useState} from "react";


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

function Row(props) {
    const [timesheet, setTimesheet] = useState(props.timesheet)

    return(
        <tr>
            <td>{timesheet.project}</td>
            <td>{timesheet.client}</td>
            <td>{timesheet.hours.toFixed(2)}</td>
            <td>{timesheet.billableHours.toFixed(2)}</td>
            <td>{timesheet.billableHours/timesheet.hours ? `(${(timesheet.billableHours/timesheet.hours * 100).toFixed(0)}%)` : "(0%)"}</td>
            <td>{timesheet.billableAmount ? formatter.format(timesheet.billableAmount) : "--"}</td>
        </tr>
    )
}

export default Row;
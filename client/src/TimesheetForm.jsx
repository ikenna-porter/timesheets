import {useState, useEffect} from "react";

function TimesheetForm(props) {
    const [date, setDate] = useState("");
    const [client, setClient] = useState("");
    const [project, setProject] = useState("");
    const [projectCode, setProjectCode] = useState("");
    const [hours, setHours] = useState("");
    const [billable, setBillable] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [billableRate, setBillableRate] = useState("");

    const handleSubmission = async e => {

        const data = {
            "date": date,
            "client": client,
            "project": project,
            "project_code": projectCode,
            "hours": hours,
            "billable": billable,
            "first_name": firstName,
            "last_name": lastName,
            "billable_rate": (billable === "yes" ? billableRate : 0),
        }

        const url = "http://localhost:8000/api/timesheets";
        const fetchConfig = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        
        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            console.log('Successfully Posted');
        }
    }

    return (
        <form action="" onSubmit={handleSubmission}>
            <div className="inputContainer">
                <label htmlFor="date">Date: </label>
                <input onChange={e => setDate(e.target.value)} required="required" id="date" name="date" type="date" pattern="\d{2}-\d{2}-\d{2}"/>
            </div>
            <div className="inputContainer">
                <label htmlFor="client">Client: </label>
                <input onChange={e => setClient(e.target.value)} required="required" id="client" name="client" type="text" />
            </div>
            <div className="inputContainer">
                <label htmlFor="project">Project: </label>
                <input onChange={e => setProject(e.target.value)} required="required" id="project" name="project" type="text"/>
            </div>
            <div className="inputContainer">
                <label htmlFor="project-code">Project Code: </label>
                <input onChange={e => setProjectCode(e.target.value)} required="required" id="project-code" name="project-code" type="text"/>
            </div>
            <div className="inputContainer">
                <label htmlFor="hours">Hours: </label>
                <input onChange={e => setHours(e.target.value)} required="required" id="hours" name="hours" type="number" step="0.01" min="0" />
            </div>
            <div className="inputContainer">
                <label htmlFor="billable">Billable: </label>
                <select onChange={e => setBillable(e.target.value)} required="required" id="billable" name="billable">
                    <option value="" hidden></option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div className="inputContainer">
                <label htmlFor="first-name">First Name: </label>
                <input onChange={e => setFirstName(e.target.value)} type="text" required="required" id="first-name" name="first-name"/>
            </div>
            <div className="inputContainer">
                <label htmlFor="last-name">Last Name: </label>
                <input onChange={e => setLastName(e.target.value)} type="text" required="required" id="last-name" name="last-name"/>
            </div>
            <div className="inputContainer">
                <label htmlFor="billable-rate">Billable Rate: </label>
                <input
                    onChange={e => setBillableRate(e.target.value)}
                    required="required" name="billable-rate" id="billable-rate" type="number" defaultValue="0"
                    step="0.01" min="0" disabled={billable === "no" ? true : false}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default TimesheetForm;
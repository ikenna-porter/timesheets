import {useState, useEffect} from "react";

function TimesheetForm(props) {
    const [date, setDate] = useState("")
    const [client, setClient] = useState("") 
    const [project, setProject] = useState("") 
    const [projectCode, setProjectCode] = useState("") 
    const [hours, setHours] = useState("") 
    const [billable, setBillable] = useState("") 
    const [firstName, setFirstName] = useState("") 
    const [lastName, setLastName] = useState("") 
    const [billableRate, setBillableRate] = useState("") 

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
            "billable_rate": billableRate,
        }
        console.log(data);

        const url = "http://localhost:8000/api/timesheets"
        const fetchConfig = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        
        const response = await fetch(url, fetchConfig)

        if (response.ok) {
            console.log('Successfully Posted')
            this.setState({
                "date": "",
                "client": "",
                "project": "",
                "project_code": "",
                "hours": "",
                "billable": "",
                "first_name": "",
                "last_name": "",
                "billable_rate": "",
            })
        }
    }

    return (
        <form action="" onSubmit={handleSubmission}>
            <input onChange={e => setDate(e.target.value)} required="required" name="date" type="date"/>
            <input onChange={e => setClient(e.target.value)} required="required" name="client" type="text" placeholder="Client" />
            <input onChange={e => setProject(e.target.value)} required="required" name="project" type="text" placeholder="Project"/>
            <input onChange={e => setProjectCode(e.target.value)} required="required" name="project-code" type="text" placeholder="Project Code"/>
            <input onChange={e => setHours(e.target.value)} required="required" name="hours" type="number" placeholder="Hours" step="0.01" min="0" />
            <select onChange={e => setBillable(e.target.value)} required="required" name="billable" id="billable">
                <option value="" disabled selected>Billable</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <input onChange={e => setFirstName(e.target.value)} type="text" required="required" name="first-name" placeholder="First Name"/>
            <input onChange={e => setLastName(e.target.value)} type="text" required="required" name="last-name" placeholder="Last Name"/>
            <input onChange={e => setBillableRate(e.target.value)} required="required" name="billable-rate" type="number" placeholder="Billable Rate" step="0.01" min="0" />

            {/* <div>
                <input type="text" list="cars" />
                <datalist id="cars">
                    <option>Volvo</option>
                    <option>Saab</option>
                    <option>Mercedes</option>
                    <option>Audi</option>
                </datalist>
            </div> */}

            <button type="submit">Submit</button>
        </form>
    )
}

export default TimesheetForm;
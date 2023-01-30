import { useState, useEffect } from 'react';
import Table from "./Table"
import TimesheetForm from "./TimesheetForm"
import "./App.css";

function App(props) {
  const [totalBillableAmount, setTotalBillableAmount] = useState(0);
  const [totalHoursTracked, setTotalHoursTracked] = useState(0);

  return (
    <div className="App">
      <div className="data">
        <div className="totals">
          <div>
            <p>Hours Tracked</p>
            <strong>
              <div>{totalHoursTracked}</div>
            </strong>
          </div>
          <div>
            <p>Billable Amount</p>
            <strong>
              <div>{totalBillableAmount}</div>
            </strong>
          </div>
        </div>
        <Table
          setTotalBillableAmount={setTotalBillableAmount}
          setTotalHoursTracked={setTotalHoursTracked} 
        />
      </div>
      <div className="form">
        <h2>Create a Timesheet</h2>
        <TimesheetForm/>
      </div>
    </div>
  );
}

export default App;

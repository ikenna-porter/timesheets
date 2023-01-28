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
            <h4>Hours Tracked</h4>
            <strong>
              <div>INPUT HOURS LATER</div>
            </strong>
          </div>
          <div>
            <h4>Billable Amount</h4>
            <strong>
              <div>INPUT AMOUNT LATER</div>
            </strong>
          </div>
        </div>
        <Table></Table>
      </div>
      <div className="form">
        <TimesheetForm/>
      </div>
    </div>
  );
}

export default App;

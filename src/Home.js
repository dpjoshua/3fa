import React, { useState, useEffect } from 'react';
import startFirebase from './config/firedb';
import { set, ref, get, child, push, onValue } from 'firebase/database';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userData } from './state';
import ChangePassword from "./ChangePassword.js"
import { Link } from "react-router-dom";





function Home() {
  const [recordDate, setRecordDate] = useState('');
  const [beforeTime, setBeforeTime] = useState('');
  const [beforeLevel, setBeforeLevel] = useState('');
  const [breakfastTime, setBreakfastTime] = useState('');
  const [breakfastLevel, setBreakfastLevel] = useState('');
  const [lunchTime, setLunchTime] = useState('');
  const [lunchLevel, setLunchLevel] = useState('');
  const [dinnerTime, setDinnerTime] = useState('');
  const [dinnerLevel, setDinnerLevel] = useState('');
  const [afterTime, setAfterTime] = useState('');
  const [afterLevel, setAfterLevel] = useState('');

  function handleDateChange(e) {
    setRecordDate(e.target.value);
  }

  function handleBTimeChange(e) {
    setBeforeTime(e.target.value);
  }

  function handleBLevelChange(e) {
    setBeforeLevel(e.target.value);
  }
  function handleBreakfastTimeChange(e) {
    setBreakfastTime(e.target.value);
  }
  function handleBreakfastLevelChange(e) {
    setBreakfastLevel(e.target.value);
  }

  function handleLunchTimeChange(e) {
    setLunchTime(e.target.value);
  }

  function handleLunchLevelChange(e) {
    setLunchLevel(e.target.value);
  }

  function handleDinnerTimeChange(e) {
    setDinnerTime(e.target.value);
  }

  function handleDinnerLevelChange(e) {
    setDinnerLevel(e.target.value);
  }

  function handleAfterTimeChange(e) {
    setAfterTime(e.target.value);
  }

  function handleAfterLevelChange(e) {
    setAfterLevel(e.target.value);
  }

  const [db, setDb] = useState(null);
  const [data, setData] = useState([]);


  // get the latest udpated userData
  const userVal = useRecoilValue(userData);
  console.log('testing =====>>>', userVal)
  const converted_user = JSON.stringify(userVal);





  useEffect(() => {
    setDb(startFirebase());
  }, []);

  const sendData = () => {
    if (!db) {
      console.error('Database reference is null');
      return;
    }

    const data = {
      db_username: userVal,
      recordDate: recordDate,
      beforeTime: beforeTime,
      beforeLevel: beforeLevel,
      breakfastTime: breakfastTime,
      breakfastLevel: breakfastLevel,
      lunchTime: lunchTime,
      lunchLevel: lunchLevel,
      dinnerTime: dinnerTime,
      dinnerLevel: dinnerLevel,
      afterTime: afterTime,
      afterLevel: afterLevel,
    };

    const dbref = ref(db, `Diabetic/${converted_user}`);

    push(dbref, data)
      .then(() => {
        console.log('Data added successfully');
        alert("Data added successfully");
        // Reset form values
        setRecordDate('');
        setBeforeTime('');
        setBeforeLevel('');
        setBreakfastTime('');
        setBreakfastLevel('');
        setLunchTime('');
        setLunchLevel('');
        setDinnerTime('');
        setDinnerLevel('');
        setAfterTime('');
        setAfterLevel('');
      })
      .catch((error) => {
        console.error('Error adding data: ', error);
        alert('Error adding data. Please try again later.');
      });
  };


  const getData = () => {
    if (!db) {
      console.error('Database reference is null');
      return;
    }

    const dbref = ref(db, `Diabetic/${converted_user}`);

    onValue(dbref, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('Data received:', data);
        alert("Data Recieved", data);
        // do something with the data...
        setData(Object.values(data));

      } else {
        console.log('No data found');
      }
    }, (error) => {
      console.error('Error getting data:', error);
    });
  };


  return (
    <div className="bc">
      <h1>Welcome </h1>
      <div>
        <div>Username {userVal.default?.name}</div>
      </div>
      <div>
        <div>Date</div>
        <input
          name="record_date"
          placeholder="Enter Date.."
          type="date"
          value={recordDate}
          onChange={handleDateChange}
        />
      </div>
      <div>
        <div>Enter Time and Blood sugar level fasting/before breakfast</div>
        <input
          name="before_time"
          placeholder="Enter Time.."
          type="time"
          value={beforeTime}
          onChange={handleBTimeChange}
        />
        <input
          name="before_level"
          placeholder="Enter Level.."
          type="text"
          value={beforeLevel}
          onChange={handleBLevelChange}
        />
      </div>
      <div>
        <div>Enter Time and What you ate for breakfast</div>
        <input
          name="breakfast_time"
          placeholder="Enter Time.."
          type="time"
          value={breakfastTime}
          onChange={handleBreakfastTimeChange}
        />
        <input
          name="breakfast_level"
          placeholder="Enter Level.."
          type="text"
          value={breakfastLevel}
          onChange={handleBreakfastLevelChange}
        />
      </div><div>
        <div>Enter Time and What you ate for lunch</div>
        <input
          name="lunch_time"
          placeholder="Enter Time.."
          type="time"
          value={lunchTime}
          onChange={handleLunchTimeChange}
        />
        <input
          name="lunch_level"
          placeholder="Enter Level.."
          type="text"
          value={lunchLevel}
          onChange={handleLunchLevelChange}
        />
      </div><div>
        <div>Enter Time and What you ate for dinner</div>
        <input
          name="dinner_time"
          placeholder="Enter Time.."
          type="time"
          value={dinnerTime}
          onChange={handleDinnerTimeChange}
        />
        <input
          name="dinner_level"
          placeholder="Enter Level.."
          type="text"
          value={dinnerLevel}
          onChange={handleDinnerLevelChange}
        />
      </div><div>
        <div>Enter Time and Blood sugar level after 2 hours of eating dinner</div>
        <input
          name="after_time"
          placeholder="Enter Time.."
          type="time"
          value={afterTime}
          onChange={handleAfterTimeChange}
        />
        <input
          name="after_level"
          placeholder="Enter Level.."
          type="text"
          value={afterLevel}
          onChange={handleAfterLevelChange}
        />
      </div>
      <button onClick={sendData}>Add Data</button>
      <button onClick={getData}>Get Data</button>
      <div>
        <li>
          <Link to="/ChangePassword">Change Password</Link>
        </li>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Record Date</TableCell>
                <TableCell>Before Time</TableCell>
                <TableCell>Before Level</TableCell>
                <TableCell>Breakfast Time</TableCell>
                <TableCell>Breakfast Level</TableCell>
                <TableCell>Lunch Time</TableCell>
                <TableCell>Lunch Level</TableCell>
                <TableCell>Dinner Time</TableCell>
                <TableCell>Dinner Level</TableCell>
                <TableCell>After Time</TableCell>
                <TableCell>After Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((record) => (
                <TableRow key={record.recordDate}>
                  <TableCell>{record.recordDate}</TableCell>
                  <TableCell>{record.beforeTime}</TableCell>
                  <TableCell>{record.beforeLevel}</TableCell>
                  <TableCell>{record.breakfastTime}</TableCell>
                  <TableCell>{record.breakfastLevel}</TableCell>
                  <TableCell>{record.lunchTime}</TableCell>
                  <TableCell>{record.lunchLevel}</TableCell>
                  <TableCell>{record.dinnerTime}</TableCell>
                  <TableCell>{record.dinnerLevel}</TableCell>
                  <TableCell>{record.afterTime}</TableCell>
                  <TableCell>{record.afterLevel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>


    </div>


  )
}

export default Home;

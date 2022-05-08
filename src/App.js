import { useEffect, useState } from 'react';
import './App.scss';
import http from './services/http.service';
import StatisticsPage from './pages/StatisticsPage';
import SideBar from './components/side-bar/SideBar';
import '@fontsource/plus-jakarta-sans'; // Defaults to weight 400.
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RollCall from './pages/RollCall';

import socketIOClient from 'socket.io-client';
//change this when it will be hosted
const ENDPOINT = 'http://localhost:8080/';
const socket = socketIOClient(ENDPOINT);

const generateCode = (teacherId) => {
  teacherId = 1;
  //console.log("generate code", teacherId);
  socket.emit('generateCode', teacherId);
};

const joinClass = (code, student) => {
  code = document.getElementById('code').value;
  student = {
    studentId: 10,
    firstName: 'Ondrej',
    lastName: 'Surname',
    age: 15,
    email: 'name.surname@gmail.com'
  };
  //console.log(student);
  //studentId = 10;
  socket.emit('attendLecture', { code, student });
};

function App() {
  const [data, setData] = useState(0);

  useEffect(() => {
    socket.on('codeGenerated', (data) => {
      console.log('code generated ', data);
      setTimeout(() => {
        //console.log('Timed out');
        socket.emit('deleteCode', {
          code: data.code,
          classTeacherId: data.classTeacherId
        });
      }, 1000 * 60 * 30); //30 minutes
    });

    socket.on('joinSuccessful', (data) => {
      console.log('join successful ', data);
    });

    socket.on('joinFailed', (data) => {
      console.log('join failed ', data);
    });

    socket.on('studentJoined', (data) => {
      console.log('student joined', data);
    });
  }, []);

  useEffect(() => {
    http.get('/').then((res) => {
      setData(res.data);
    });
  }, []);

  console.log(data);

  return (
    <div className="App">
      <SideBar className="side-bar-container" />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RollCall
                generateCode={generateCode}
                joinClass={joinClass}
                className="roll-call-page-container"
              />
            }
          />
          <Route
            path="/statistics"
            element={<StatisticsPage />}
            className="roll-call-page-container"
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

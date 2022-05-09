import { useEffect, useState } from 'react';
import './App.scss';
import http from './services/http.service';
import StatisticsPage from './pages/StatisticsPage';
import SideBar from './components/side-bar/SideBar';
import '@fontsource/plus-jakarta-sans'; // Defaults to weight 400.
import { Route, Routes, Navigate } from 'react-router-dom';
import RollCall from './pages/RollCall';
import LogInPage from './pages/LogInPage';

import socketIOClient from 'socket.io-client';
//change this when it will be hosted
const ENDPOINT = 'http://localhost:8080/';
const socket = socketIOClient(ENDPOINT);

function App() {
  const [data, setData] = useState(0);
  const [students, setStudents] = useState([]);
  const [code, setCode] = useState('');

  const [session, setSession] = useState({});

  const generateCode = (teacherId) => {
    teacherId = 1;
    //console.log("generate code", teacherId);
    socket.emit('generateCode', teacherId);
  };

  const joinClass = (code, student) => {
    code = document.getElementById('code').value;

    student = {
      studentId: session.userId,
      firstName: 'John',
      lastName: 'Doe',
      age: 15,
      email: session.email
    };
    //console.log(student);
    //studentId = 10;
    socket.emit('attendLecture', { code, student });
  };

  useEffect(() => {
    socket.on('codeGenerated', (data) => {
      console.log('code generated ', data);
      setCode(data.code);
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
      setStudents((students) => [...students, data]);
    });
  }, []);

  useEffect(() => {
    // http.get('/').then((res) => {
    //   setData(res.data);
    // });
    async function fetchSession() {
      try {
        const response = await http.get('/getsession');
        setSession(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSession();
  }, []);

  console.log('students', students);

  console.log('session', session);

  return (
    <div className="App">
      {session.userId ? <SideBar className="side-bar-container" /> : ''}
      <Routes>
        <Route
          path="/"
          element={
            session.userId ? (
              <RollCall
                className="roll-call-page-container"
                generateCode={generateCode}
                joinClass={joinClass}
                students={students}
                code={code}
                loggedInUser={session}
              />
            ) : (
              <LogInPage className={'login-container'} setSession={setSession} />
            )
          }
        />
        <Route
          path="/statistics"
          element={
            session.userId ? (
              <StatisticsPage />
            ) : (
              <LogInPage className={'login-container'} setSession={setSession} />
            )
          }
        />
        <Route
          path="/login"
          element={
            session.userId ? (
              <Navigate to="/" />
            ) : (
              <LogInPage className={'login-container'} setSession={setSession} />
            )
          }
        />
        <Route
          path="*"
          element={
            session.userId ? (
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here for now!</p>
              </main>
            ) : (
              <LogInPage className={'login-container'} setSession={setSession} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;

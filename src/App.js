import { useEffect, useState } from 'react';
import './App.scss';
import StatisticsPage from './pages/StatisticsPage';
import SideBar from './components/side-bar/SideBar';
import '@fontsource/plus-jakarta-sans'; // Defaults to weight 400.
import { Route, Routes, Navigate } from 'react-router-dom';
import RollCall from './pages/RollCall';
import AuthenticationPage from './pages/AuthenticationPage';

import socketIOClient from 'socket.io-client';
//change this when it will be hosted
const ENDPOINT = 'http://localhost:8080/';
const socket = socketIOClient(ENDPOINT);

function App() {
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
      firstName: session.firstName,
      lastName: session.lastName,
      role: session.role,
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
      }, 1000 * 60 * 10); //10 minutes
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
    const userClaims = JSON.parse(window.sessionStorage.getItem('userClaims'));

    // console.log('claims', userClaims);

    if (userClaims) {
      setSession(userClaims);
    } else {
      console.log('You need to log in');
    }
  }, []);

  return (
    <div className='App'>
      {session.userId ? <SideBar className='side-bar-container' /> : ''}
      <Routes>
        <Route
          path='/'
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
              <AuthenticationPage />
            )
          }
        />
        <Route
          path='/statistics'
          element={
            session.userId ? (
              <StatisticsPage loggedInUser={session}/>
            ) : (
              <AuthenticationPage />
            )
          }
        />
        <Route
          path='/login'
          element={
            session.userId ? (
              <Navigate to='/' />
            ) : (
              <AuthenticationPage />
            )
          }
        />
        <Route
          path='*'
          element={
            session.userId ? (
              <main style={{ padding: '1rem', marginLeft: '240px' }}>
                <p>There's nothing here for now!</p>
              </main>
            ) : (
              <AuthenticationPage />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;

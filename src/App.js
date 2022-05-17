import { useEffect, useState } from 'react';
import './App.scss';
import StatisticsPage from './pages/StatisticsPage';
import SideBar from './components/side-bar/SideBar';
import '@fontsource/plus-jakarta-sans'; // Defaults to weight 400.
import { Route, Routes, Navigate } from 'react-router-dom';
import RollCall from './pages/RollCall';
import AuthenticationPage from './pages/authentication-page/AuthenticationPage';

import socketIOClient from 'socket.io-client';
import http from './services/http.service';
import Layout from './components/layout/Layout';
import RequireAuth from './components/require-auth/RequireAuth';
import UnauthorizedPage from './pages/unauthorized-page/UnauthorizedPage';
//change this when it will be hosted
const ENDPOINT = 'http://localhost:8080/';
const socket = socketIOClient(ENDPOINT);

function App() {
  const [students, setStudents] = useState([]);
  const [code, setCode] = useState('');

  const [session, setSession] = useState(null);

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
    // const userClaims = JSON.parse(window.sessionStorage.getItem('userClaims'));

    // const userClaims = { userId: 1 };
    // console.log('claims', userClaims);

    const getSession = async () => {
      // const { data } = await http.get('/session');
      const userClaims = { userId: 1, role: 'TEACHER' };

      if (userClaims) {
        setSession(userClaims);
      } else {
        console.log('You need to log in');
      }
    };

    getSession();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*protected routes*/}
        <Route element={<RequireAuth allowedRoles={['TEACHER']} />}>
          <Route
            path=""
            element={
              <RollCall
                generateCode={generateCode}
                joinClass={joinClass}
                students={students}
                code={code}
                loggedInUser={session}
              />
            }
          />

          <Route path="statistics" element={<StatisticsPage loggedInUser={session} />} />
        </Route>

        <Route path="unauthorized" element={<UnauthorizedPage />} />
      </Route>

      {/*public routes*/}
      <Route path="/login" element={<AuthenticationPage />} />

      <Route
        path="*"
        element={
          session ? (
            <main style={{ padding: '1rem', marginLeft: '240px' }}>
              <p>There's nothing here for now!</p>
            </main>
          ) : (
            <AuthenticationPage />
          )
        }
      />
    </Routes>
  );
}

export default App;

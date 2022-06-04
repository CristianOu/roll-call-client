import { useEffect, useState } from 'react';
import './App.scss';
import StatisticsPage from './pages/StatisticsPage';
import '@fontsource/plus-jakarta-sans'; // Defaults to weight 400.
import { Route, Routes } from 'react-router-dom';
import RollCall from './pages/RollCall';
import AuthenticationPage from './pages/authentication-page/AuthenticationPage';
import socketIOClient from 'socket.io-client';
import Layout from './components/layout/Layout';
import RequireAuth from './components/require-auth/RequireAuth';
import UnauthorizedPage from './pages/unauthorized-page/UnauthorizedPage';
import PersistLogin from './components/persist-login/PersistLogin';
import useAuth from './hooks/useAuth';
//change this when it will be hosted
const ENDPOINT = process.env.REACT_APP_API_URL;
const socket = socketIOClient(ENDPOINT);

function App() {
  const [students, setStudents] = useState([]);
  const [code, setCode] = useState('');
  const { state } = useAuth();

  const user = state?.user?.claims;

  const generateCode = (lecture) => {
    socket.emit('generateCode', lecture.lecture_id);
  };

  const joinClass = (code, student) => {
    code = document.getElementById('code').value;

    console.log(user);

    student = {
      studentId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email
    };

    console.log(student);

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

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*protected routes*/}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={['TEACHER', 'STUDENT']} />}>
            <Route
              path=""
              element={
                <RollCall
                  generateCode={generateCode}
                  joinClass={joinClass}
                  students={students}
                  code={code}
                  loggedInUser={user}
                />
              }
            />

            <Route path="statistics" element={<StatisticsPage />} />
          </Route>
        </Route>

        <Route path="unauthorized" element={<UnauthorizedPage />} />
      </Route>

      {/*public routes*/}
      <Route path="/login" element={<AuthenticationPage />} />

      <Route
        path="*"
        element={
          user ? (
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

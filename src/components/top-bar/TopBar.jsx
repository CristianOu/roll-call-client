import Dropdown from '../dropdown/Dropdown';
import './TopBar.scss';
import CustomButton from '../custom-button/CustomButton';
import Socket from '../socket/Socket';
import socketIOClient from 'socket.io-client';
import React, { useEffect } from 'react';

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

function TopBar() {
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
      console.log('here');
    });
  }, []);

  return (
    <div className="top-bar">
      <Dropdown title={'Course'} />

      {/*<Socket />*/}
      <input type="text" id="code" />
      <CustomButton title="Join Class" variant="info" action={joinClass} />

      <CustomButton title="Start Class" variant="action" action={generateCode} />
    </div>
  );
}

export default TopBar;

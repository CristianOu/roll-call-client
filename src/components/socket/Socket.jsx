import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

//change this when it will be hosted
const ENDPOINT = 'http://localhost:8080/';
const socket = socketIOClient(ENDPOINT);

export default function ClientComponent() {
  useEffect(() => {
    socket.on('codeGenerated', (data) => {
      console.log('code generated ', data);
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
      console.log('here');
    });
  }, []);

  return (
    <div>
      <button onClick={generateCode}>Generate</button>
      <input type="text" id="code" />
      <button onClick={joinClass}>Join</button>
    </div>
  );
}

function generateCode(teacherId) {
  teacherId = 1;
  //console.log("generate code", teacherId);
  socket.emit('generateCode', teacherId);
}

function joinClass(code, student) {
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
}

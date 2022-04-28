import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
//change this when it will be hosted
const ENDPOINT = "http://localhost:8080/";
const socket = socketIOClient(ENDPOINT);
export default function ClientComponent() {
    useEffect(() => {
        socket.on("codeGenerated", data => {
            console.log("code generated ",data);
            console.log(data);
            setTimeout(() => {
                console.log('Timed out');
                socket.emit('deleteCode', {code: data.code, classTeacherId: data.classTeacherId});
            }, 1000 * 60 * 1);
        });

        socket.on("joinSuccessful", data => {
            console.log("join successful ",data);
        });

        socket.on("joinFailed", data => {
            console.log("join failed ",data);
        });
    }, []);

    return (
        <div>
            <button onClick={generateCode}>Generate</button>
            <input type="text" id="code"></input>
            <button onClick={joinClass}>Join</button>
        </div>
    )
}

function generateCode(teacherId) {
    teacherId = 1;
    console.log("generate code", teacherId);
    socket.emit('generateCode', teacherId);
}

function joinClass(code, studentId) {
    code = document.getElementById('code').value;
    studentId = 10;
    socket.emit('attendLecture', {code, studentId});
}
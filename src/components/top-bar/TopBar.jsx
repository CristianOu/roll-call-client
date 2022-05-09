import React, { useEffect, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import './TopBar.scss';
import CustomButton from '../custom-button/CustomButton';
import { getTeacherCourses } from '../../services/api';
import { mapResponseToOptions } from '../../services/helperFunctions';
import Countdown, { zeroPad } from 'react-countdown';
import CustomInput from '../custom-input/CustomInput';

const Completion = () => <span>Check in over!</span>;

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completion />;
  } else {
    // Render a countdown
    return (
      <div className="countdown">
        <span>
          Time left: {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      </div>
    );
  }
};

function TopBar({ generateCode, joinClass, loggedInUser, code }) {
  const [classStarted, setClassStarted] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const handleCourseChange = (option) => {
    setSelectedCourse(option.value);
  };

  useEffect(() => {
    // get user id from state
    const userId = 1;
    getTeacherCourses(userId)
      .then((response) => {
        if (response.data.message !== 'Something went wrong') {
          setCourses(mapResponseToOptions(response.data));
          setLoading(false);
          setError(undefined);
        } else {
          setLoading(false);
          setError('Something went wrong');
        }
      })
      .catch(() => {
        setLoading(false);
        setError('Something went wrong');
      });
  }, []);

  return (
    <div className="top-bar">
      <Dropdown title={'Course'} handleChange={handleCourseChange} options={courses} />

      {loggedInUser.role === 'STUDENT'
        ? [
            // <input type="text" id="code" />,
            <CustomInput id="code" />,

            <CustomButton title="Join Class" variant="info" action={joinClass} />
          ]
        : null}

      {classStarted
        ? [
            <span className="code-label">
              Code: <span className="code">{code}</span>
            </span>,
            <Countdown date={Date.now() + 1800000} renderer={renderer} />
          ]
        : null}

      {!classStarted && loggedInUser.role === 'TEACHER' ? (
        <CustomButton
          title="Start Class"
          variant="action"
          action={() => {
            generateCode();
            setClassStarted(true);
          }}
        />
      ) : null}
    </div>
  );
}

export default TopBar;

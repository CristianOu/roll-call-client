import React, { useEffect, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import './TopBar.scss';
import CustomButton from '../custom-button/CustomButton';
import Countdown, { zeroPad } from 'react-countdown';

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

  return (
    <div className="top-bar">
      <Dropdown title={'Course'} />

      {/*<input type="text" id="code" />*/}

      {/*<CustomButton title="Join Class" variant="info" action={joinClass} />*/}

      {classStarted
        ? [
            <span className="code-label">
              Code: <span className="code">{code}</span>
            </span>,
            <Countdown date={Date.now() + 1800000} renderer={renderer} />
          ]
        : null}

      {classStarted ? null : (
        <CustomButton
          title="Start Class"
          variant="action"
          action={() => {
            generateCode();
            setClassStarted(true);
          }}
        />
      )}
    </div>
  );
}

export default TopBar;

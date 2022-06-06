import React, { useEffect, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import './TopBar.scss';
import CustomButton from '../custom-button/CustomButton';
import {
  mapLecturesToOptions,
  mapResponseToOptions
} from '../../services/helperFunctions';
import Countdown, { zeroPad } from 'react-countdown';
import CustomInput from '../custom-input/CustomInput';
import ProfileIcon from '../../assets/images/profile-icon-test.svg';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

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

function ProfileModal({ handleSignOut }) {
  return (
    <div className="modal-container">
      <div className="option">Profile</div>
      <div className="option">
        <button id="signOut" className="option" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

function TopBar({ generateCode, joinClass, code }) {
  const [classStarted, setClassStarted] = useState(false);
  const [selectedLecture, setselectedLecture] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [lectures, setLectures] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const { signOut, state } = useAuth();
  const loggedInUser = state?.user?.claims;

  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const handleLectureChange = (option) => {
    setselectedLecture(option.value);
  };

  const handleSignOut = () => {
    signOut({ navigate });
  };

  console.log(selectedLecture);

  useEffect(() => {
    // get user id from state
    const userId = loggedInUser.id;
    axios
      .get(`/api/users/lectures/${userId}`)
      .then((response) => {
        if (response.data.message !== 'Something went wrong') {
          console.log(response.data);
          setLectures(mapLecturesToOptions(response.data));
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
    <div className="top-bar-container">
      <div className="top-bar">
        <Dropdown
          title={'Lecture'}
          handleChange={handleLectureChange}
          options={lectures}
        />

        {loggedInUser.role === 'STUDENT'
          ? [
              // <input type="text" id="code" />,
              <CustomInput id="code" />,

              <CustomButton
                title="Join Class"
                variant="info"
                action={joinClass}
                id="join-class"
              />
            ]
          : null}

        {classStarted
          ? [
              <span className="code-label">
                Code: <span className="code">{code}</span>
              </span>,
              <Countdown date={Date.now() + 600000} renderer={renderer} />
            ]
          : null}

        {!classStarted && loggedInUser.role === 'TEACHER' ? (
          <CustomButton
            title="Start Class"
            variant="action"
            action={() => {
              generateCode(selectedLecture);
              setClassStarted(true);
            }}
          />
        ) : null}
      </div>
      <div className="profile-img-container">
        <img
          id="profilePicture"
          src={ProfileIcon}
          alt="icon"
          onClick={() => setToggleModal(!toggleModal)}
        />
      </div>
      {toggleModal ? <ProfileModal handleSignOut={handleSignOut} /> : ''}
    </div>
  );
}

export default TopBar;

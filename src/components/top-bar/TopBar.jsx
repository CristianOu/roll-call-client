import Dropdown from '../dropdown/Dropdown';
import './TopBar.scss';
import CustomButton from '../custom-button/CustomButton';
import React, {useEffect, useState} from "react";
import {getTeacherCourses} from "../../services/api";
import {mapResponseToOptions} from "../../services/helperFunctions";

function TopBar() {
    const [selectedCourse, setSelectedCourse] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const handleCourseChange = (option) => {
        setSelectedCourse(option.value);
    }

    useEffect(() => {
        // get user id from state
        const userId = 1;
        getTeacherCourses(userId).then((response) => {
            if (response.data.message !== 'Something went wrong') {
                setCourses(mapResponseToOptions(response.data));
                setLoading(false);
                setError(undefined);
            } else {
                setLoading(false);
                setError('Something went wrong');
            }
        }).catch(() => {
            setLoading(false);
            setError('Something went wrong');
        })
    }, []);
    return (
        <div className="top-bar">
            <Dropdown title={'Course'} handleChange={handleCourseChange} options={courses}/>

            <CustomButton title="Start Class"/>
        </div>
    );
}

export default TopBar;

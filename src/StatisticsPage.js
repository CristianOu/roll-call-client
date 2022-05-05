import './App.css';
import MetricContainer from "./MetricContainer";
import styled from "styled-components";
import MyTable from "./MyTable";
import React, {useEffect, useMemo, useState} from "react";
import DropDown from "./DropDown";
import {getTeacherCourses, getTeacherStatistics} from "./services/api";
import {mapResponseToOptions, mapResponseToTableData} from "./services/helperFunctions";

const Styles = styled.div`
  table {
    border-spacing: 0;
    border: 1.5px solid lightgray;
    min-width: 100%;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th {
      background-color: #FAFAFA;
      text-align: left;
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1.5px solid lightgray;
      border-right: 1.5px solid lightgray;
      font-size: 20px;
      text-align: left;

      :last-child {
        border-right: 0;
      }
    }
  }`;

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({column: {filterValue = [], preFilteredRows, setFilter, id}}) {
    const [min, max] = useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows]);

    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            <input
                value={filterValue[0] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
                }}
                placeholder={`Min (${min})`}
                style={{
                    width: '70px',
                    marginRight: '0.5rem',
                }}
            />
            to
            <input
                value={filterValue[1] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
                }}
                placeholder={`Max (${max})`}
                style={{
                    width: '70px',
                    marginLeft: '0.5rem',
                }}
            />
        </div>
    )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

const teacherColumns = [
    {
        Header: 'First Name',
        accessor: 'firstName',
    },
    {
        Header: 'Last Name',
        accessor: 'lastName',
        // Use our custom `fuzzyText` filter on this column
        filter: 'fuzzyText',
    },
    {
        Header: 'Email',
        accessor: 'email',
        // Use our custom `fuzzyText` filter on this column
        filter: 'fuzzyText',
    },
    {
        Header: 'Attendance (%)',
        accessor: 'attendance',
        Filter: NumberRangeColumnFilter,
        filter: 'between',
    },
    {
        Header: 'Actions',
    }
];

const studentColumns = [
    {
        Header: 'Course',
        accessor: 'course',
    },
    {
        Header: 'Attendance',
        accessor: 'attendance',
        Filter: NumberRangeColumnFilter,
        filter: 'between',
    }];

function StatisticsPage() {
    // TODO: get user role from app state
    const isTeacher = true;
    // TODO: get userId from app state
    const userId = 1;
    const tableColumns = isTeacher ? teacherColumns : studentColumns;
    const [tableData, setTableData] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(undefined);
    const [metrics, setMetrics] = useState({overall:0, week:0, month:0});
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (isTeacher) {
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
        }
    }, []);

    useEffect(() => {
        if (isTeacher && courses.length > 0) {
            getTeacherStatistics(userId, selectedCourse.class_id, selectedCourse.course_id).then((response) => {
                if (response.data.message !== 'Something went wrong') {
                    setMetrics({
                        overall: response.data['classAttendance'],
                        week: response.data['weeklyAttendance'],
                        month: response.data['monthlyAttendance']
                    });
                    setTableData(mapResponseToTableData(response.data['studentsAttendance']));
                    setLoading(false);
                    setError(undefined);
                } else {
                    setLoading(false);
                    setError('Something went wrong');
                }
            }).catch(() => {
                setLoading(false);
                setError('Something went wrong');
            });
        } else {
            // TODO: Do it for the students...
            // const metricsFromServer = {
            //     overall: 60,
            //     week: 30,
            //     month: 80,
            //     overallDiff: -10,
            //     monthDiff: 40,
            //     weekDiff: 90,
            // };
            // setMetrics(metricsFromServer);
            // //TODO: if student, get courses and attendance from server
            // const response = [
            //     {
            //         course: 'Development of Large Systems',
            //         attendance: 50,
            //     },
            //     {
            //         course: 'Testing',
            //         attendance: 40,
            //     },
            //     {
            //         course: 'Databases for Developers',
            //         attendance: 90,
            //     },
            // ];
            // setTableData(response);
        }
    }, [selectedCourse])

    const handleCourseChange = (option) => {
        setSelectedCourse(option.value);
    }

    const render = () => {
        if (error) {
            return <text>{error}</text>
        }

        if (loading) {
            return <text>Loading...</text>
        }

        return (
            <div style={{marginLeft: '20px', marginRight: '20px'}}>
                <DropDown title={'Course'} handleChange={handleCourseChange} options={courses}/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginTop: '30px',
                    marginBottom: '30px'
                }}>
                    <MetricContainer title={`Overall attendance`} percentage={metrics.overall}
                                     diff={metrics.overallDiff}/>
                    <MetricContainer title={`This week's attendance`} percentage={metrics.week}
                                     diff={metrics.weekDiff}/>
                    <MetricContainer title={`This month's attendance`} percentage={metrics.month}
                                     diff={metrics.monthDiff}/>
                </div>
                {isTeacher &&
                <Styles>
                    <MyTable columns={tableColumns} data={tableData}/>
                </Styles>
                }
            </div>
        );
    }

    return render();
}

export default StatisticsPage;

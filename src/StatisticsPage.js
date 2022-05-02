import './App.css';
import TopBar from "./TopBar";
import MetricContainer from "./MetricContainer";
import styled from "styled-components";
import MyTable from "./MyTable";
import React, {useEffect, useMemo, useState} from "react";

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
    //TODO: get user role from app state
    const userRole = 'teacher';
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            //TODO: get user role from app state
            const userRole = 'student';
            if (userRole === 'teacher') {
                setColumns(teacherColumns);
                //TODO: get data from server
                const data = [
                    {
                        firstName: 'John',
                        lastName: 'Smith',
                        email: 'j.smith@stud.kea.dk',
                        attendance: 59,
                    },
                    {
                        firstName: 'George',
                        lastName: 'Peterson',
                        email: 'g.peterson@stud.kea.dk',
                        attendance: 5,
                    }
                ];
                setData(data);
            } else {
                setColumns(studentColumns);
                //TODO: if student, get courses and attendance from server
                const response = [
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                    {
                        course: 'Development of Large Systems',
                        attendance: 50,
                    },
                    {
                        course: 'Testing',
                        attendance: 40,
                    },
                    {
                        course: 'Databases for Developers',
                        attendance: 90,
                    },
                ];
                setData(response);
            }
        }, 3000);
    }, [])

    // get user role and get relevant data
    // pass data down to components as props
    return (
        <div style={{marginLeft:'20px', marginRight:'20px',}}>
            {userRole === 'teacher' && <TopBar/>}
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-between', marginTop:'30px', marginBottom:'30px'}}>
                <MetricContainer title={`Overall attendance`} percentage={1} diff={10}/>
                <MetricContainer title={`This week's attendance`} percentage={75} diff={-10}/>
                <MetricContainer title={`This month's attendance`} percentage={100} diff={0}/>
            </div>
            <Styles>
                <MyTable columns={columns} data={data}/>
            </Styles>
        </div>
    );
}

export default StatisticsPage;

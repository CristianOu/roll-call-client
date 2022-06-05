import http from './http.service';

export const getTeacherStatistics = (teacherId, classId, courseId) => {
  return http.post(`/api/users/teachers/attendance/${teacherId}`, {
    data: {
      class_id: classId,
      course_id: courseId
    }
  });
};

export const getTeacherCourses = (teacherId) => {
  return http.get(`/api/users/classes/courses/all/${teacherId}`);
};

export const getStudentStatistics = (studentId) => {
  return http.get(`/api/users/students/attendance/${studentId}`);
};

export const getSignIn = (email, password) => {
    return http.post('/api/users/login', {
        email: email,
        password: password
    });       
}

// fetches data from: https://confluence.govcloud.dk/display/FDAPI/Danish+Meteorological+Institute+-+Open+Data
export const getWeatherData = () => {
    const apiKey = 'df4bf8b8-a641-459f-bf69-36c1b8de3ceb';
    return http.get(`https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=${apiKey}&period=latest&bbox=12.5,55.6,12.6,55.7&parameterId=temp_dry`, { withCredentials: false })
}

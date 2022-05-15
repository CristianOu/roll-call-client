import http from './http.service';

export const getTeacherStatistics = (userId, classId, courseId) => {
    return http.post(`/api/users/teachers/attendance/${userId}`, {
        data: {
            class_id: classId,
            course_id: courseId,
        }
    });
}

export const getTeacherCourses = (teacherId) => {
    return http.get(`/api/users/statisticCourse/${teacherId}`);
}

export const getStudentStatistics = (studentId) => {
    return http.get(`/api/users/students/attendance/${studentId}`)
}

export const getSignIn = (email, password) => {
    return http.post('/api/users/login', {
        email: email,
        password: password
    });       
}

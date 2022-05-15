import http from './http.service';

export const getTeacherStatistics = (teacherId, classId, courseId) => {
    return http.post(`/api/users/teachers/attendance/${teacherId}`, {
        data: {
            class_id: classId,
            course_id: courseId,
        }
    });
}

export const getTeacherCourses = (teacherId) => {
    return http.get(`/api/users/classes/courses/all/${teacherId}`);
}

export const getStudentStatistics = (studentId) => {
    return http.get(`/api/users/students/attendance/${studentId}`)
}

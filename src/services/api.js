import http from './http.service';

export const getTeacherStatistics = (teacherId, classId, courseId) => http.post(`/api/users/teachers/attendance/${teacherId}`, {
  data: {
    class_id: classId,
    course_id: courseId,
  },
});

export const getTeacherCourses = (teacherId) => http.get(`/api/users/classes/courses/all/${teacherId}`);

export const getStudentStatistics = (studentId) => http.get(`/api/users/students/attendance/${studentId}`);

export const getSignIn = (email, password) => http.post('/api/users/login', {
  email,
  password,
});

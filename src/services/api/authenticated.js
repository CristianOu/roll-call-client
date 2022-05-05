import http from '../http.service';

export const getTeacherStatistics = (userId, classId, courseId) => {
    return http.post(`/api/users/teachers/attendance/${userId}`, {
        data: {
            class_id: classId,
            course_id: courseId,
        }
    });
}

export const mapServerDataToOptions = (data) => {
    return data.map((item) => {
        return {label: item.courseName, value: item.course_id}
    })
}

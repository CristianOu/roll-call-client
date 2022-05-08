export const mapResponseToOptions = (data) => {
    return data.map((item) => {
        return {label: `${item.className}, ${item.courseName}`, value: {course_id: item.course_id, class_id: item.class_id}}
    })
}

export const mapResponseToTableData = (data) => {
    const result = [];
    for (const property in data) {
        if (data.hasOwnProperty(property)) {
            result.push({
                email: property,
                firstName: `${data[property]['firstName']}`,
                lastName: `${data[property]['lastName']}`,
                attendance: data[property]['attendance']
            })
        }
    }
    return result;
}

export const mapStudentStatsToTableData = (data) => {
    const result = [];
    for (const property in data) {
        console.log(property === 'firstName')
        console.log(property === 'lastName')
        if (data.hasOwnProperty(property) && property !== 'firstName' && property !== 'lastName') {
            result.push({
                course: property,
                attendance: `${data[property]}`,
            })
        }
    }
    return result;
}

import Moment from 'moment';

export const mapResponseToOptions = (data) => {
  return data.map((item) => {
    return {
      label: `${item.className}, ${item.courseName}`,
      value: { course_id: item.course_id, class_id: item.class_id }
    };
  });
};

export const mapLecturesToOptions = (data) => {
  return data.map((item) => {
    const date = new Date(item.start_date_time);
    const formattedDate = Moment(date).format('LLL');

    return {
      label: `${item.name} - ${formattedDate}`,
      value: { lecture_id: item.lecture_id }
    };
  });
};

export const mapResponseToTableData = (data) => {
  const result = [];
  for (const property in data) {
    if (data.hasOwnProperty(property)) {
      result.push({
        email: property,
        firstName: `${data[property]['firstName']}`,
        lastName: `${data[property]['lastName']}`,
        attendance: Number(data[property]['attendance'])
      });
    }
  }
  return result;
};

export const mapStudentStatsToTableData = (data) => {
  const result = [];
  for (const property in data) {
    if (
      data.hasOwnProperty(property) &&
      property !== 'firstName' &&
      property !== 'lastName'
    ) {
      result.push({
        course: property,
        attendance: `${data[property]}`
      });
    }
  }
  return result;
};

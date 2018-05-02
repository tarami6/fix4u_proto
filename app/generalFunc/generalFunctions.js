export const getAvgRating = (a, b, c) => {
    return ((a + b + c) / 3)
};

export const formatTime = (date) => {
    let newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = newDate.getDate();
    day = day < 10 ? '0' + day : day;
    let format = day + '/' + month + '/' + year;
    return format;
}
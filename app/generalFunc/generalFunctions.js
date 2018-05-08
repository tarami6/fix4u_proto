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

export const dateObjToTimeString = (date) => {
    let newDate = new Date(date);
    let hour = addZero(newDate.getHours());
    let minutes = addZero(newDate.getMinutes());
    let format = hour + ':' + minutes + ':00';
    return format;
}

export const addZero = (time) => {
    if(time<10){
        return ('0'+time);
    }
    else {
        return time+'';
    }
}
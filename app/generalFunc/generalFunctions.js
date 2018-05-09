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

export const msToHMS = ( ms ) => {
    // 1- Convert to seconds:
    let seconds = ms / 1000;
    // 2- Extract hours:
    let hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    let minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = Math.floor(seconds % 60);
    return (hours+":"+minutes+":"+seconds);
}


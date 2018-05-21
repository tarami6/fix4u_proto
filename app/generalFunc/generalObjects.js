export const hebrewServices = {
    Electrician: 'חשמלאי',
    Plumber: 'אינסטלטור',
    Cleaner: 'מנקה',
    Handyman: 'שיפוצניק',
    Locksmith: 'מנעולן',
    TechnicianWashingMachines: 'טכנאי מכונות כביסה',
    AirConditioningTechnician: 'טכנאי מזגנים'
}
export const PicService = {
    Electrician: require('../../assets/whiteIcons/Electrician.png'),
    Plumber: require('../../assets/whiteIcons/Plumber.png'),
    Cleaner: require('../../assets/whiteIcons/Cleaner.png'),
    Handyman: require('../../assets/whiteIcons/Handyman.png'),
    Locksmith: require('../../assets/whiteIcons/Locksmith.png'),
    TechnicianWashingMachines: require('../../assets/whiteIcons/TechnicianWashingMachines.png'),
    AirConditioningTechnician: require('../../assets/whiteIcons/AirConditioningTechnician.png')
}
export const ToIcon = {
    Electrician: 'electrician',
    Plumber: 'plumber',
    Cleaner: 'cleaner',
    Handyman:'handyman',
    Locksmith: 'lock',
    TechnicianWashingMachines: 'wash',
    AirConditioningTechnician: 'airc'
}


export const ServicesArrToHebString = (arr: Array) => {
    let returnWord = '';
    for(let i=0; i<arr.length-1; i++){
        returnWord +=  hebrewServices[arr[i]] + ', '
    }
    returnWord += hebrewServices[arr[arr.length-1]];
    return returnWord;
}

export const jobStepsInHeb = {
    on_the_way: '-בדרך',
    in_progress: '-בעבודה',
    consumer_payment: '-תשלום',
    consumer_review: 'ציון',
    completed: 'הסתיים',

}

export const hebrewServices = {
    Electrician: 'חשמלאי',
    Plumber: 'אינסטלטור',
    Cleaner: 'מנקה',
    Handyman: 'שיפוצניק',
    Locksmith: 'מנעולן',
    TechnicianWashingMachines: 'טכנאי מכונות כביסה',
    AirConditioningTechnician: 'תכנאי מזגנים'
}

export const ServicesArrToHebString = (arr: Array) => {
    let returnWord = '';
    for(let i=0; i<arr.length-1; i++){
        returnWord +=  hebrewServices[arr[i]] + ', '
    }
    returnWord += hebrewServices[arr[arr.length-1]];
    return returnWord;
}
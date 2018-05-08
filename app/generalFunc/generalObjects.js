export const hebrewServices = {
    Electrician: 'חשמלאי',
    Plumber: 'אינסטלטור',
    Cleaner: 'מנקה',
    Handyman: 'שיפוצניק',
    Locksmith: 'מנעולן',
    TechnicianWashingMachines: 'טכנאי מכונות כביסה',
    AirConditioningTechnician: 'טכנאי מזגנים'
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

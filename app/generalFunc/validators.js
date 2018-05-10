export const numbersOnlyByLengthValidator = (num, length) => {
    let errors = [];
    if (typeof num !== "number"){
        errors.push('שדה זה חייב להכיל מספר בלבד')
    }
    else if(num.toString().length>length){
        errors.push('המספר לא יכול להיות יותר ארוך מ' + length + 'ספרות')
    }
    return errors;
};
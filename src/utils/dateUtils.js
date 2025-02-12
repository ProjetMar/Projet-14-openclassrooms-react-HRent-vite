// retoune la date du jour
export const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
};
//Retourne la date d'il y a 16 ans 
export const getDateMinus16Years = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 16);
    return date.toISOString().split("T")[0];
};
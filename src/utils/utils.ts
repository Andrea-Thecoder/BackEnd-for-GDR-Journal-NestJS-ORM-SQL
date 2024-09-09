export const capitalizeFirstLetter =(str:string):string => {
    str = str.trim();
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}





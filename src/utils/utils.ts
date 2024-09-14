export const capitalizeFirstLetter =(str:string):string => {
    str = str.trim();
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


export const validateID = (value:number):boolean => {
    return typeof value === "number" && value > 0 ;
} 




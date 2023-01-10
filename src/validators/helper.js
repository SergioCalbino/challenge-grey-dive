
export const objTester = (obj) =>{
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return true;
    }    
    return false;
}

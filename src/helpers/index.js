const dates = [
    'JAN','FEV','MAR','AVR','MAI','JUN','JUL','AOU','SEP','OCT','NOV','DEC'
]

export const dateFormat = (date)=>{
    return `${dates[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
}

export const arrayConnect = (...list) =>{

}
// export const arrayUnion = (array1 , array2) =>{
//     if(array1[0] <= array2[0]){
//         if(array1.at(-1) >= array2.at(-1)){

//         }
//     }
// }

export function arrayUnion(a1, a2) {
  let result = [...a1];
  let i = 0;
  for (i = 0; i < a2.length; i++) {
    if (!result.includes(a2[i])) {
      result.push(a2[i]);
    }
  }
  return result;
}


export const ellipsis = (nb , str)=>{
  return str.length > nb ? str.slice(0,nb)+'...' : str
}
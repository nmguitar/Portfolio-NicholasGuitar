export function prettyObjArr(objectArr){
  const objStr = JSON.stringify(objectArr);
  let newStr = '';
  //let newStrArr = [];
  const lineBreak = '\n';
  const indent = '    '
  //const breakCount = 0;

  for(let i = 0; i < objStr.length; i++){
    if(objStr[i] === '['){
      newStr = newStr + objStr[i] + lineBreak + indent

    } else if(objStr[i] === ',' && objStr[i-1] === '}'){
      newStr = newStr + objStr[i] + lineBreak + indent

    } else if(objStr[i] === ']'){
      newStr = newStr + lineBreak + objStr[i] 

    } else {
      newStr = newStr + objStr[i]
    }
  }
  //console.log(newStr)
  return newStr
}
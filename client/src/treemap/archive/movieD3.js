function nameStrArr(inStr) {
  let newStrArr = []
  let startThisWord = 0;

  for(let i = 0; i < inStr.length; i++) {
    if(inStr[i] === " ") {//if we find a space character...\
      if(newLine(inStr.slice(i + 1, inStr.length)) === true){
        newStrArr.push(inStr.slice(startThisWord, i))
        startThisWord = i + 1
        //console.log(newStrArr)
      }   
    } else if(inStr[i] === '/' || inStr[i] === '-'){
      newStrArr.push(inStr.slice(startThisWord, i + 1))
      startThisWord = i + 1
    } else if(i == inStr.length - 1){
      newStrArr.push(inStr.slice(startThisWord, i + 1))
      //console.log('last character!')
    } 
  }
  return newStrArr
}

function newLine(str) {
  const noLineBreakArr = ['- ','in ', 'of ', 'the ', 'and ','&', 'at ', 'DS ', 'I', 'II ', 'III ', 'IV ', 'V ', 'VI ', 'VII ', 'VIII ', 'IX ', 'X', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  for (let i = 0; i < noLineBreakArr.length; i++){
    if(str.slice(0,noLineBreakArr[i].length) === noLineBreakArr[i]){
      return false;
    }
  }
  return true;
}

function cateColors(arr){
  let categoriesArr = [];
  let catAndColArr = [];
  let categoryExists = false;
  for(let i = 0; i < arr.length; i++){//loop through each arg arr item
    //if categoriesArr.length = 0 then simply push cat name
    if(categoriesArr.length == 0){
      categoriesArr.push(arr[i].data.category)
    } else {//if its not then loop through categories arr to see if we can push the current category in arr arg to categoriesArr
      for(let j = 0; j < categoriesArr.length; j++){

        if(categoriesArr[j] === arr[i].data.category){
          categoryExists = true
        }
      }
      //if categoryExists still = false, then push the category
      if(categoryExists == false){
        categoriesArr.push(arr[i].data.category)
      } 
      categoryExists = false;
    }
  }
  //have all categories, lets add colors to them
  for(let i = 0; i < categoriesArr.length; i++){
    catAndColArr.push([
      categoriesArr[i], 
      'hsl(' + Math.round((i/categoriesArr.length)*360) + ', 100%, 75%)'
    ])
  }
  //return categoriesArr
  return catAndColArr
}

//pull in json data and create const to hold usable data
axios.get('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json')
.then((response) => {
  const vgData = response.data;
  console.log('response then vgData:')
  console.log(response)
  console.log(vgData);

  //create tree svg with a height, width variables
  const width = 800;
  const height = 650;

  const svg = d3.select('#treeMap')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const treeMapRoot = d3.hierarchy(vgData)
    .sum((d) => d.value)
    .sort((a, b) => b.height - a.height || b.value - a.value);

  const treeMapLayout = d3.treemap()
    .tile(d3.treemapSquarify)
    .size([width, height - 150])
    .padding(1)
    .round(true)

  const rectsData = treeMapLayout(treeMapRoot).leaves()

  //object for adding appropriate colors to each rect
  let cateColorsObj = {}
  const catColArr = cateColors(rectsData)
  for(let i = 0; i < catColArr.length; i++){
    cateColorsObj[catColArr[i][0]] = catColArr[i][1]
  }
  console.log(catColArr)
  console.log('testing cateColors Obj:')
  console.log(cateColorsObj)
  console.log('rectsData:')
  console.log(rectsData)

  //toolTip
  const toolTip = d3.select('#treeMap')
    .append('div')
    .attr('class', 'tooltip')
    .html('nothing selected')

  //mouseover/mousmove/mouseleave functions
  const mouseOver = function(event) {
    toolTip
      .style('visibility', 'visible')
  }
  const mouseMove = function(event, d) {
    toolTip
      .html('Name: ' + d['data']['name'] + '<br/>Category: ' + d['data']['category'] + '<br/>Value: ' + d['data']['value'] )
      .style('top', (event.clientY - 25) + 'px')
      .style('left', (event.clientX +10) + 'px')
  }

  const mouseLeave = function() {
    toolTip
      .style('visibility', 'hidden')
  }

  const leaf = svg.selectAll('g')
    .data(rectsData)
    .enter()
      .append('g')
      .attr("transform", (d) => 'translate(' + d.x0 + ',' + d.y0 + ')')


  leaf.append('rect')
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)
    .style('fill', (d) => '' + cateColorsObj[d.data.category])
    .on("mouseover", mouseOver)
    .on("mousemove", mouseMove)
    .on("mouseleave", mouseLeave)

  leaf.append('clipPath')
    .attr('id', (d,i) => ('clip' + i))
    .append('rect')
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)

  leaf.append('text')
      .attr('clip-path', (d, i) => 'url(#clip' + i + ')'  )
    .selectAll('tspan')
    .data((d) => nameStrArr(d.data.name))
    .join('tspan')//.enter and.append combined
      .text((d) => d)
      .attr('x', 5)
      .attr('y', (d, i) => '' + (12*i + 13))
      .style('font-size', '0.7em')

  //legend created

  for(let i = 0; i < catColArr.length; i++) {
    let colNum = 3;
    let rowNum = Math.ceil(catColArr.length / colNum);
    let iniTop = height - 135;
    let iniLeft = width - 550; 

    svg.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('x', ((i%colNum)*120 + iniLeft))
      .attr('y', ((Math.floor(i/3)%rowNum)*30 + iniTop))
      .style('fill', catColArr[i][1])

    svg.append('text')
      .text(catColArr[i][0])
      .attr('x', ((i%colNum)*120 + iniLeft + 20))
      .attr('y', ((Math.floor(i/3)%rowNum)*30 + iniTop + 12))
      .style('font-size', '0.8em')
  }



})
.catch((error) => {
  console.log(error)
});
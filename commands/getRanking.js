module.exports = (ranking) => {
  answer =""
  if (ranking == undefined)
    return "Error! trying to access an undefined ranking cause I'm not well coded."
  if (ranking.size == 0)
    return answer +"No member have points on this ranking yet.\n"
  ranking.forEach(function(val,key) { answer += key+" ("+val+")\n"})
  return answer
}

module.exports = (ranking) => {
  let answer =""
  if (ranking == undefined)
    return "Error! trying to access an undefined ranking cause I'm not well coded."
  if (ranking.size == 0)
    return answer +"No member have points on this ranking yet.\n"
  let sortedRanking = new Map([...ranking.entries()].sort((a, b) => parseFloat(b) - parseFloat(a)));
  sortedRanking.forEach(function(val,key) { answer += key+" ("+val+")\n"})

  return answer
}

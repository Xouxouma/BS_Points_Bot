module.exports = (ranking, member) =>
{
    let memberId = "<@"+member.id+">"
    if (ranking.get(memberId) != null)
        return "" + ranking.get(memberId)
    else return 0
}
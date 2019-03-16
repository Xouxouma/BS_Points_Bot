'use strict';
// User class for use in storing point values
class User {
  constructor(member,guildId) {
    this.points = 0
    this.member = member
    this.guild = guildId
  }

  setPoints(points) {
    this.points = points
  }

  addPoints(nbOfpoints) {
    this.points += nbOfpoints
  }

}

exports.User = User;

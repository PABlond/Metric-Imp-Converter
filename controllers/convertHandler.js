const units = require("./units")

class ConvertHandler {
  constructor(units) {
    this.units = units
  }

  getNum(input) {
    input = input.toLowerCase().match(/[^a-z]/gi) || 1
    if (input === 1) {
      return 1
    }
    input = input.join("").split("/")
    return input.length <= 2 ? input.reduce((a, b) => a / b) : null
  }

  getUnit(input) {
    input = input.toLowerCase().match(/[a-z]/gi)
    return input
      ? Object.keys(units).includes(input.join(""))
        ? input.join("")
        : null
      : null
  }

  getReturnUnit(initUnit) {
    initUnit = initUnit.toLowerCase()
    console.log("initunit", initUnit)
    return units[initUnit][1]
  }

  spellOutUnit(unit) {
    return units[unit][0]
  }

  convert(initNum, initUnit) {
    initUnit = initUnit.toLowerCase()
    return initNum * units[initUnit][2]
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string:
        initNum +
        " " +
        this.spellOutUnit(initUnit) +
        " converts to " +
        returnNum.toFixed(5) +
        " " +
        this.spellOutUnit(returnUnit)
    }
  }
}

module.exports = ConvertHandler

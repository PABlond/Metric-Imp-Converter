/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict"

var ConvertHandler = require("../controllers/convertHandler.js")

module.exports = function(app) {
  var convertHandler = new ConvertHandler()

  app.route("/api/convert").get(function(req, res) {
    const { input } = req.query
    const n = convertHandler.getNum(input)
    const u = convertHandler.getUnit(input)
    if (!n || !u) {
      if (!n && u) return res.status(400).json("invalid number")
      else if (!u && n) return res.status(400).json("invalid unit")
      return res.status(400).json("invalid number and unit")
    }
    const returnNum = convertHandler.convert(n, u)
    const returnUnit = convertHandler.getReturnUnit(u)
    const toString = convertHandler.getString(n, u, returnNum, returnUnit)
    res.status(201).json(toString)
  })
}

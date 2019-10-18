const chai = require("chai")
const assert = chai.assert
const ConvertHandler = require("../controllers/convertHandler.js")

const convertHandler = new ConvertHandler()

suite("Unit Tests", () => {
  suite("Function convertHandler.getNum(input)", () => {
    test("Whole number input", done => {
      const input = "32L"
      assert.equal(convertHandler.getNum(input), 32)
      done()
    })

    test("Decimal Input", done => {
      const input = "1.2gal"
      assert.equal(convertHandler.getNum(input), 1.2)
      done()
    })

    test("Fractional Input", done => {
      const input = "1/2km"
      assert.equal(convertHandler.getNum(input), 0.5)
      done()
    })

    test("Fractional Input w/ Decimal", done => {
      const input = "5.5/2mi"
      assert.equal(convertHandler.getNum(input), 2.75)
      done()
    })

    test("Invalid Input (double fraction)", done => {
      const input = "5.5/2/2l"
      assert.equal(convertHandler.getNum(input), null)
      done()
    })

    test("No Numerical Input", done => {
      const input = "lbs"
      assert.equal(convertHandler.getNum(input), 1)
      done()
    })
  })

  suite("Function convertHandler.getUnit(input)", () => {
    test("For Each Valid Unit Inputs", done => {
      const input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG"
      ]
      input.forEach(el => {
        assert.equal(convertHandler.getUnit(el), el.toLowerCase())
      })
      done()
    })

    test("Unknown Unit Input", done => {
      const input = "whatever"
      assert.equal(convertHandler.getUnit(input), null)
      done()
    })
  })

  suite("Function convertHandler.getReturnUnit(initUnit)", () => {
    test("For Each Valid Unit Inputs", done => {
      const input = ["gal", "l", "mi", "km", "lbs", "kg"]
      const expect = ["l", "gal", "km", "mi", "kg", "lbs"]
      input.forEach((el, i) => {
        assert.equal(convertHandler.getReturnUnit(el), expect[i])
      })
      done()
    })
  })

  suite("Function convertHandler.spellOutUnit(unit)", () => {
    test("For Each Valid Unit Inputs", done => {
      const input = ["gal", "l", "mi", "km", "lbs", "kg"]
      const expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms"
      ]
      input.forEach((el, i) => {
        assert.strictEqual(convertHandler.spellOutUnit(el), expect[i])
      })
      done()
    })
  })

  suite("Function convertHandler.convert(num, unit)", () => {
    test("Gal to L", done => {
      var input = [5, "Gal"]
      var expected = 18.9271
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // Tolerance
      )
      done()
    })

    test("L to Gal", done => {
      var input = [6, "L"]
      var expected = 1.58503
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // Tolerance
      )
      done()
    })

    test("Mi to Km", done => {
      var input = [10, "Mi"]
      var expected = 16.0934
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // Tolerance
      )
      done()
    })

    test("Km to Mi", done => {
      var input = [2.5, "Km"]
      var expected = 1.55343
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // Tolerance
      )
      done()
    })

    test("Lbs to Kg", done => {
      var input = [3 / 3, "Lbs"]
      var expected = 0.453592
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // Tolerance
      )
      done()
    })

    test("Kg to Lbs", done => {
      var input = [6.3 / 2, "Kg"]
      var expected = 6.944561
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // Tolerance
      )
      done()
    })
  })
})

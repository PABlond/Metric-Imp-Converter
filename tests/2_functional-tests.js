const chaiHttp = require("chai-http")
const chai = require("chai")
const assert = chai.assert
const server = require("../server")

chai.use(chaiHttp)

suite("Functional Tests", () => {
  suite("Routing Tests", () => {
    suite("GET /api/convert => conversion object", () => {
      test("Convert 10L (valid input)", done => {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "10L" })
          .end((err, res) => {
            assert.equal(res.status, 201)
            assert.equal(res.body.initNum, 10)
            assert.equal(res.body.initUnit, "l")
            assert.approximately(res.body.returnNum, 2.64171, 0.1)
            assert.equal(res.body.returnUnit, "gal")
            done()
          })
      })

      test("Convert 32g (invalid input unit)", done => {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "32g" })
          .end((err, res) => {
            assert.equal(res.status, 400)
            assert.equal(res.text, '"invalid unit"')
            done()
          })
      })

      test("Convert 3/7.2/4kg (invalid number)", done => {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "3/7.2/4kg" })
          .end((err, res) => {
            assert.equal(res.status, 400)
            done()
          })
      })

      test("Convert 3/7.2/4kilomegagram (invalid number and unit)", done => {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "3/7.2/4kilomegagram" })
          .end((err, res) => {
            assert.equal(res.status, 400)
            done()
          })
      })

      test("Convert kg (no number)", done => {
        chai
          .request(server)
          .get("/api/convert")
          .query({ input: "kg" })
          .end((err, res) => {
            assert.equal(res.status, 201)
            assert.equal(res.body.initNum, 1)
            assert.equal(res.body.initUnit, "kg")
            assert.approximately(res.body.returnNum, 2.20462, 0.1)
            assert.equal(res.body.returnUnit, "lbs")
            assert.equal(
              res.body.string,
              "1 kilograms converts to 2.20462 pounds"
            )
            done()
          })
      })
    })
  })
})

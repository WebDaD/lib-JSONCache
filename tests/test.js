/* global it, describe, beforeEach, afterEach */

const JSONCache = require('../index.js')
const jsonfile = require('jsonfile')
const fs = require('fs')
const assert = require('assert')
let jc
let config = {
  file: './tests/filecopy.json',
  saveInterval: 3000,
  autoLoad: false,
  autoSave: false
}
describe('Object Creation', function () {
  it('should throw an error if "file" is missing in options', function () {
    let newconfig = JSON.parse(JSON.stringify(config))
    delete newconfig.file
    try {
      jc = new JSONCache(newconfig)
      assert.fail('Should throw an error')
    } catch (e) {
      assert.equal(e.toString().indexOf('File') > -1, true)
    }
  })
  it('should create an object with default values', function () {
    let newconfig = JSON.parse(JSON.stringify(config))
    delete newconfig.saveInterval
    delete newconfig.autoLoad
    delete newconfig.autoSave
    try {
      jc = new JSONCache(newconfig)
      assert.equal(jc.saveIntervalTime, '30000')
      assert.equal(jc.autoLoad, false)
      assert.equal(jc.autoSave, false)
    } catch (e) {
      assert.fail(e.toString())
    }
  })
  it('should create an object with overriden value for saveInterval', function () {
    let newconfig = JSON.parse(JSON.stringify(config))
    delete newconfig.autoLoad
    delete newconfig.autoSave
    try {
      jc = new JSONCache(newconfig)
      assert.equal(jc.saveIntervalTime, '3000')
      assert.equal(jc.autoLoad, false)
      assert.equal(jc.autoSave, false)
    } catch (e) {
      assert.fail(e.toString())
    }
  })
  it('should create an object with overriden value for autoLoad', function () {
    let newconfig = JSON.parse(JSON.stringify(config))
    delete newconfig.saveInterval
    delete newconfig.autoSave
    try {
      jc = new JSONCache(newconfig)
      assert.equal(jc.saveIntervalTime, '30000')
      assert.equal(jc.autoLoad, false)
      assert.equal(jc.autoSave, false)
    } catch (e) {
      assert.fail(e.toString())
    }
  })
  it('should create an object with overriden value for autoSave', function () {
    let newconfig = JSON.parse(JSON.stringify(config))
    delete newconfig.autoLoad
    delete newconfig.saveInterval
    try {
      jc = new JSONCache(newconfig)
      assert.equal(jc.saveIntervalTime, '30000')
      assert.equal(jc.autoLoad, false)
      assert.equal(jc.autoSave, false)
    } catch (e) {
      assert.fail(e.toString())
    }
  })
})
describe('Manual Usage', function () {
  beforeEach('create Object', function () {
    let newconfig = JSON.parse(JSON.stringify(config))
    fs.copyFileSync('./tests/file.json', './tests/filecopy.json')
    jc = new JSONCache(newconfig)
  })
  afterEach('destroy Object', function () {
    fs.unlinkSync('./tests/filecopy.json')
    jc = undefined
  })
  it('Should fail if the JSON-File does not exist', function (done) {
    jc.file = 'no-exist'
    jc.load(function (error) {
      if (error) {
        assert.equal(error.toString().indexOf('file') > -1, true)
        done()
      } else {
        assert.fail('Should have an Error here...')
        done()
      }
    })
  })
  it('Should have an emtpy DataSet initially', function () {
    assert.equal(jc.data.length, 0)
  })
  it('Should have all Elements after load', function (done) {
    jc.load(function (error) {
      if (error) {
        assert.fail(error)
        done(error)
      } else {
        assert.equal(jc.data.length, 2)
        done()
      }
    })
  })
  it('Should be able to add one element to the Array', function (done) {
    jc.load(function (error) {
      if (error) {
        assert.fail(error)
        done(error)
      } else {
        assert.equal(jc.data.length, 2)
        jc.data.push({id: 3, title: 'Number3'})
        assert.equal(jc.data.length, 3)
        done()
      }
    })
  })
  it('Should Save the Array correctly', function (done) {
    jc.load(function (error) {
      if (error) {
        assert.fail(error)
        done(error)
      } else {
        assert.equal(jc.data.length, 2)
        jc.data.push({id: 3, title: 'Number3'})
        assert.equal(jc.data.length, 3)
        jc.save(function (error) {
          if (error) {
            assert.fail(error)
            done(error)
          } else {
            let check = jsonfile.readFileSync(jc.file)
            assert.equal(check.length, jc.data.length)
            assert.deepEqual(check, jc.data)
            done()
          }
        })
      }
    })
  })
})
describe('Automatic Usage', function () {
  beforeEach('create Object', function () {
    let newconfig = JSON.parse(JSON.stringify(config))
    newconfig.autoload = true
    newconfig.autosave = true
    newconfig.saveInterval = 1000
    fs.copyFileSync('./tests/file.json', './tests/filecopy.json')
    jc = new JSONCache(newconfig)
  })
  afterEach('destroy Object', function () {
    jc.stopAutoSave()
    fs.unlinkSync('./tests/filecopy.json')
    jc = undefined
  })
  it('Should have all Elements initially', function () {
    assert.equal(jc.data.length, 2)
  })
  it('Should be able to add one element to the Array and have it in the file (after 1 second)', function (done) {
    jc.data.push({id: 3, title: 'Number3'})
    setTimeout(function () {
      let check = jsonfile.readFileSync(jc.file)
      assert.equal(check.length, jc.data.length)
      assert.deepEqual(check, jc.data)
      done()
    }, 1100)
  })
})

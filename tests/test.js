/* global it, describe, beforeEach, afterEach */

const JSONCache = require('../index.js')
const jsonfile = require('jsonfile')
const assert = require('assert')
let jc
let config = {
  file: './filecopy.json',
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
    // TODO: copy file.json to filecopy.json
    jc = new JSONCache(newconfig)
  })
  afterEach('destroy Object', function () {
    // TODO: delete filecopy.json
    jc = undefined
  })
  it('Should fail if the JSON-File does not exist')
  it('Should have an emtpy DataSet initially')
  it('Should have all Elements after load')
  it('Should be able to add one element to the Array')
  it('Should Save the Array correctly')
})
describe('Automatic Usage', function () {
  beforeEach('create Object', function () {
    let newconfig = JSON.parse(JSON.stringify(config))
    newconfig.autoLoad = true
    newconfig.autoSave = true
    // TODO: copy file.json to filecopy.json
    jc = new JSONCache(newconfig)
  })
  afterEach('destroy Object', function () {
    // TODO: delete filecopy.json
    jc = undefined
  })
  it('Should fail if the JSON-File does not exist')
  it('Should have all Elements initially')
  it('Should be able to add one element to the Array and have it in the file')
})

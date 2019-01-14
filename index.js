function JSONCache (options) {
  this.options = options || {}
  this.jsonfile = require('jsonfile')
  if (!this.options.file) {
    throw new Error('File must be specified')
  } else {
    this.file = this.options.file
  }
  this.saveIntervalTime = this.options.saveInterval || 30 * 1000
  this.autoLoad = this.options.autoload || false
  this.autoSave = this.options.autosave || false
  this.data = []
  this.saveInterval = undefined
  this.save = function (callback) {
    this.jsonfile.writeFile(this.file, this.data, function (error) {
      if (error) {
        if (!callback) {
          throw new Error(error)
        } else {
          callback(error)
        }
      } else {
        if (callback) {
          callback(null)
        }
      }
    })
  }
  this.load = function (callback) {
    let self = this
    this.jsonfile.readFile(this.file, function (error, data) {
      if (error) {
        if (!callback) {
          throw new Error(error)
        } else {
          callback(error)
        }
      } else {
        self.data = JSON.parse(JSON.stringify(data))
        if (callback) {
          callback(null)
        }
      }
    })
  }
  this.startAutoSave = function () {
    let self = this
    this.saveInterval = setInterval(function () {
      self.save()
    }, this.saveIntervalTime)
  }
  this.stopAutoSave = function () {
    clearInterval(this.saveInterval)
  }
  if (this.autoLoad) {
    try {
      this.data = this.jsonfile.readFileSync(this.file)
    } catch (error) {
      throw new Error(error)
    }
  }
  if (this.autoSave) {
    this.startAutoSave()
  }
  return this
}
module.exports = JSONCache

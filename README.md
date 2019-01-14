# lib-JSONCache

A small Lib to Hold a JSON-File in Memory Cache

## Installation

Just run `npm install lib-jsoncache`

## Usage

The Usage is simple, the config is extensive :-)

`const JSONCache = require('lib-jsoncache')`  

`let jc = new JSONCache(config)`  

### Load File

`jc.load()`

### Use Values

This is an Array of Objects from the JSON-File

`jc.data`

You may, e.g. `jc.data.push({})`

### Save File

`jc.save()`

### Start / Stop Autosave

Every x Seconds (30 seconds or set in Config) the file may autosave using a simple interval.

To Start this use:

`jc.startAutoSave()`

To Stop it:

`jc.stopAutoSave()`

## Config

There are a lot of config parameters to give.  
Just see config.sample.json for a full example of all options.

### Required

* file: Name of the JSON-File to Load from / Save to

### Optional

* saveInterval: How often to autosave the file (in milliseconds). Default is 30 seconds
* autoload: Set to True to autoload the File on init. otherwise you have to call .load()
* autosave: Set to True to autosave the File in intervals. You may also call .save() whenever you want to save

## Testing

To Test you may install the dev-dependencies.  
Then just run `npm run test`
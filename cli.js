#!/usr/bin/env node
var cli = require('cli').enable('version', 'glob', 'catchall');
var exec = require('child_process').execSync;
var fs = require('fs');
var path = require('path');

var packageJson = require('./package.json');

cli.setApp(packageJson.name, packageJson.version)

cli.parse({
  cwd: ['c', 'You want to specify the path to the current working directory.'],
  yield: ['y', 'Specifies the command to yield', 'string']
});

cli.main(function (args, options) {
  if (!options.yield) {
    throw new Error('`-y COMMAND` is required.');
  }
  if (args.length == 0) {
    args = [process.cwd()];
  }

  args.map(function(p) {
    return path.resolve(p);
  }).filter(function(p) {
    return fs.lstatSync(p).isDirectory();
  }).forEach(function(p) {
    var cwd = options.cwd ? p : process.cwd();
    var command = options.yield.replace('$0', process.cwd())
                               .replace('$1', p);
    process.stdout.write(exec(command, {cwd: cwd}).toString());
  });
});

module.exports = cli;
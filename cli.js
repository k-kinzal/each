li = require('cli').enable('version', 'glob', 'catchall');
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawnSync;

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
    spawn('/bin/sh', ['-c', command], {cwd: cwd, stdio: 'inherit'});
  });
});

module.exports = cli;

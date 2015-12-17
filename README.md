# each

To yield each command.

## Get started

```
npm install --save-dev @k-kinzal/each
```

## Command

```
$ $(npm bin)/each --help                        
Usage:
  @k-kinzal/each [OPTIONS] [ARGS]

Options: 
  -c, --cwd              You want to specify the path to the current working 
                         directory. 
  -y, --yield STRING     Specifies the command to yield
  -v, --version          Display the current version
  -h, --help             Display help and usage details
```

## Example

```
$ $(npm bin)/each  -y 'echo $0'
/path/to/each
```

```
$ $(npm bin)/each node_modules/* -y 'echo $1'
/path/to/each/node_modules/cli
/path/to/each/node_modules/glob
```

```
$ $(npm bin)/each node_modules/* -c -y 'pwd'    
/path/to/each/node_modules/cli
/path/to/each/node_modules/glob

```
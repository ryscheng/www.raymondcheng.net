ryscheng.github.io
==================

## Dependencies
- Ruby (>= 2.0) (`sudo apt-get install ruby ruby-dev`)
- RubyGems 
- Bundler (`gem install bundler`)

## Shell

To open a bash shell in a Docker container with all the necessary system dependencies:
```bash
$ bash docker-enter.sh
```

## Install dev dependencies

```bash
bundle install
```

## Commands
See `Makefile` for list of commands

### To run a dev server

```bash
make run
```

### To do a production build

```bash
make build
```

### To generate new syntax colors

```bash
bundle exec rougify style base16.solarized.dark > css/syntax.css
```

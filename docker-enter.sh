#!/bin/bash

CWD=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

which docker >/dev/null || {
  echo "ERROR: Please install Docker first."
  exit 1
}

docker run --rm -t -i \
  --name "website" \
  -v ${CWD}:/code \
  -w /code \
  ruby:2.3 \
  bash


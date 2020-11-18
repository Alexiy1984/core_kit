#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

if [ "$1" != "" ]; then
  COMPT="$(tr '[:lower:]' '[:upper:]' <<< ${1:0:1})${1:1}"
  mkdir -p views/components/$1 
  cp views/components/_extended/index.pug views/components/$1/index.pug
  echo "//- ${COMPT} component"> views/components/$1/$1.pug
else
NOW=$(date +"%m.%d.%Y %T")
echo -e "\n${RED}Component name missing:${NC}\n\nPlease add ${CYAN}one parameter${NC} to script name \n\n[${GREEN}Exit:${NC} ${NOW}]\n"
fi

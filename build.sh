#!/bin/bash

function compile_scss() {
  ./node_modules/node-sass/bin/node-sass --include-path="node_modules/govuk-elements-sass/public/sass" --include-path="node_modules/govuk_frontend_toolkit/stylesheets" "assets/sass/app.scss" "public/stylesheets/app.css"
}

function start() {
  node ./bin/www
}
main () {
  compile_scss
  start
}

main
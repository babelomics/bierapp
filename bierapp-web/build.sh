#!/bin/sh
rm -f bierapp.min.html
rm -f bierapp.min.js

mkdir -p build
rm -rf build/fonts
rm -rf build/images
rm -f build/index.html
rm -f build/bierapp.min.js
rm -f build/bierapp-config.js
rm -f build/LICENSE
rm -f build/README.md

vulcanize bierapp-index.html -o bierapp.min.html --inline --strip --csp --config vulcanize.json

cp -r bower_components/fontawesome/fonts build/
cp -r src/fonts/*.woff* build/fonts/
cp -r src/images build/
cp -r lib/jsorolla/styles/img/* build/images/
cp bierapp-config.js build/

mv bierapp.min.html build/index.html
mv bierapp.min.js build/

sed -i s@bower_components/fontawesome/fonts/fontawesome-webfont.@fonts/fontawesome-webfont.@g build/index.html
sed -i s@src/fonts/@fonts/@g build/index.html
sed -i s@src/images/@images/@g build/index.html

sed -i s@lib/jsorolla/styles/img/@images/@g build/index.html
sed -i s@lib/jsorolla/styles/fonts/@fonts/@g build/index.html


cp ../LICENSE build/
cp ../README.md build/

#!/bin/sh
NAME="bierapp"
ELEMENT="bierapp-element"
BP=build

rm -rf $BP
mkdir -p $BP
mkdir -p $BP/fontawesome
mkdir -p $BP/webcomponentsjs
mkdir -p $BP/fonts
mkdir -p $BP/fonts

vulcanize --inline-scripts --inline-css --strip-comments $ELEMENT.html > $BP/$ELEMENT.html

cp -r $NAME-index.html $BP/index.html
cp -r conf/ $BP/
cp -r images/ $BP/
cp -r bower_components/fontawesome/css $BP/fontawesome/
cp -r bower_components/fontawesome/fonts $BP/fontawesome/
cp -r bower_components/webcomponentsjs/*.min.js $BP/webcomponentsjs/

#
# fix index.html paths
#
sed -i s@lib/jsorolla/styles/fonts/@fonts/@g $BP/index.html
sed -i s@lib/jsorolla/styles/fonts/@fonts/@g $BP/$ELEMENT.html
sed -i s@lib/jsorolla/styles/img/@images/@g $BP/$ELEMENT.html
cp -r lib/jsorolla/styles/img/* build/images/
cp -r lib/jsorolla/styles/fonts/* build/fonts/

sed -i s@lib/jsorolla/src/lib/components/@@g $BP/index.html
cp -r lib/jsorolla/src/lib/components/jso-global.css build/
cp -r lib/jsorolla/src/lib/components/jso-dropdown.css build/
cp -r lib/jsorolla/src/lib/components/jso-form.css build/


sed -i s@'bower_components/'@@g $BP/index.html
cp -r bower_components/underscore $BP/
cp -r bower_components/backbone $BP/
cp -r bower_components/jquery $BP/
cp -r bower_components/qtip2 $BP/
cp -r bower_components/pako $BP/
cp -r bower_components/highcharts-release $BP/
cp -r bower_components/crypto-js-evanvosberg $BP/
cp -r bower_components/cookies-js $BP/
## end fix paths

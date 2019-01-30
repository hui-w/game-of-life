#!/bin/sh

YUI="./yuicompressor-2.4.8.jar"
FILE_NAME="game-of-life-0.1.0"
RES_DIR="../res"
SRC_DIR="../src"
OUT_DIR="../release"

echo "Deleting old content of output..."
rm -rf $OUT_DIR
mkdir $OUT_DIR

echo "Combining JS files..."
cat \
$SRC_DIR/common.js \
$SRC_DIR/config.js \
$SRC_DIR/main.js \
$SRC_DIR/matrix.js \
$SRC_DIR/minion.js \
$SRC_DIR/monitor.js \
$SRC_DIR/planet.js \
$SRC_DIR/planet_item.js \
$SRC_DIR/polyfill.js \
$SRC_DIR/toolbar.js \
> $OUT_DIR/temp.combined.js

echo "Compressing JS files..."
java -jar "$YUI" \
--type js \
-o $OUT_DIR/temp.minified.js \
$OUT_DIR/temp.combined.js

echo "Adding the version header..."
cat \
./version.js \
$OUT_DIR/temp.minified.js \
> $OUT_DIR/$FILE_NAME.min.js

echo "Deleting temporary files..."
rm -f $OUT_DIR/temp.combined.js
rm -f $OUT_DIR/temp.minified.js

echo "Preparing static files..."
cp $SRC_DIR/index_release.html $OUT_DIR/index.html
cp $SRC_DIR/matrix.css $OUT_DIR/$FILE_NAME.min.css

cp $RES_DIR/apple-touch-icon.png $OUT_DIR/apple-touch-icon.png
cp $RES_DIR/favicon16.png $OUT_DIR/favicon16.png
cp $RES_DIR/favicon64.png $OUT_DIR/favicon64.png
cp $RES_DIR/favicon.ico $OUT_DIR/favicon.ico

echo "Done!"
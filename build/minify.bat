@ECHO ON
REM Starting to minify JS & CSS files ...

@ECHO OFF
REM don't watch the sausage being made

REM the folder
SET TOOLS=%~DP0
SET SRC=%TOOLS%\..\src
SET RES=%TOOLS%\..\res
SET OUT=%TOOLS%\..\output

rd /S /Q %OUT%
md "%OUT%\"

REM Combine JS & CSS files into one file
type "%SRC%\button.js" "%SRC%\common.js" "%SRC%\config.js" "%SRC%\main.js" "%SRC%\matrix.js" "%SRC%\minion.js" "%SRC%\monitor.js" "%SRC%\planet.js" "%SRC%\planet_item.js" "%SRC%\toolbar.js" > "%OUT%\temp.matrix.js"
type "%SRC%\matrix.css" > "%OUT%\temp.matrix.css"

REM Compress with YUI Compressor  
java -jar "%TOOLS%\yuicompressor-2.4.7.jar" -o "%OUT%\matrix.min.js" "%OUT%\temp.matrix.js"
java -jar "%TOOLS%\yuicompressor-2.4.7.jar" -o "%OUT%\matrix.min.css" "%OUT%\temp.matrix.css"

REM Delete temporary files
del "%OUT%\temp.matrix.js"
del "%OUT%\temp.matrix.css"

REM Index Files
copy "%SRC%\index_release.html" "%OUT%\index.html"

REM Copy other files
copy "%RES%\favicon.ico" "%OUT%\favicon.ico"
copy "%RES%\apple-touch-icon.png" "%OUT%\apple-touch-icon.png"

@ECHO ON

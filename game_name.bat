@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
echo Iniciando verificacion de productividad...

:: Crea un archivo temporal para capturar la salida del script de Node.js
set "temp_output=%temp%\node_output.txt"
if exist "%temp_output%" del "%temp_output%"

:: Ejecuta el script de Node.js y redirecciona su salida al archivo temporal
"C:\Program Files\nodejs\node.exe" "%SCRIPT_DIR%work-before-play.js" "%SCRIPT_DIR:~0,-1%" > "%temp_output%" 2>&1

:: Muestra la salida del script en la consola
type "%temp_output%"

:: Usa un bucle 'for' para leer el archivo temporal y encontrar la línea con la ruta
for /f "tokens=2 delims==" %%a in ('findstr /b /c:"PATH_TO_GAME=" "%temp_output%"') do (
    set "GAME_PATH=%%a"
)

:: La variable 'GAME_PATH' solo se definirá si el script de Node.js tuvo éxito y escribió la ruta
if defined GAME_PATH (
    echo.
    echo Abriendo Juego...
    start "" "%GAME_PATH%"
) else (
    echo.
    echo El juego no se abrira.
    taskkill /IM "RiotClientServices.exe" /F >nul 2>&1
    pause
)

:: Borra el archivo temporal al terminar
if exist "%temp_output%" del "%temp_output%"

endlocal
exit
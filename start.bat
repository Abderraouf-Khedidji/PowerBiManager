@echo off
:: Comprobar el argumento -mg, -p, o -h
if "%1"=="-mg" (
    echo Ejecutando mongosqld...
    start "" cmd /k "".\MongoConnector\Connector for BI\2.14\bin\mongosqld.exe" --config ".\MongoConnector\Connector for BI\2.14\mongosqld-config.yml""
) else if "%1"=="-p" (
    echo Ejecutando python...
    py -m venv ./Powerbi-server/venv
    call .\Powerbi-server\venv\Scripts\activate
    cd ./Powerbi-server
    pip install -r ./Requirements.txt
    py main.py
) else if "%1"=="-h" (
    echo.
    echo Uso del script:
    echo.
    echo -mg    : Ejecuta el conector mongosqld en una nueva ventana.
    echo -p     : Activa el entorno virtual de Python y ejecuta el script main.py.
    echo -h     : Muestra esta ayuda.
    echo.
) else (
    echo Opcion no valida. Usa -mg, -p o -h.
)

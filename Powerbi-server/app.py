from typing import Annotated
import os
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse, HTMLResponse
import requests
from bs4 import BeautifulSoup
import subprocess

app = FastAPI()

@app.get("/")
async def welcome():
    return "Welcome to python static server"

@app.get("/get-svg/{svg}")
def get_svg(svg: str):
    # Ruta al archivo SVG
    print(svg)
    svg_path = f"C:/neuroretailStatics/Maps/{svg}"
    if os.path.exists(svg_path):
        return FileResponse(svg_path, media_type="image/svg+xml")
    
    raise HTTPException(status_code=404, detail="Fichero no encontrado")

@app.get("/getComponents")
def get_components():
    components_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../Components"))
    
    if not os.path.isdir(components_dir):
        raise HTTPException(status_code=404, detail="Directorio 'Components' no encontrado")

    try:
        folders = [
            {"name": name}
            for name in os.listdir(components_dir)
            if os.path.isdir(os.path.join(components_dir, name))
        ]
        return folders
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al leer carpetas: {str(e)}")

import time
import socket

@app.put("/activeComponent/{component_name}")
def active_component(component_name: str):
    components_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../Components"))
    component_path = os.path.join(components_dir, component_name)

    if not os.path.isdir(component_path):
        raise HTTPException(status_code=404, detail="Componente no encontrado")

    try:
        # Desactivar proceso en puerto 8080 antes de activar el nuevo componente
        os.system('for /f "tokens=5" %a in (\'netstat -aon ^| findstr :8080 ^| findstr LISTENING\') do taskkill /F /T /PID %a')

        # Activar nuevo componente
        command = f'start "" cmd /k "title Component-{component_name} && cd /d {component_path} && pbiviz start"'
        os.system(command)

        # Esperar hasta que el servidor esté levantado en el puerto 8080
        server_running = False
        while not server_running:
            time.sleep(1)  # Esperar 1 segundo antes de volver a comprobar
            try:
                # Intentar conectar al puerto 8080
                with socket.create_connection(("localhost", 8080), timeout=1):
                    server_running = True
            except (socket.timeout, socket.error):
                continue

        return {"message": f"Componente '{component_name}' activado y servidor en puerto 8080 listo"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al activar el componente: {str(e)}")


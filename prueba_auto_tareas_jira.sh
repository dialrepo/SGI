#!/bin/bash

# Configura tu repositorio de GitHub
REPO="dialrepo/SGI" # Cambia esto por el nombre de tu repositorio (usuario/repositorio)

# Archivo CSV con las tareas
CSV_FILE="prueba_tareas_auto.csv"
ID_PROJECT="PVT_kwHOCn3rVs4As3IB"
PROJECT="Prueba_proyecto_UM_27112024"

# Leer cada línea del archivo CSV (excepto la primera línea que contiene los encabezados)
tail -n +2 "$CSV_FILE" | while IFS=',' read -r titulo descripcion etiquetas; do
    # Crear la tarea (issue) en el repositorio
    echo "Creando tarea: $titulo"
    echo "descripcion: $descripcion"
    echo "label: $etiquetas"
    echo "project: $PROJECT"
    
    # Usa GitHub CLI para crear la tarea   
    #gh issue create --title "$titulo" --body "$descripcion" --label "$etiquetas" --project "$PROJECT"

done

echo "¡Tareas creadas!"


 

# El FROM indica el tipo de imagen que se va a utilizar
# En este caso se utiliza una imagen de python
FROM python:3.12.0a1-alpine3.16

# Copiamos todos los archivos de la carpeta actual a la carpeta /app
COPY . /app

# Establecemos el directorio de trabajo
WORKDIR /app

# Instalamos las dependencias
RUN pip install -r requirements.txt

# Exponemos el puerto 5000
EXPOSE 5000

# Ejecutamos el comando para iniciar la aplicación
CMD ["python", "index.py"]


# ==============  * COMANDOS BÁSICOS DE DOCKER *  ==============

# Ejecutar el comando para construir la imagen apartir de un dockerfiel
# * docker build -t "nombre_imagen:v1" .

# Correr el comando para ejecutar el contenedor
# * docker run --name "nombre_contenedor" -d -p 5000:5000 "nombre_imagen:v1"
# Donde:
# -d: indica que el contenedor se ejecutará en segundo plano
# -p: indica el puerto que se va a utilizar

# Para detener el contenedor
# * docker stop "nombre_contenedor"

# Para eliminar el contenedor
# * docker rm "nombre_contenedor"

# Listar todos los contenedores que se estén ejecutando
# * docker ps

# Listar todos los contenedores sin importar su estado
# * docker ps -a

# Para eliminar todos los contenedores que se estén ejecutando de manera forzada
# * docker rm $(docker ps -aq) -f


# ==============  * SUBIR IMAGEN A DOCKER HUB *  ==============
# 1. Crear una cuenta en Docker Hub
# 2. Crear un repositorio
# 3. Iniciar sesión en Docker Hub desde la terminal
# * docker login
# 4. Crear una etiqueta para la imagen
# * docker tag "nombre_imagen:v1" "nombre_usuario_docker_hub/nombre_imagen:v1"
# 5. Subir la imagen a Docker Hub
# * docker push "nombre_usuario_docker_hub/nombre_imagen:v1"

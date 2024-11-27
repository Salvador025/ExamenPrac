# Usa una imagen base oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar las dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --production

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que tu aplicación escucha
EXPOSE 3000

# Comando por defecto para ejecutar tu aplicación
CMD ["node", "server.js"]

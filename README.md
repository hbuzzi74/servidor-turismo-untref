# servidor-turismo-untref

Servidor basado en Express para obtener datos de turismo desde MongoDB (proyecto Turismo)

_Requisitos_
El código utiliza un archivo .env en el cual se describen las variables de entornos usadas para alcanzar el servidor de MongoDB.

El archivo .env aporta las siguientes variables de entorno en base a la configuración actual de la base de datos:

    PORT=3008
    URL_PREFIX=mongodb+srv://
    URL_SUFFIX=@cluster0.th3b0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    USERNAME=hbuzzi
    PASS=<contraseña_de_MongoDB>

 UTEQ Sensor Monitor

Aplicación web desarrollada con **React, Vite y Firebase Realtime Database** para visualizar datos simulados de sensores ambientales instalados en diferentes zonas del campus La María de la Universidad Técnica Estatal de Quevedo (UTEQ).

## ¿Para qué sirve esta práctica?

Esta práctica permite comprender cómo se construye un sistema básico de monitoreo IoT. Su finalidad es mostrar, desde una página web, la información enviada por distintos sensores y almacenada en una base de datos en tiempo real.

El sistema presenta la temperatura, la humedad y la presión atmosférica de cada sensor. También muestra la ubicación asignada, el nombre de la persona relacionada con el dispositivo, su estado y un historial de mediciones. De esta manera, se representa el funcionamiento de una solución IoT completa: obtención de datos, almacenamiento en la nube y visualización mediante una interfaz web.

La aplicación incluye **38 sensores de ejemplo**. Al abrir la página principal o pulsar el botón **Dashboard**, el sistema elige uno de ellos al azar y muestra la persona y los datos correspondientes. Cada vez que se vuelve a cargar la ruta principal se puede visualizar un sensor diferente.

## Objetivo general

Desarrollar una aplicación web que permita consultar y visualizar, de forma clara y en tiempo real, los datos ambientales registrados por una red de sensores ubicada en el campus La María de la UTEQ.

## Objetivos específicos

- Conectar una aplicación desarrollada en React con Firebase Realtime Database.
- Consultar datos actuales e históricos de varios sensores.
- Mostrar temperatura, humedad y presión atmosférica en un panel fácil de interpretar.
- Utilizar rutas dinámicas para acceder al Dashboard de cada sensor.
- Comprobar cómo se actualiza la interfaz cuando cambia la información de la base de datos.
- Seleccionar aleatoriamente un sensor al ingresar a la página principal.
- Aplicar una estructura organizada mediante componentes, páginas, servicios y hooks.

## Funcionalidades principales

- Selección aleatoria de uno de los 38 sensores disponibles.
- Visualización del nombre de la persona relacionada con el sensor.
- Presentación de la zona y el estado del dispositivo.
- Lectura de temperatura en grados Celsius.
- Lectura del porcentaje de humedad.
- Lectura de la presión atmosférica en hectopascales.
- Fecha y hora de la última actualización.
- Tabla con las 20 mediciones históricas más recientes.
- Página de ubicaciones para consultar todos los sensores.
- Navegación mediante rutas dinámicas.
- Actualización automática de los datos sin recargar manualmente la página.
- Diseño adaptable para computadoras, tabletas y teléfonos.

## ¿Cómo funciona?

El funcionamiento general de la práctica se divide en cuatro etapas:

1. Los datos de cada sensor se guardan en Firebase Realtime Database.
2. La aplicación se conecta con Firebase utilizando las variables del archivo `.env`.
3. React consulta la ubicación, los valores actuales y el historial del sensor seleccionado.
4. El Dashboard presenta la información y escucha los cambios de la base de datos para actualizarse automáticamente.

Cuando el usuario entra a la ruta `/`, la aplicación consulta los sensores disponibles, escoge un identificador al azar y redirige a la ruta `/sensor/:sensorId`. Por esta razón, el nombre mostrado pertenece al sensor seleccionado y no queda limitado a una sola persona.

## Tecnologías utilizadas

- **React:** creación de la interfaz mediante componentes reutilizables.
- **Vite:** entorno de desarrollo y compilación del proyecto.
- **Firebase Realtime Database:** almacenamiento y actualización de datos en tiempo real.
- **React Router DOM:** navegación entre el Dashboard y la página de ubicaciones.
- **JavaScript:** lógica de selección, consulta y presentación de datos.
- **CSS:** estilos y adaptación de la interfaz a diferentes tamaños de pantalla.

## Estructura de los datos

La base de datos se organiza en tres nodos principales:

| Nodo | Contenido |
| --- | --- |
| `ubicacionesSensores` | Nombre, campus, zona, ciudad, provincia, coordenadas y estado de cada sensor. |
| `valorActual` | Última lectura de temperatura, humedad, presión atmosférica y fecha. |
| `valoresHistoricos` | Registros anteriores de las variables ambientales de cada sensor. |

El archivo `firebase-rtdb-seed.json`, ubicado en la raíz del proyecto, contiene los datos iniciales de los 38 sensores.

## Estructura principal del proyecto

```text
monitoreo-sensores-uteq/
├── src/
│   ├── components/        Componentes visuales y redirección aleatoria
│   ├── hooks/             Consulta de los datos del sensor
│   ├── pages/             Dashboard y página de ubicaciones
│   ├── services/          Configuración de Firebase
│   ├── App.jsx            Rutas principales de la aplicación
│   ├── main.jsx           Punto de entrada de React
│   └── styles.css         Estilos generales
├── firebase-rtdb-seed.json
├── index.html
├── package.json
└── vite.config.js
```

## Requisitos

- Node.js 18 o una versión superior.
- npm instalado.
- Un proyecto creado en Firebase.
- Firebase Realtime Database habilitado.

## Configuración de Firebase

1. Ingresar a [Firebase Console](https://console.firebase.google.com/).
2. Crear un proyecto nuevo.
3. Registrar una aplicación web dentro del proyecto.
4. Activar **Realtime Database**.
5. Importar el archivo `firebase-rtdb-seed.json` desde el nodo raíz de la base de datos.
6. Configurar las reglas de lectura.

> **Importante:** importar el archivo JSON en el nodo raíz reemplaza los datos existentes. Se recomienda realizar este paso en una base de datos nueva o vacía.

Reglas sugeridas para esta práctica:

```json
{
  "rules": {
    ".read": true,
    ".write": false,
    "valoresHistoricos": {
      "$sensorId": {
        ".indexOn": ["timestamp"]
      }
    }
  }
}
```

Estas reglas permiten consultar los datos y evitan que cualquier visitante pueda modificarlos desde la aplicación.

## Variables de entorno

Crear un archivo llamado `.env` en la raíz del proyecto y colocar la configuración proporcionada por Firebase:

```env
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_FIREBASE_DATABASE_URL=TU_DATABASE_URL
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID
```

El archivo `.env` no debe publicarse en GitHub porque contiene datos de configuración del proyecto.

## Instalación y ejecución

Abrir una terminal dentro de la carpeta del proyecto y ejecutar:

```bash
npm install
npm run dev
```

Después, abrir en el navegador la dirección mostrada por Vite, normalmente:

```text
http://localhost:5173
```

## Rutas disponibles

| Ruta | Función |
| --- | --- |
| `/` | Selecciona un sensor aleatorio y abre su Dashboard. |
| `/sensor/:sensorId` | Muestra los datos del sensor indicado. |
| `/ubicaciones` | Presenta la lista completa de sensores y sus ubicaciones. |

## Comprobación del funcionamiento en tiempo real

1. Abrir el Dashboard de cualquier sensor.
2. Copiar el identificador que aparece debajo de la última actualización.
3. Ingresar a Firebase Realtime Database.
4. Modificar la temperatura en `valorActual/IDENTIFICADOR/temperatura`.
5. Regresar al navegador y comprobar que el valor cambia sin recargar la página.
6. Agregar un registro en `valoresHistoricos/IDENTIFICADOR` con los campos `temperatura`, `humedad`, `presionAtmosferica` y `timestamp`.
7. Verificar que el nuevo registro aparece automáticamente en la tabla del historial.

## Resultados esperados

Al finalizar la práctica, se obtiene un Dashboard funcional capaz de leer información desde Firebase, presentar datos ambientales y reaccionar automáticamente ante las actualizaciones. Además, el estudiante comprende la relación que existe entre un dispositivo IoT, una base de datos en la nube y una aplicación encargada de mostrar la información al usuario.

## Conclusión

Esta práctica ayuda a entender de forma sencilla cómo trabaja un sistema de monitoreo IoT. Aunque los datos incluidos son de demostración, la misma estructura puede utilizarse con sensores físicos conectados a una placa ESP32. En un proyecto real, el ESP32 enviaría las mediciones a Firebase y el Dashboard permitiría observarlas desde cualquier lugar con acceso a internet. Por ello, la aplicación sirve como una base útil para desarrollar soluciones de monitoreo ambiental, control de invernaderos, estaciones meteorológicas o supervisión de espacios universitarios.

# AI CAP SDK JS - Chat Demo

## 📋 Descripción del Proyecto

Este proyecto es una demostración de integración entre **SAP Cloud Application Programming Model (CAP)** y **SAP AI SDK** para JavaScript. La aplicación permite realizar consultas a un modelo de IA (GPT-4o) a través de SAP AI Core usando el servicio de orquestación.

### 🏗️ Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   CAP Service   │    │   SAP AI Core   │
│   (HTML/JS)     │───▶│   (Node.js)     │───▶│   (GPT-4o)      │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🛠️ Tecnologías Utilizadas

- **SAP CAP**: Framework de desarrollo de aplicaciones empresariales
- **SAP AI SDK**: SDK oficial para integración con SAP AI Core
- **Node.js**: Runtime del backend
- **Express**: Servidor web
- **GPT-4o**: Modelo de lenguaje grande vía SAP AI Core
- **HTML/CSS/JavaScript**: Frontend simple

## 📁 Estructura del Proyecto

```
ai-cap-sdk-js/
├── app/
│   └── index.html              # Interfaz web del chat
├── srv/
│   ├── ai-service.cds          # Definición del servicio CDS
│   ├── ai-service.js           # Implementación del servicio AI
│   └── server.js               # Configuración del servidor
├── db/                         # Modelos de datos (vacío en este demo)
├── package.json                # Dependencias y scripts
└── README.md                   # Documentación inicial
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** >= 20
- **npm** o **yarn**
- Acceso a **SAP AI Core** (con configuración de servicio)
- Variables de entorno configuradas para SAP AI Core

### 1. Instalación de Dependencias

```bash
npm install
```

### 2. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con la variable de configuración del servicio:

```env
# SAP AI Core Configuration
AICORE_SERVICE_KEY='{
  "clientid": "<tu-client-id>",
  "clientsecret": "<tu-client-secret>",
  "url": "<tu-auth-url>",
  "identityzone": "<tu-identity-zone>",
  "identityzoneid": "<tu-identity-zone-id>",
  "appname": "<tu-app-name>",
  "serviceurls": {
    "AI_API_URL": "<tu-ai-api-url>"
  }
}'
```

> **Nota**: Este JSON lo obtienes desde el **Service Key** de tu instancia de SAP AI Core en SAP BTP. 
> 
> **Cómo obtener el Service Key:**
> 1. Ve al **SAP BTP Cockpit**
> 2. Navega a tu **Subaccount** → **Spaces** → tu **Space**
> 3. En la sección **Services** → **Instances**, busca tu instancia de **AI Core**
> 4. Haz clic en la instancia y ve a **Service Keys**
> 5. Crea un nuevo Service Key o usa uno existente
> 6. Copia exactamente el JSON completo del Service Key y pégalo como valor de `AICORE_SERVICE_KEY`

### 3. Iniciar el Servidor

```bash
npm start
```

o para desarrollo con auto-reload:

```bash
cds watch
```

El servidor se iniciará en `http://localhost:4004`

## 📖 Uso de la Aplicación

### Interfaz Web

1. Abre tu navegador y ve a `http://localhost:4004`
2. Verás una interfaz de chat simple
3. Escribe tu pregunta en el campo de texto
4. Haz clic en "Preguntar" o presiona Enter
5. La respuesta del modelo GPT-4o aparecerá debajo

### API Endpoints

#### Realizar Pregunta a IA
```http
POST /odata/v4/ai/askQuestion
Content-Type: application/json

{
  "question": "¿Cuál es la capital de España?"
}
```

**Respuesta:**
```json
{
  "question": "¿Cuál es la capital de España?",
  "answer": "La capital de España es Madrid.",
  "model": "gpt-4o",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Health Check
```http
POST /odata/v4/ai/healthCheck
```

**Respuesta:**
```json
{
  "status": "healthy",
  "service": "AI Orchestration Service",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔧 Detalles Técnicos

### Servicio AI (ai-service.js)

- **OrchestrationClient**: Cliente para conectar con SAP AI Core
- **Modelo**: GPT-4o configurado por defecto
- **Template**: Plantilla simple para formatear las preguntas
- **Error Handling**: Manejo robusto de errores con logs

### Configuración del Cliente

```javascript
const orchestrationClient = new OrchestrationClient({
  llm: {
    model_name: 'gpt-4o'
  },
  templating: {
    template: [{ role: 'user', content: 'Answer the question: {{?question}}' }]
  }
});
```

### Frontend Features

- **Responsive Design**: Adaptable a diferentes tamaños de pantalla
- **Loading States**: Indicadores visuales durante el procesamiento
- **Error Handling**: Manejo y visualización de errores
- **Enter Key Support**: Envío de preguntas con Enter

## 🔒 Seguridad

- Las credenciales se manejan via variables de entorno
- Validación de entrada en el backend
- Rate limiting implícito via SAP AI Core
- CORS habilitado para desarrollo local

## 🐛 Resolución de Problemas

### Error: "AI processing failed"
- Verifica que las variables de entorno estén configuradas correctamente
- Confirma que tienes acceso a SAP AI Core
- Revisa los logs del servidor para más detalles

### Error: "Service Unavailable"
- Verifica la conectividad con SAP AI Core
- Confirma que el resource group esté activo
- Revisa el estado del deployment del modelo

### Frontend no carga
- Confirma que el servidor esté ejecutándose en el puerto 4004
- Verifica que no haya errores en la consola del navegador

## 📚 Referencias

- [SAP CAP Documentation](https://cap.cloud.sap/docs/)
- [SAP AI SDK for JavaScript](https://sap.github.io/ai-sdk/docs/js/getting-started)
- [SAP AI Core Documentation](https://help.sap.com/docs/AI_CORE)

## 🤝 Contribución

Este es un proyecto de demostración. Para contribuir:

1. Fork el repositorio
2. Crea una branch para tu feature
3. Realiza tus cambios
4. Submit un pull request

## 📄 Licencia

Este proyecto está bajo licencia UNLICENSED - ver el archivo package.json para más detalles.

---

**Nota**: Este es un proyecto de demostración para mostrar la integración entre SAP CAP y SAP AI SDK. Para uso en producción, considera implementar medidas adicionales de seguridad, logging, monitoring y escalabilidad.
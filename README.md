# 1. PRUEBA TÉCNICA DESARROLLO

## DESCRIPCIÓN DEL PROBLEMA

La empresa Celsia Internet S.A.S. requiere implementar una solución para su proceso de venta que permita la captura de información de los clientes y la contratación de uno o varios servicios del portafolio de internet.

El ejercicio consiste en implementar un backend y frontend con su configuración de despliegue en contenedores, para el registro y consulta de la información de los servicios contratados por los clientes, de acuerdo con el modelo de datos presentado a continuación.

## MODELO DE DATOS

Las tablas donde se almacena la información son las siguientes:

```console
CREATE TABLE clientes {
  identificacion VARCHAR(20) NOT NUL PRIMARY KEY,
  nombres VARCHAR(80) NOT NULL,
  apellidos VARCHAR(80) NOT NULL,
  tipoIdentificacion VARCHAR(2) NOT NULL,
  fechaNacimiento DATE NOT NULL,
  numeroCelular VARCHAR(20) NOT NULL,
  correoElectronico VARCHAR(80) NOT NULL
};


CREATE TABLE servicios {
  identificacion VARCHAR(20) NOT NUL,
  servicio VARCHAR(80) NOT NUL,
  fechaInicio DATE NOT NULL,
  ultimaFacturacion DATE NOT NULL,
  ultimoPago INTEGER NOT NUL DEFAULT 0,
  PRIMARY KEY (identificacion, servicio),
  CONSTRAINT servicios_FK1 FOREING KEY (identificacion) REFERENCES clientes(identificacion) ON UPDATE CASCADE ON DELETE NO ACTION
}
```

Para la prueba se deben crear las tablas en el motor de base de datos de su preferencia. Sobre esta base se deben almacenar los registros de los clientes y servicios que se especifican para la prueba.

## Puntos de la prueba

1.1. Implemente en el lenguaje de su preferencia, una `CRUD (Create, Read, Update and Delete)` que permita capturar y administrar la información de los clientes y sus servicios.

1.2. Se deben realizar las siguientes validaciones:

- No dejar datos en blanco.
- El tipo de dato, de acuerdo con la estructura en la base de datos.
- Si el registro ya existe muestre el mensaje `“El registro ya existe”`.

1.3. Implementar un formulario que permita registrar los servicios contratados de los clientes. `Nota: Tener en cuenta integridad referencial.`

1.4. Implementar un formulario para la consulta por número de identificación, la información de un cliente y los servicios que tiene contratados.

TIPS:

a. Para el campo `tipoIdentificacion` ingresar solamente los siguientes valores:

- CEDULA → CC
- TARJETA IDENTIDAD → TI
- CEDULA EXTRANJERIA → CE
- REGISTRO CIVIL → RC

b. Para el campo `servicio` ingresar solamente los siguientes tipos:

- Internet 200 MB
- Internet 400 MB
- Internet 600 MB
- Directv Go
- Paramount+
- Win+

c. Se evaluará el uso de patrones de diseño, en backend y frontend, la configuración de despliegue en contenedores y de la imagen a desplegar.

d. En el docker-compose se debe incluir la configuración del servicio de base de datos que haya escogido y una política de manejo de logs para cada servicio.

## ENTREGABLE

Se espera como resultado un clone del repositorio `https://github.com/celsia-internet/pruebas.git`, con la siguiente estructura.

```
api/
|-- docker-compose.yml
|-- Dockerfile
|-- README.md
|-- ...
webapp/
|-- docker-compose.yml
|-- Dockerfile
|-- README.md
|-- ...
```

El repositorio de la prueba deberá estar publicado en `github` de manera pública con el nombre `prueba-celsia-internet` usando git-flow por desarrollador.

```
main/
|-- develop
||-- <desarrollador>
```

# 2. PRUEBA TEORICO-PRACTICA

Para el desarrollo de la prueba teórica, tendrás que escribir tus respuestas en el archivo README.md del repositorio, tomando como referencia la aplicación desarrollada en la `PRUEBA TÉCNICA DE DESARROLLO`.

## PREGUNTAS

2.1. Elabore un diagrama de componentes de la aplicación. Debe cargar el archivo en la siguiente ruta del repositorio: `./assets/diagrama.png`

<img src="./assets/diagrama.png" alt="Diagrama" width="400">

2.2. ¿Qué mecanismos de seguridad incluirías en la aplicación para garantizar la protección del acceso a los datos?

- RTA:

Se puede incluir los siguientes mecanismos de seguridad:

- Uso de OAuth, JWT (JSON Web Tokens) para asegurar que solo los usuarios autorizados accedan a los datos.
- RBAC para asignar permisos específicos según el rol del usuario.
- Firewalls


  2.3. ¿Qué estrategia de escalabilidad recomendarías para la aplicación considerando que el crecimiento proyectado será de 1,000,000 de clientes por año?

- RTA:

- Añadir más servidores para distribuir la carga de trabajo.
- Dividir la aplicación en servicios más pequeños que pueden escalar independientemente.
- Utilizar balanceadores de carga.

  2.4. ¿Qué patrón o patrones de diseño recomendarías para esta solución y cómo se implementarían? (Justifique)

- RTA:

Recomendaría los siguientes patrones de diseño⁶:

- Singleton: Proporcionar un punto de acceso global a unica instancia en las configuraciones globales o conexiones a bases de datos.
- Observer: Para las dependencias uno a muchos entre objetos.

  2.5. ¿Qué recomendaciones harías para optimizar el manejo y la persistencia de datos de la aplicación, teniendo en cuenta que esta aplicación tiene una alta transaccionalidad?

- RTA:

- bases de datos NoSQL como MongoDB o Cassandra para manejar grandes volúmenes de datos y transacciones.
- Redis o Memcached para reducir la carga en la base de datos.
- Asegurarse de que las consultas a la base de datos estén optimizadas y utilizar índices adecuadamente.
- Replicación de datos y estrategias de backup para asegurar la disponibilidad y recuperación de datos en caso de fallos.

# 3. Redes

3.1. Explica la diferencia entre un router y un switch. ¿Cuándo usarías cada uno?

- El switch conecta varios equipos dentro de una misma red local (LAN), el router conecta diferentes redes entre si. 

- Usaria el router para tener conexion a internet y el swithc para una oficina o varias oficinas.

3.2. Describe las siete capas del modelo OSI y menciona brevemente la función principal de cada una

1. **Capa Física**: Transmite a través de un medio físico (ejemplo: cables, ondas).
2. **Capa de Enlace de Datos**: Proporciona transferencia libre de errores entre nodos conectados directamente.
3. **Capa de Red**: Ayuda a encontrar la ruta que los datos deben seguir para lelgar sin errores.
4. **Capa de Transporte**: Permite transferencia de datos completa y sin errores entre  dispositivos.
5. **Capa de Sesión**: Gestiona y termina las conexiones entre aplicativos.
6. **Capa de Presentación**: Traduce los datos entre el formato de la red y el formato de los aplicativos.
7. **Capa de Aplicación**: Proporciona servicios de red a los aplicativos.

3.3. Explica las diferencias entre los protocolos TCP y UDP. Dar un ejemplo de cuándo usarías cada uno?

- TCP: Para conexiones donde los datos deben ser confiables como transferencia de archivos o en webs de bancos, etc.
- UDP: Para conexiones donde la velocidad es mas importante, como youtube o juegos o streaming.


3.4. ¿Qué es una máscara de subred y cómo se utiliza para dividir una red en subredes más pequeñas?

Es una dividision a las direcciónes IP en una parte de red y una parte de host. 

La dirección IP 192.168.1.0 y máscara de subred 255.255.255.0, se divide en subredes más pequeñas cambiando la máscara de subred a algo como 255.255.255.128, para tener dos subredes con 126 hosts cada una.

3.5. ¿Puedes mencionar algunos protocolos de enrutamiento dinámico y explicar brevemente cómo funcionan?

Solo conozco el RIP y OSPF, que son similares, el RIP se usa en redes pequelas porque usa el conteo de saltos para determinar la mejor ruta, el OSPF usa algoritmos entre las subredes y se usa en redes mas grandes.


# 4. Gestión de Proyectos

4.1. ¿En qué grupos de procesos de dirección de proyectos es creado un presupuesto detallado del proyecto?

4.2. ¿En qué grupo de procesos de la dirección de proyectos es creada el acta de constitución del proyecto?

4.3. El equipo de proyecto acaba de completar el primer cronograma y presupuesto del proyecto. La próxima cosa a hacer es:********\_********

4.4. Un primer cronograma del proyecto puede ser creado solamente después de crear: **********\_\_\_\_**********

4.5. Una persona que debe estar al mando durante la planificación de la gestión del proyecto es:************\_\_************

4.6. ¿Cuál de son las entradas del grupo de procesos de inicio de un proyecto?

4.7. El patrocinador del proyecto acaba de aprobar el acta de constitución del proyecto, ¿cuál es la próxima cosa a hacer?

4.8. Acaban de ser establecidas las restricciones de alto nivel del cronograma del proyecto. ¿En qué grupo de procesos de dirección de proyectos se encuentra?

4.9. ¿Qué grupos de procesos deben ser incluidos en cada proyecto?

4.10. ¿Qué grupo de procesos de la dirección de proyecto necesita normalmente el mayor tiempo y número de recursos?

# 5. Caso práctico

Celsia internet en su proceso de expansión, se ha fijado como meta un crecimiento para los proximos 5 años donde se espera tener un millon de clientes. Para el que el proceso de facturación y recaudo sea efectivo, se requiere que el sistema de liquidación mensual de procese en los tiempos de corte establecidos de acuerdo con los ciclos de facturación definidos, los servicios que han sido prestados a sus clientes y las novedades reportadas en cada periodo. Que estrategias implementaría en el desarrollo de los componentes de liquidación y facturación masiva de servicios por ciclo y el recaudo de los pagos de las factura, buscando que el sistema sea robusto, escalable, resiliente, confiable y mantenible en el tiempo, ademas de la seguridad de la infomración y el tratamiento de los datos personales de los clientes.

Describa o diseñe las estrategias que incluiría para dar solución a los requerimientos solicitados en la implementación de los componentes descritos (Justifique la priorización de ciertos atributos sobre otros atributos de calidad en la propuesta de solución).

### Por último, y no menos importante, te deseamos mucha suerte y esperamos que disfrutes haciendo la prueba. El objetivo es evaluar tu conocimiento, capacidad de adaptabilidad y habilidad para resolver problemas.

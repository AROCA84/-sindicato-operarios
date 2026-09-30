export type Category = "Manutención y Carretillas" | "Elevación y Plataformas" | "Grúas y Equipos de Elevación" | "Maquinaria y Movimiento de Tierras" | "Logística y Almacén" | "Prevención de Riesgos Laborales" | "Manipulación y Seguridad";

export type Course = { id: string; title: string; description: string; category: Category; image: string };
export const categories: Category[] = ["Manutención y Carretillas", "Elevación y Plataformas", "Grúas y Equipos de Elevación", "Maquinaria y Movimiento de Tierras", "Logística y Almacén", "Prevención de Riesgos Laborales", "Manipulación y Seguridad"];

export type Lesson = { title: string; intro: string; points: string[] };
export type Module = { id: string; title: string; lesson: Lesson };

const M = (id: string, title: string, lesson: string, intro: string, points: string[]): Module => ({ id, title, lesson: { title: lesson, intro, points } });

const temarios: Record<string, Module[]> = {
  carretillero: [
    M("1", "Módulo 1: La carretilla elevadora", "Tipos, componentes y capacidades", "Conoce las carretillas frontales y retráctiles, sus partes y la información esencial de la placa de características.", ["Carretilla frontal y retráctil: diferencias y usos.", "Mástil, horquillas, contrapeso, ruedas y sistemas de seguridad.", "Capacidad nominal, centro de carga y diagrama de cargas.", "Mandos, asiento, cinturón y documentación del equipo."]),
    M("2", "Módulo 2: Seguridad y PRL", "Riesgos y prevención", "La operación segura empieza antes de arrancar: identifica riesgos y aplica las medidas preventivas.", ["Ley 31/1995 de PRL y obligaciones del operador.", "EPI y señalización de circulación.", "Atropellos, atrapamientos, vuelcos y caída de cargas.", "Revisión preoperacional y comunicación de averías."]),
    M("3", "Módulo 3: Manejo y estabilidad", "Carga, circulación y maniobras", "Aprende los principios de estabilidad y las técnicas básicas para recoger, transportar y depositar cargas.", ["Triángulo de estabilidad y centro de gravedad.", "Recogida y transporte de cargas bajas y estabilizadas.", "Rampas, pendientes, giros, visibilidad y marcha atrás.", "Apilado, desapilado y trabajo en estanterías."]),
    M("4", "Módulo 4: Mantenimiento y emergencias", "Revisión, estacionamiento y actuación ante incidencias", "Una revisión correcta y una actuación ordenada reducen el riesgo de accidentes.", ["Checklist diario: frenos, dirección, ruedas, mástil, horquillas y fugas.", "Baterías, repostaje y mantenimiento básico.", "Estacionamiento seguro y retirada de llave.", "Actuación ante vuelco, avería, caída de carga o emergencia."]),
  ],
  pemp: [
    M("1", "Módulo 1: Tipos de PEMP", "Plataformas de tijera y brazo", "Conoce los tipos de plataformas elevadoras y sus elementos principales.", ["PEMP de tijera, articulada y telescópica.", "Cesta, mástil/brazo, estabilizadores y controles.", "Capacidad de plataforma y limitaciones del fabricante.", "Manual, marcado y señalización del equipo."]),
    M("2", "Módulo 2: Trabajo seguro en altura", "Estabilidad, terreno y EPI", "La estabilidad y la protección contra caídas son esenciales durante el trabajo en altura.", ["Inspección del terreno y obstáculos.", "Estabilizadores y condiciones de viento.", "Arnés y punto de anclaje cuando proceda.", "Distancias de seguridad y riesgos eléctricos."]),
    M("3", "Módulo 3: Operación", "Mandos, desplazamiento y posicionamiento", "Practica mentalmente una secuencia segura desde la inspección hasta el posicionamiento.", ["Prueba de controles y revisión previa.", "Desplazamiento con plataforma según instrucciones del fabricante.", "Posicionamiento y trabajo cerca de estructuras.", "Carga máxima y prohibición de aumentar la altura con medios improvisados."]),
    M("4", "Módulo 4: Emergencias y mantenimiento", "Descenso de emergencia y conservación", "Conoce qué hacer ante un fallo y cómo mantener la máquina en condiciones seguras.", ["Sistemas de descenso y rescate.", "Comunicación de averías.", "Baterías, hidráulica, ruedas y elementos de seguridad.", "Retirada del servicio ante defectos graves."]),
  ],
  "puente-grua": [
    M("1", "Módulo 1: Puente grúa y polipasto", "Componentes y funcionamiento", "Identifica puente, carro, polipasto, gancho, mando y dispositivos de seguridad.", ["Puente, carro y mecanismos de elevación.", "Polipasto, cable/cadena y gancho.", "Limitador de carga y parada de emergencia.", "Capacidad y documentación del equipo."]),
    M("2", "Módulo 2: Eslingado y accesorios", "Preparación de la carga", "Una elevación segura depende de seleccionar y utilizar correctamente los accesorios.", ["Eslingas textiles, cadenas y accesorios.", "Inspección y retirada de eslingas dañadas.", "Centro de gravedad y ángulos de ramales.", "Protección de aristas y aseguramiento de la carga."]),
    M("3", "Módulo 3: Maniobras y señalización", "Izado y desplazamiento", "Realiza las maniobras de forma suave, controlada y coordinada con el señalista.", ["Señales y comunicación con el señalista.", "Elevación de prueba y desplazamiento controlado.", "Evitar balanceos y movimientos bruscos.", "Prohibición de pasar cargas sobre personas."]),
    M("4", "Módulo 4: Seguridad y mantenimiento", "Inspección y emergencias", "La prevención incluye revisar el equipo y detener la operación ante anomalías.", ["Revisión de ganchos, cables, frenos y mandos.", "Sobrecargas y riesgos de caída.", "Estacionamiento y desconexión.", "Actuación ante averías y emergencia."]),
  ],
  transpaleta: [
    M("1", "Módulo 1: Transpaleta manual y eléctrica", "Componentes y usos", "Conoce las diferencias entre transpaleta manual y eléctrica y sus usos habituales.", ["Horquillas, timón, ruedas y capacidad.", "Batería y mandos en equipos eléctricos.", "Tipos de palet y compatibilidad.", "Limitaciones de uso."]),
    M("2", "Módulo 2: Manipulación segura", "Carga y estabilidad", "Aprende a introducir correctamente las horquillas y transportar cargas estables.", ["Estado y distribución de la carga.", "Centro de gravedad y capacidad nominal.", "Cargas aseguradas y visibilidad.", "Prohibiciones y usos no previstos."]),
    M("3", "Módulo 3: Circulación", "Almacén, rampas y peatones", "La circulación debe adaptarse al entorno y priorizar la seguridad de las personas.", ["Velocidad y distancia de seguridad.", "Rampas y orientación de la carga.", "Cruces, puertas y zonas de peatones.", "Giros y visibilidad."]),
    M("4", "Módulo 4: Revisiones y batería", "Mantenimiento básico", "Revisa el equipo antes de usarlo y conoce las precauciones básicas de carga.", ["Ruedas, freno, timón y horquillas.", "Batería y cargador.", "Detección y comunicación de anomalías.", "Estacionamiento seguro."]),
  ],
  apilador: [
    M("1", "Módulo 1: Apilador eléctrico", "Tipos, mástil y mandos", "Conoce el apilador, su mástil, horquillas, plataforma y controles.", ["Apilador con conductor acompañante o plataforma.", "Mástil, horquillas y sistemas de elevación.", "Capacidad y diagrama de cargas.", "Mandos y dispositivos de seguridad."]),
    M("2", "Módulo 2: Estabilidad y carga", "Elevación y almacenamiento", "El apilado requiere controlar centro de gravedad, altura y capacidad.", ["Centro de gravedad y estabilidad.", "Recogida y depósito de palets.", "Altura de elevación y capacidad residual.", "Estanterías y estado del palet."]),
    M("3", "Módulo 3: Circulación", "Maniobras en almacén", "Circula de forma segura en pasillos, cruces y zonas compartidas.", ["Velocidad y visibilidad.", "Cruces y peatones.", "Rampas y pendientes.", "Marcha atrás y giros."]),
    M("4", "Módulo 4: Revisión y mantenimiento", "Inspección y estacionamiento", "La revisión diaria permite detectar defectos antes de iniciar el trabajo.", ["Frenos, dirección, ruedas y elevación.", "Batería y cargador.", "Averías y retirada del servicio.", "Estacionamiento y desconexión."]),
  ],
  "camion-pluma": [
    M("1", "Módulo 1: Grúa autocargable", "Componentes y capacidad", "Conoce la grúa sobre camión y la información necesaria para trabajar con seguridad.", ["Brazo, pluma, gancho y estabilizadores.", "Tabla o diagrama de cargas.", "Radio de trabajo y alcance.", "Documentación e inspección."]),
    M("2", "Módulo 2: Estabilización", "Terreno y estabilizadores", "La estabilidad depende del terreno, la configuración y el uso correcto de estabilizadores.", ["Nivelación del vehículo.", "Apoyos y resistencia del terreno.", "Configuración de estabilizadores.", "Zonas de exclusión y riesgos de vuelco."]),
    M("3", "Módulo 3: Izado", "Eslingado y maniobras", "Planifica la maniobra antes de elevar y evita sobrecargas y movimientos bruscos.", ["Peso, centro de gravedad y accesorios.", "Señalista y comunicación.", "Elevación y descenso progresivos.", "Prohibición de transportar personas con la carga."]),
    M("4", "Módulo 4: Seguridad", "Inspección y emergencias", "Una operación segura incluye revisar equipo, entorno y accesorios.", ["Ganchos, cables, hidráulica y mandos.", "Viento y condiciones meteorológicas.", "Averías y parada segura.", "Mantenimiento y comunicación de defectos."]),
  ],
  dumper: [
    M("1", "Módulo 1: Dúmper", "Tipos y componentes", "Identifica el equipo, sus controles y sus limitaciones de uso en obra.", ["Dúmper rígido y articulado.", "Caja, volquete, dirección y transmisión.", "Capacidad y distribución de carga.", "Mandos y señalización."]),
    M("2", "Módulo 2: Circulación en obra", "Pendientes y entorno", "La obra presenta riesgos cambiantes que requieren adaptar velocidad y recorrido.", ["Pendientes y terrenos irregulares.", "Peatones y otros equipos móviles.", "Visibilidad y maniobras.", "Señalización y zonas de exclusión."]),
    M("3", "Módulo 3: Carga y descarga", "Estabilidad durante el volquete", "La carga debe mantenerse estable y la descarga debe realizarse en un lugar seguro.", ["Carga uniforme y capacidad máxima.", "Riesgo de vuelco durante el volquete.", "Distancia a bordes y zanjas.", "Terreno firme durante la descarga."]),
    M("4", "Módulo 4: Revisión", "Mantenimiento y emergencias", "Las revisiones previas y el estacionamiento seguro son obligatorios en la práctica profesional.", ["Frenos, dirección, neumáticos y niveles.", "Alarmas y dispositivos de seguridad.", "Comunicación de averías.", "Estacionamiento y parada segura."]),
  ],
  retropala: [
    M("1", "Módulo 1: Retropala y pala cargadora", "Componentes e implementos", "Conoce la máquina mixta, sus implementos y sus aplicaciones.", ["Cazo frontal y brazo retro.", "Estabilizadores y controles.", "Implementos y acoplamientos.", "Capacidad y limitaciones."]),
    M("2", "Módulo 2: Excavación segura", "Terreno, servicios y estabilidad", "Antes de excavar hay que conocer el terreno y los posibles servicios enterrados.", ["Inspección del terreno.", "Taludes, zanjas y riesgo de desprendimiento.", "Servicios enterrados y señalización.", "Estabilidad de la máquina."]),
    M("3", "Módulo 3: Carga y movimiento", "Pala, giro y transporte", "Realiza movimientos suaves manteniendo control del implemento y del entorno.", ["Carga de materiales.", "Giro con implementos y zona de seguridad.", "Transporte de materiales.", "Peatones y señalista."]),
    M("4", "Módulo 4: Revisión", "Mantenimiento y estacionamiento", "La inspección diaria evita fallos y accidentes.", ["Hidráulica, neumáticos, frenos y niveles.", "Pasadores y acoplamientos.", "Detección de fugas y anomalías.", "Estacionamiento con implementos apoyados."]),
  ],
  telescopica: [
    M("1", "Módulo 1: Manipuladora telescópica", "Equipo e implementos", "Conoce el brazo telescópico, sus implementos y la información de capacidad.", ["Brazo telescópico y horquillas.", "Cazos y otros implementos.", "Tabla de cargas y alcance.", "Mandos y sistemas de seguridad."]),
    M("2", "Módulo 2: Estabilidad", "Carga, alcance y terreno", "La capacidad cambia con el alcance y la configuración del equipo.", ["Centro de gravedad y estabilidad.", "Carga máxima según alcance.", "Terreno y pendientes.", "Estabilizadores cuando proceda."]),
    M("3", "Módulo 3: Manejo", "Carga, descarga y circulación", "Planifica cada maniobra teniendo en cuenta visibilidad y entorno.", ["Recogida de palets y materiales.", "Transporte con carga baja y estable.", "Circulación en obra.", "Trabajo cerca de personas y obstáculos."]),
    M("4", "Módulo 4: Revisión", "Mantenimiento y emergencias", "La inspección y el mantenimiento son parte esencial de la operación.", ["Neumáticos, hidráulica, frenos y dirección.", "Implementos y acoplamientos.", "Averías y parada segura.", "Actuación ante pérdida de estabilidad."]),
  ],
  "prl-almacen": [
    M("1", "Módulo 1: Riesgos del almacén", "Identificación y prevención", "Aprende a reconocer los riesgos más frecuentes en almacenes y centros logísticos.", ["Caídas al mismo nivel y golpes.", "Atropellos y circulación de equipos.", "Caída de objetos y estanterías.", "Orden y limpieza."]),
    M("2", "Módulo 2: Manipulación y almacenamiento", "Buenas prácticas", "La organización del almacén reduce incidentes y mejora el trabajo seguro.", ["Apilado y estabilidad.", "Pasillos y zonas de paso.", "Carga y descarga.", "Señalización y zonas restringidas."]),
    M("3", "Módulo 3: EPI y emergencias", "Protección del trabajador", "Conoce los EPI y las pautas de actuación ante emergencias.", ["Calzado, chaleco, guantes y protección adecuada al riesgo.", "Incendios y evacuación.", "Accidentes y comunicación.", "Primeras actuaciones sin asumir riesgos."]),
    M("4", "Módulo 4: Ergonomía", "Posturas y organización", "Una buena organización también previene sobreesfuerzos y trastornos musculoesqueléticos.", ["Posturas de trabajo.", "Empuje y transporte.", "Pausas y organización de tareas.", "Comunicación de riesgos."]),
  ],
  "manipulacion-cargas": [
    M("1", "Módulo 1: Riesgos ergonómicos", "Peso, postura y frecuencia", "Identifica los factores que aumentan el riesgo durante la manipulación manual.", ["Peso, distancia y frecuencia.", "Posturas forzadas.", "Giros y movimientos repetitivos.", "Características del entorno."]),
    M("2", "Módulo 2: Levantamiento", "Técnica segura", "Aprende una secuencia de levantamiento que reduzca el esfuerzo innecesario.", ["Planificar el movimiento.", "Acercar la carga al cuerpo.", "Flexión controlada de piernas.", "Evitar giros bruscos con carga."]),
    M("3", "Módulo 3: Transporte y trabajo en equipo", "Mover cargas con seguridad", "No todas las cargas deben levantarse individualmente.", ["Uso de ayudas mecánicas.", "Transporte y visibilidad.", "Coordinación entre trabajadores.", "Empuje frente a tracción cuando proceda."]),
    M("4", "Módulo 4: Prevención", "Organización y hábitos", "La prevención combina técnica, organización y adaptación de la tarea.", ["Evaluación del riesgo.", "Alternancia de tareas.", "Orden y accesibilidad.", "Comunicación de molestias y riesgos."]),
  ],
  "gestion-almacen": [
    M("1", "Módulo 1: Organización del almacén", "Zonas y flujo de materiales", "Conoce cómo organizar espacios y recorridos para trabajar con eficiencia y seguridad.", ["Recepción, almacenamiento y expedición.", "Pasillos y zonas de circulación.", "Ubicaciones y señalización.", "Flujo de mercancías."]),
    M("2", "Módulo 2: Stock e inventario", "Control de existencias", "Aprende los principios básicos del control de stock.", ["Entradas y salidas.", "Inventario y recuento.", "Rotación y trazabilidad.", "Diferencias y ajustes."]),
    M("3", "Módulo 3: Preparación de pedidos", "Picking y expedición", "Una preparación ordenada reduce errores y riesgos.", ["Picking y ubicación.", "Comprobación de referencias y cantidades.", "Embalaje y etiquetado.", "Expedición y documentación."]),
    M("4", "Módulo 4: Seguridad logística", "Equipos, cargas y prevención", "La gestión del almacén debe integrar la seguridad de personas y mercancías.", ["Circulación de carretillas y peatones.", "Estabilidad de cargas y estanterías.", "PRL y EPI.", "Incidencias, daños y comunicación."]),
  ],
};

export function getCourse(id: string): Course | undefined { return courses.find((c) => c.id === id); }
export function getTemario(course: Course): Module[] { return temarios[course.id] ?? []; }

export const courses: Course[] = [
  { id: "carretillero", title: "Operario de Carretillas Elevadoras, Frontales y Retráctiles", description: "Aprende a manejar la carretilla elevadora con seguridad: estabilidad, carga y circulación.", category: "Manutención y Carretillas", image: "/cursos/carretilla-elevadora.png" },
  { id: "pemp", title: "Curso de Plataformas Elevadoras Móviles (PEMP)", description: "Trabajo en altura seguro con plataformas de tijera y de brazo articulado.", category: "Elevación y Plataformas", image: "/cursos/pemp.png" },
  { id: "puente-grua", title: "Curso de Puente Grúa y Polipasto", description: "Operación de puentes grúa y polipastos: eslingado, señalización y maniobras.", category: "Grúas y Equipos de Elevación", image: "/cursos/puente-grua.png" },
  { id: "transpaleta", title: "Curso de Transpaleta Manual y Eléctrica", description: "Uso correcto de transpaletas manuales y eléctricas en almacén y logística.", category: "Manutención y Carretillas", image: "/cursos/transpaleta.png" },
  { id: "apilador", title: "Curso de Apilador Eléctrico", description: "Manejo del apilador eléctrico para estibar y desestibar en estanterías.", category: "Manutención y Carretillas", image: "/cursos/apilador.png" },
  { id: "camion-pluma", title: "Curso de Camión Pluma / Grúa Autocargable", description: "Grúa autocargable sobre camión: cargas, estabilizadores y seguridad.", category: "Grúas y Equipos de Elevación", image: "/cursos/camion-pluma.png" },
  { id: "dumper", title: "Curso de Dúmper y Movimiento de Tierras", description: "Conducción de dúmper y fundamentos del movimiento de tierras en obra.", category: "Maquinaria y Movimiento de Tierras", image: "/cursos/dumper.png" },
  { id: "retropala", title: "Curso de Retropala y Pala Cargadora", description: "Manejo de retroexcavadora mixta y pala cargadora: excavación y carga.", category: "Maquinaria y Movimiento de Tierras", image: "/cursos/retropala.png" },
  { id: "telescopica", title: "Curso de Carretilla Telescópica (Manitou)", description: "Operación de la manipuladora telescópica en obra y logística agrícola.", category: "Manutención y Carretillas", image: "/cursos/telescopica.png" },
  { id: "prl-almacen", title: "Curso de Prevención de Riesgos Laborales (PRL) en Almacén", description: "Prevención de riesgos y buenas prácticas de seguridad en el almacén.", category: "Prevención de Riesgos Laborales", image: "/cursos/prl-almacen.png" },
  { id: "manipulacion-cargas", title: "Curso de Manipulación Manual de Cargas", description: "Técnicas de levantamiento y posturas seguras para evitar lesiones.", category: "Manipulación y Seguridad", image: "/cursos/manipulacion-cargas.png" },
  { id: "gestion-almacen", title: "Curso de Gestión de Almacén y Stock", description: "Organización del almacén, control de stock e inventario eficiente.", category: "Logística y Almacén", image: "/cursos/gestion-almacen.png" },
];

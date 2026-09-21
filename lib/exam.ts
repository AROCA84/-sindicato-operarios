import type { Course } from "./courses";

export type ExamQuestion = {
  q: string;
  options: [string, string, string, string];
  /** Index (0-3) of the correct option */
  answer: number;
};

export const PASS_MARK = 15;
export const TOTAL_QUESTIONS = 20;

/** General PRL / safety questions applicable to every course. */
const generalQuestions: ExamQuestion[] = [
  {
    q: "¿Qué ley regula la Prevención de Riesgos Laborales en España?",
    options: [
      "Ley 31/1995 de Prevención de Riesgos Laborales",
      "Ley 7/2007 del Estatuto Básico",
      "Real Decreto 1215/1997 únicamente",
      "Ley 40/2015 de Régimen Jurídico",
    ],
    answer: 0,
  },
  {
    q: "¿Qué significa el marcado CE en una máquina?",
    options: [
      "Que ha sido fabricada en España",
      "Que cumple la normativa de seguridad europea",
      "Que es de segunda mano",
      "Que no necesita mantenimiento",
    ],
    answer: 1,
  },
  {
    q: "¿Cuándo debe realizarse la revisión preoperacional del equipo?",
    options: [
      "Una vez al mes",
      "Solo cuando falla",
      "Antes de cada turno de trabajo",
      "Al finalizar la jornada",
    ],
    answer: 2,
  },
  {
    q: "Si detectas una avería o anomalía en la máquina, debes:",
    options: [
      "Seguir trabajando con cuidado",
      "Repararla tú mismo aunque no seas técnico",
      "Ignorarla si es pequeña",
      "Comunicarla al responsable y no utilizar el equipo",
    ],
    answer: 3,
  },
  {
    q: "¿Cuál es un Equipo de Protección Individual (EPI) básico en trabajos con maquinaria?",
    options: [
      "Calzado de seguridad",
      "Gafas de sol",
      "Guantes de lana",
      "Ropa deportiva",
    ],
    answer: 0,
  },
  {
    q: "El chaleco reflectante de alta visibilidad sirve principalmente para:",
    options: [
      "Abrigar al operario",
      "Que el operario sea visible para otros vehículos y peatones",
      "Identificar el cargo del trabajador",
      "Cumplir con la moda laboral",
    ],
    answer: 1,
  },
  {
    q: "En una zona con circulación de peatones y máquinas, la velocidad debe ser:",
    options: [
      "La máxima posible para acabar antes",
      "Indiferente si hay poca gente",
      "Reducida y adaptada a la visibilidad y el entorno",
      "Siempre superior a 20 km/h",
    ],
    answer: 2,
  },
  {
    q: "¿Quién puede manejar una máquina de trabajo en la empresa?",
    options: [
      "Cualquier trabajador disponible",
      "Solo el personal de mantenimiento",
      "Quien tenga más antigüedad",
      "Personal formado y autorizado para ese equipo",
    ],
    answer: 3,
  },
  {
    q: "¿Qué información fundamental aparece en la placa de características?",
    options: [
      "La capacidad nominal de carga del equipo",
      "El nombre del último operario",
      "El precio de la máquina",
      "La fecha de la próxima nómina",
    ],
    answer: 0,
  },
  {
    q: "La señalización de seguridad en el centro de trabajo tiene como objetivo:",
    options: [
      "Decorar las instalaciones",
      "Advertir de riesgos y ordenar la circulación",
      "Sustituir a los EPI",
      "Aumentar la velocidad de trabajo",
    ],
    answer: 1,
  },
];

/** Course-specific technical questions keyed by course id. */
const specificQuestions: Record<string, ExamQuestion[]> = {
  carretillero: [
    {
      q: "El triángulo de estabilidad de una carretilla contrapesada está formado por:",
      options: [
        "Las cuatro ruedas del equipo",
        "Las dos ruedas delanteras y el punto medio del eje trasero",
        "El mástil y las horquillas",
        "El asiento y el contrapeso",
      ],
      answer: 1,
    },
    {
      q: "Al circular sin carga, las horquillas deben ir:",
      options: [
        "Elevadas al máximo",
        "A la altura de los ojos",
        "Bajas y ligeramente inclinadas hacia atrás",
        "Totalmente horizontales y altas",
      ],
      answer: 2,
    },
    {
      q: "¿Cómo debe transportarse la carga con la carretilla?",
      options: [
        "Lo más elevada posible para verla mejor",
        "Inclinada hacia adelante",
        "Sobre una sola horquilla",
        "Lo más baja posible y estabilizada",
      ],
      answer: 3,
    },
    {
      q: "Al circular por una rampa CON carga, lo correcto es:",
      options: [
        "Subir y bajar con la carga orientada hacia la parte alta de la pendiente",
        "Bajar de frente a gran velocidad",
        "Girar en mitad de la rampa",
        "Llevar la carga hacia el lado del vacío",
      ],
      answer: 0,
    },
    {
      q: "El centro de carga estándar de referencia de una carretilla suele medirse a:",
      options: ["100 mm", "500 mm", "1000 mm", "1500 mm"],
      answer: 1,
    },
    {
      q: "Para elevar una carga en altura, el mástil debe estar:",
      options: [
        "Inclinado hacia adelante",
        "Inclinado al máximo hacia atrás",
        "En posición vertical",
        "Es indiferente",
      ],
      answer: 2,
    },
    {
      q: "Está terminantemente prohibido:",
      options: [
        "Usar el cinturón de seguridad",
        "Bajar las horquillas al aparcar",
        "Revisar la máquina antes del turno",
        "Elevar o transportar personas sobre las horquillas",
      ],
      answer: 3,
    },
    {
      q: "Si la carga impide la visibilidad frontal, el operario debe:",
      options: [
        "Circular marcha atrás con precaución",
        "Continuar de frente confiando en la memoria",
        "Elevar la carga por encima de la cabeza",
        "Pedir a un peatón que se suba a la carretilla",
      ],
      answer: 0,
    },
    {
      q: "Al aparcar la carretilla, el operario debe:",
      options: [
        "Dejar las horquillas elevadas",
        "Dejar el motor encendido",
        "Bajar las horquillas al suelo, frenar y retirar la llave",
        "Dejarla en la rampa",
      ],
      answer: 2,
    },
    {
      q: "¿Qué ocurre si se supera la capacidad nominal indicada en el diagrama de cargas?",
      options: [
        "La máquina rinde más",
        "No pasa nada si es por poco tiempo",
        "Mejora la tracción trasera",
        "Aumenta el riesgo de vuelco por pérdida de estabilidad",
      ],
      answer: 3,
    },
  ],
  pemp: [
    {
      q: "Los dos grandes tipos de Plataforma Elevadora Móvil de Personal (PEMP) son:",
      options: [
        "De tijera y de brazo articulado/telescópico",
        "De gasolina y de gasoil",
        "Manuales y automáticas",
        "Grandes y pequeñas",
      ],
      answer: 0,
    },
    {
      q: "En una PEMP de brazo articulado es obligatorio que el operario use:",
      options: [
        "Solo casco",
        "Arnés anticaídas amarrado al punto de anclaje de la cesta",
        "Guantes aislantes",
        "Gafas de sol",
      ],
      answer: 1,
    },
    {
      q: "Antes de elevar la plataforma se debe comprobar:",
      options: [
        "El color de la máquina",
        "La marca de los neumáticos",
        "La firmeza del terreno y la correcta colocación de estabilizadores",
        "El nivel de combustible del coche del operario",
      ],
      answer: 2,
    },
    {
      q: "Estando la cesta elevada, está prohibido:",
      options: [
        "Usar el arnés",
        "Comunicarse con el personal de tierra",
        "Revisar los mandos",
        "Salir de la cesta o usar escaleras dentro de ella para ganar altura",
      ],
      answer: 3,
    },
    {
      q: "La velocidad máxima del viento admisible para trabajar la indica:",
      options: [
        "El fabricante en el manual de la máquina",
        "El operario según su criterio",
        "La empresa de al lado",
        "No existe ese límite",
      ],
      answer: 0,
    },
    {
      q: "Los estabilizadores (gatos) de una PEMP sirven para:",
      options: [
        "Aumentar la velocidad",
        "Garantizar la estabilidad del conjunto durante el trabajo en altura",
        "Ahorrar combustible",
        "Nivelar la carga transportada",
      ],
      answer: 1,
    },
    {
      q: "Ante un fallo del sistema con la cesta en altura, se debe:",
      options: [
        "Saltar de la cesta",
        "Esperar sin avisar a nadie",
        "Utilizar el sistema de descenso de emergencia",
        "Balancear la plataforma",
      ],
      answer: 2,
    },
    {
      q: "El operario NUNCA debe:",
      options: [
        "Revisar la máquina antes de usarla",
        "Respetar la carga máxima de la cesta",
        "Usar los EPI adecuados",
        "Sobrepasar la carga máxima admisible de la plataforma",
      ],
      answer: 3,
    },
  ],
  "puente-grua": [
    {
      q: "Antes de izar una carga con el puente grúa se debe verificar:",
      options: [
        "El peso de la carga y el estado de las eslingas",
        "El color del gancho",
        "La temperatura de la nave",
        "La hora del día",
      ],
      answer: 0,
    },
    {
      q: "El eslingado incorrecto de una carga puede provocar:",
      options: [
        "Mayor rapidez",
        "El desprendimiento o caída de la carga",
        "Ahorro energético",
        "Mejor visibilidad",
      ],
      answer: 1,
    },
    {
      q: "El ángulo entre ramales de una eslinga, al aumentar, provoca que:",
      options: [
        "Disminuya la tensión en cada ramal",
        "No afecte a la carga",
        "Aumente la tensión soportada por cada ramal",
        "La carga pese menos",
      ],
      answer: 2,
    },
    {
      q: "Durante el desplazamiento de una carga suspendida está prohibido:",
      options: [
        "Avisar con señales",
        "Mirar el recorrido",
        "Usar el mando con las dos manos",
        "Pasar la carga por encima de personas",
      ],
      answer: 3,
    },
    {
      q: "El gancho del puente grúa debe disponer de:",
      options: [
        "Pestillo o seguro de cierre",
        "Pintura reflectante obligatoria",
        "Un motor propio",
        "Ruedas",
      ],
      answer: 0,
    },
    {
      q: "El operario que dirige la maniobra mediante gestos se denomina:",
      options: ["Capataz", "Señalista o guía", "Inspector", "Encargado de compras"],
      answer: 1,
    },
    {
      q: "Si una eslinga presenta cortes, deformaciones o hilos rotos, se debe:",
      options: [
        "Usarla solo para cargas ligeras",
        "Repararla con cinta adhesiva",
        "Retirarla del servicio inmediatamente",
        "Seguir usándola con cuidado",
      ],
      answer: 2,
    },
    {
      q: "Durante la elevación de la carga, los movimientos deben ser:",
      options: [
        "Bruscos para ganar tiempo",
        "Con tirones para asentar la carga",
        "Con giros rápidos",
        "Suaves y progresivos, evitando balanceos",
      ],
      answer: 3,
    },
  ],
  transpaleta: [
    {
      q: "La transpaleta manual sirve para:",
      options: [
        "Elevar cargas a gran altura",
        "Mover palets a ras de suelo en distancias cortas",
        "Excavar zanjas",
        "Trabajar en altura",
      ],
      answer: 1,
    },
    {
      q: "Al mover una transpaleta manual cargada, es preferible:",
      options: [
        "Empujarla de espaldas",
        "Cargarla por encima de su capacidad",
        "Tirar de ella con la carga detrás, tirando y no empujando en general",
        "Correr con ella",
      ],
      answer: 2,
    },
    {
      q: "Antes de introducir las horquillas en el palet se debe comprobar:",
      options: [
        "Que el palet esté en buen estado y bien apoyado",
        "El color del palet",
        "El fabricante del palet",
        "Nada, se introduce directamente",
      ],
      answer: 0,
    },
    {
      q: "Con la transpaleta eléctrica en una pendiente, la carga debe ir:",
      options: [
        "Hacia el lado del vacío",
        "Elevada al máximo",
        "Balanceándose",
        "Orientada hacia la parte alta de la pendiente",
      ],
      answer: 3,
    },
    {
      q: "La sobrecarga de una transpaleta por encima de su capacidad nominal:",
      options: [
        "Puede dañar el equipo y provocar accidentes",
        "Mejora su rendimiento",
        "Es recomendable si hay prisa",
        "Reduce el desgaste",
      ],
      answer: 0,
    },
    {
      q: "Al terminar de usar la transpaleta manual, las horquillas deben quedar:",
      options: [
        "Elevadas al máximo",
        "Bajadas para no ser un obstáculo ni riesgo de tropiezo",
        "A media altura",
        "Es indiferente",
      ],
      answer: 1,
    },
    {
      q: "Un riesgo típico al manejar transpaletas es:",
      options: [
        "Caída desde altura",
        "Radiación",
        "Atrapamiento o golpes en los pies con las ruedas",
        "Ahogamiento",
      ],
      answer: 2,
    },
    {
      q: "La transpaleta debe circular:",
      options: [
        "Por encima de otros palets",
        "Zigzagueando entre peatones",
        "A gran velocidad en curvas",
        "Por zonas despejadas y respetando los pasos señalizados",
      ],
      answer: 3,
    },
  ],
  apilador: [
    {
      q: "El apilador eléctrico está diseñado principalmente para:",
      options: [
        "Estibar y desestibar palets en estanterías",
        "Excavar",
        "Transportar personas",
        "Elevar cargas al aire libre en obra",
      ],
      answer: 0,
    },
    {
      q: "Antes de depositar una carga en una estantería se debe comprobar:",
      options: [
        "El color de la estantería",
        "La resistencia y el nivel del hueco de destino",
        "La marca del apilador",
        "La hora",
      ],
      answer: 1,
    },
    {
      q: "Al circular con el apilador, la carga debe ir:",
      options: [
        "Elevada al máximo",
        "Inclinada hacia adelante",
        "Baja y estabilizada",
        "Sobre una sola horquilla",
      ],
      answer: 2,
    },
    {
      q: "Con las baterías del apilador eléctrico se debe tener cuidado con:",
      options: [
        "El polvo únicamente",
        "El ruido del motor",
        "La velocidad de giro",
        "El riesgo eléctrico y los gases durante la carga",
      ],
      answer: 3,
    },
    {
      q: "Para estibar en altura correctamente, el mástil debe estar:",
      options: [
        "Vertical antes de elevar la carga",
        "Inclinado hacia adelante",
        "Girado 45 grados",
        "Bloqueado",
      ],
      answer: 0,
    },
    {
      q: "Si se supera la capacidad del apilador a la altura de trabajo:",
      options: [
        "No ocurre nada",
        "Aumenta el riesgo de vuelco y caída de la carga",
        "Mejora la estabilidad",
        "Se carga más rápido la batería",
      ],
      answer: 1,
    },
    {
      q: "La recarga de la batería debe realizarse en:",
      options: [
        "Cualquier pasillo de trabajo",
        "El muelle de carga con vehículos",
        "Una zona ventilada y habilitada para ello",
        "El vestuario",
      ],
      answer: 2,
    },
    {
      q: "Al finalizar el turno con el apilador, se debe:",
      options: [
        "Dejarlo con la carga elevada",
        "Dejar el mástil inclinado",
        "Aparcarlo en la rampa",
        "Bajar las horquillas, frenar y dejarlo en zona habilitada",
      ],
      answer: 3,
    },
  ],
  "camion-pluma": [
    {
      q: "Antes de operar la grúa autocargable (pluma) es imprescindible:",
      options: [
        "Desplegar y apoyar correctamente los estabilizadores",
        "Circular a gran velocidad",
        "Retirar los EPI",
        "Plegar los espejos",
      ],
      answer: 0,
    },
    {
      q: "Los estabilizadores de un camión pluma sirven para:",
      options: [
        "Frenar el camión",
        "Dar estabilidad y evitar el vuelco al izar cargas",
        "Aumentar la velocidad",
        "Decorar el vehículo",
      ],
      answer: 1,
    },
    {
      q: "A medida que se extiende el brazo de la pluma, la capacidad de carga:",
      options: [
        "Aumenta",
        "Se mantiene igual",
        "Disminuye",
        "Se duplica",
      ],
      answer: 2,
    },
    {
      q: "Durante el izado no se debe:",
      options: [
        "Usar eslingas homologadas",
        "Comprobar el peso de la carga",
        "Respetar el diagrama de cargas",
        "Situar personas bajo la carga suspendida",
      ],
      answer: 3,
    },
    {
      q: "El diagrama de cargas de la grúa indica:",
      options: [
        "La carga admisible según el alcance y el ángulo del brazo",
        "El consumo del camión",
        "La ruta a seguir",
        "El horario de trabajo",
      ],
      answer: 0,
    },
    {
      q: "Trabajar cerca de líneas eléctricas aéreas con la pluma exige:",
      options: [
        "Acercarse todo lo posible",
        "Respetar las distancias de seguridad establecidas",
        "Ignorar el riesgo si no llueve",
        "Tocar la línea para comprobar tensión",
      ],
      answer: 1,
    },
    {
      q: "El terreno donde se apoyan los estabilizadores debe ser:",
      options: [
        "Blando y con pendiente",
        "Irregular",
        "Firme y nivelado, usando placas de reparto si es necesario",
        "Es indiferente",
      ],
      answer: 2,
    },
    {
      q: "Los movimientos de la carga con la pluma deben ser:",
      options: [
        "Bruscos",
        "Con tirones",
        "Con giros rápidos",
        "Suaves y controlados para evitar balanceos",
      ],
      answer: 3,
    },
  ],
  dumper: [
    {
      q: "El dúmper se utiliza principalmente para:",
      options: [
        "Transportar y descargar materiales a granel en obra",
        "Elevar personas",
        "Trabajar en altura",
        "Almacenar palets",
      ],
      answer: 0,
    },
    {
      q: "Al circular por pendientes con el dúmper cargado:",
      options: [
        "Se debe girar bruscamente",
        "Se debe bajar de frente y a velocidad reducida, evitando giros bruscos",
        "Es mejor bajar marcha atrás a toda velocidad",
        "Se debe descargar en la propia pendiente",
      ],
      answer: 1,
    },
    {
      q: "Antes de bascular la tolva para descargar se debe comprobar:",
      options: [
        "La matrícula",
        "El color de la carga",
        "Que el terreno sea firme, nivelado y sin personas alrededor",
        "La hora",
      ],
      answer: 2,
    },
    {
      q: "En caso de vuelco con estructura de protección (ROPS) y cinturón, el operario debe:",
      options: [
        "Saltar del vehículo",
        "Soltarse el cinturón",
        "Asomarse fuera de la cabina",
        "Permanecer sujeto con el cinturón dentro de la estructura",
      ],
      answer: 3,
    },
    {
      q: "La estructura ROPS del dúmper protege frente a:",
      options: [
        "El vuelco del vehículo",
        "El ruido",
        "El polvo",
        "La lluvia",
      ],
      answer: 0,
    },
    {
      q: "Sobrecargar la tolva del dúmper por encima de su capacidad:",
      options: [
        "Mejora la tracción",
        "Compromete la estabilidad y la frenada, aumentando el riesgo",
        "Ahorra viajes sin riesgo",
        "Es obligatorio en obra",
      ],
      answer: 1,
    },
    {
      q: "Al descargar cerca del borde de un talud o zanja se debe:",
      options: [
        "Acercar al máximo las ruedas al borde",
        "Descargar en marcha",
        "Respetar la distancia de seguridad y usar topes",
        "Ignorar el borde",
      ],
      answer: 2,
    },
    {
      q: "El movimiento de tierras en obra exige coordinación con:",
      options: [
        "Nadie, se trabaja solo",
        "Solo el conductor",
        "El proveedor de combustible",
        "El resto de operarios y peatones mediante señalización",
      ],
      answer: 3,
    },
  ],
  retropala: [
    {
      q: "La retropala (retroexcavadora mixta) combina:",
      options: [
        "Una pala cargadora frontal y un brazo excavador trasero",
        "Dos plumas de elevación",
        "Una tijera y un brazo",
        "Dos tolvas de descarga",
      ],
      answer: 0,
    },
    {
      q: "Antes de excavar con el brazo trasero se deben apoyar:",
      options: [
        "Las ruedas delanteras únicamente",
        "Los estabilizadores para dar estabilidad",
        "El asiento del operario",
        "Los espejos",
      ],
      answer: 1,
    },
    {
      q: "Al trabajar cerca de zanjas, uno de los mayores riesgos es:",
      options: [
        "El exceso de luz",
        "El ruido de la radio",
        "El desprendimiento de tierras y el sepultamiento",
        "El aburrimiento",
      ],
      answer: 2,
    },
    {
      q: "Para desplazarse por vía o pista con la retropala, la pala cargadora debe ir:",
      options: [
        "Elevada al máximo",
        "Llena de material",
        "Descargando en marcha",
        "Baja y recogida para mejorar la estabilidad y visibilidad",
      ],
      answer: 3,
    },
    {
      q: "Antes de excavar es fundamental conocer:",
      options: [
        "La ubicación de servicios enterrados (agua, gas, electricidad)",
        "El color de la tierra",
        "La marca de la máquina",
        "La temperatura ambiente",
      ],
      answer: 0,
    },
    {
      q: "La estructura de protección de la cabina protege al operario frente a:",
      options: [
        "El viento",
        "Vuelcos y caída de objetos (ROPS/FOPS)",
        "El sol",
        "El polvo fino",
      ],
      answer: 1,
    },
    {
      q: "Está prohibido utilizar el cazo de la máquina para:",
      options: [
        "Excavar",
        "Cargar material",
        "Transportar o elevar personas",
        "Nivelar terreno",
      ],
      answer: 2,
    },
    {
      q: "Al finalizar el trabajo, la retropala debe quedar con:",
      options: [
        "El brazo elevado",
        "El motor encendido",
        "El cazo lleno",
        "Los cazos apoyados en el suelo, frenada y sin la llave",
      ],
      answer: 3,
    },
  ],
  telescopica: [
    {
      q: "La carretilla telescópica (Manitou) se caracteriza por:",
      options: [
        "Disponer de un brazo telescópico extensible",
        "No poder elevar cargas",
        "Ser exclusivamente eléctrica",
        "Trabajar solo bajo techo",
      ],
      answer: 0,
    },
    {
      q: "A medida que se extiende el brazo telescópico con carga:",
      options: [
        "Aumenta la capacidad admisible",
        "Disminuye la capacidad de carga y la estabilidad",
        "No cambia nada",
        "Se reduce el consumo",
      ],
      answer: 1,
    },
    {
      q: "Para elevar cargas a gran altura o alcance con la telescópica conviene:",
      options: [
        "No usar nunca los estabilizadores",
        "Extender el brazo lo máximo siempre",
        "Usar los estabilizadores cuando el equipo los tenga y el diagrama lo indique",
        "Cargar por encima de lo permitido",
      ],
      answer: 2,
    },
    {
      q: "El diagrama de cargas de la telescópica relaciona el peso admisible con:",
      options: [
        "El color del terreno",
        "La marca de los neumáticos",
        "La hora del día",
        "La altura y el alcance del brazo",
      ],
      answer: 3,
    },
    {
      q: "Al desplazarse, el brazo telescópico debe ir:",
      options: [
        "Recogido y bajo para mejorar la estabilidad",
        "Totalmente extendido",
        "Elevado al máximo",
        "Girado lateralmente",
      ],
      answer: 0,
    },
    {
      q: "Sobrepasar la carga indicada en el diagrama provoca:",
      options: [
        "Mayor productividad segura",
        "Riesgo de vuelco frontal o lateral",
        "Mejor tracción",
        "Ahorro de combustible",
      ],
      answer: 1,
    },
    {
      q: "El terreno para trabajar con la telescópica debe ser:",
      options: [
        "Blando y con pendiente pronunciada",
        "Irregular y con baches",
        "Firme y nivelado en la medida de lo posible",
        "Indiferente",
      ],
      answer: 2,
    },
    {
      q: "El uso de accesorios (cazo, horquillas, cesta) en la telescópica requiere:",
      options: [
        "Improvisar según la tarea",
        "No revisar el anclaje",
        "Usar cualquier accesorio de otra máquina",
        "Que estén homologados y correctamente acoplados",
      ],
      answer: 3,
    },
  ],
  "prl-almacen": [
    {
      q: "Uno de los riesgos más frecuentes en un almacén es:",
      options: [
        "Atropellos y golpes con carretillas y transpaletas",
        "Radiación solar intensa",
        "Corrimientos de tierra",
        "Oleaje",
      ],
      answer: 0,
    },
    {
      q: "La separación entre zonas de peatones y de circulación de máquinas debe estar:",
      options: [
        "Sin marcar",
        "Señalizada y delimitada claramente",
        "A criterio de cada trabajador",
        "Solo indicada verbalmente",
      ],
      answer: 1,
    },
    {
      q: "Para prevenir caídas de material desde las estanterías se debe:",
      options: [
        "Sobrecargar los niveles superiores",
        "Colocar lo más pesado arriba",
        "Respetar la carga máxima y colocar lo pesado en niveles bajos",
        "No fijar las estanterías",
      ],
      answer: 2,
    },
    {
      q: "El orden y la limpieza en el almacén sirven para:",
      options: [
        "Solo mejorar la estética",
        "Cumplir un capricho del encargado",
        "Ralentizar el trabajo",
        "Prevenir caídas, tropiezos y facilitar la evacuación",
      ],
      answer: 3,
    },
    {
      q: "Las vías de evacuación y salidas de emergencia deben estar:",
      options: [
        "Siempre libres de obstáculos y señalizadas",
        "Usadas como almacén temporal",
        "Cerradas con llave durante la jornada",
        "Bloqueadas con palets",
      ],
      answer: 0,
    },
    {
      q: "Ante un derrame de líquido en el suelo del almacén se debe:",
      options: [
        "Ignorarlo",
        "Señalizarlo y limpiarlo lo antes posible",
        "Esperar a que se seque solo",
        "Cubrirlo con un palet",
      ],
      answer: 1,
    },
    {
      q: "El plan de emergencia del almacén debe ser:",
      options: [
        "Secreto",
        "Conocido solo por el jefe",
        "Conocido por los trabajadores, con salidas y puntos de reunión claros",
        "Innecesario",
      ],
      answer: 2,
    },
    {
      q: "La iluminación adecuada en el almacén ayuda a:",
      options: [
        "Aumentar el consumo sin más",
        "Molestar al operario",
        "Nada relevante",
        "Reducir errores y accidentes al mejorar la visibilidad",
      ],
      answer: 3,
    },
  ],
  "manipulacion-cargas": [
    {
      q: "Al levantar una carga del suelo, la técnica correcta es:",
      options: [
        "Doblar las rodillas y mantener la espalda recta",
        "Doblar la espalda y estirar las piernas",
        "Girar el tronco mientras se levanta",
        "Levantar con los brazos totalmente estirados y de golpe",
      ],
      answer: 0,
    },
    {
      q: "La carga debe mantenerse durante el transporte:",
      options: [
        "Lo más alejada posible del cuerpo",
        "Pegada al cuerpo para reducir el esfuerzo en la espalda",
        "Por encima de la cabeza",
        "Apoyada en una sola mano",
      ],
      answer: 1,
    },
    {
      q: "Para cambiar de dirección con una carga es preferible:",
      options: [
        "Girar bruscamente la cintura",
        "Torsionar la columna",
        "Mover los pies en lugar de girar la columna",
        "Saltar con la carga",
      ],
      answer: 2,
    },
    {
      q: "Una lesión típica por manipulación manual incorrecta de cargas es:",
      options: [
        "Quemaduras",
        "Intoxicación",
        "Congelación",
        "Lesiones lumbares y de espalda",
      ],
      answer: 3,
    },
    {
      q: "Si una carga es demasiado pesada o voluminosa, lo correcto es:",
      options: [
        "Pedir ayuda o usar medios mecánicos auxiliares",
        "Levantarla igualmente a solas",
        "Arrastrarla con la espalda",
        "Dejarla caer",
      ],
      answer: 0,
    },
    {
      q: "Antes de levantar una carga se debe:",
      options: [
        "Cerrar los ojos",
        "Planificar el recorrido y asegurar un buen agarre y apoyo de pies",
        "Correr hacia ella",
        "Levantarla sin mirar",
      ],
      answer: 1,
    },
    {
      q: "El peso máximo recomendado en condiciones ideales para manipulación manual habitual ronda:",
      options: [
        "50 kg",
        "40 kg",
        "25 kg (menor para colectivos sensibles)",
        "5 kg",
      ],
      answer: 2,
    },
    {
      q: "Los EPI útiles en la manipulación manual de cargas incluyen:",
      options: [
        "Gafas de sol",
        "Auriculares de música",
        "Ropa amplia y suelta",
        "Calzado de seguridad y guantes con buen agarre",
      ],
      answer: 3,
    },
  ],
  "gestion-almacen": [
    {
      q: "El sistema FIFO en la gestión de stock significa:",
      options: [
        "Primero en entrar, primero en salir",
        "Último en entrar, primero en salir",
        "El más pesado sale primero",
        "El más caro sale primero",
      ],
      answer: 0,
    },
    {
      q: "El método FIFO es especialmente importante para productos:",
      options: [
        "Indestructibles",
        "Perecederos o con fecha de caducidad",
        "Sin valor",
        "Muy pesados únicamente",
      ],
      answer: 1,
    },
    {
      q: "El inventario permite fundamentalmente:",
      options: [
        "Aumentar el desorden",
        "Perder trazabilidad",
        "Conocer y controlar las existencias reales del almacén",
        "Eliminar la necesidad de estanterías",
      ],
      answer: 2,
    },
    {
      q: "El stock de seguridad sirve para:",
      options: [
        "Ocupar espacio",
        "Aumentar costes sin motivo",
        "Confundir al personal",
        "Evitar roturas de stock ante imprevistos de demanda o suministro",
      ],
      answer: 3,
    },
    {
      q: "Una buena codificación y etiquetado de ubicaciones permite:",
      options: [
        "Localizar la mercancía de forma rápida y precisa",
        "Perder tiempo",
        "Duplicar errores",
        "Ocultar los productos",
      ],
      answer: 0,
    },
    {
      q: "La rotación de existencias (índice de rotación) mide:",
      options: [
        "El color de los palets",
        "Cuántas veces se renueva el stock en un periodo",
        "El peso total del almacén",
        "El número de operarios",
      ],
      answer: 1,
    },
    {
      q: "El sistema LIFO consiste en:",
      options: [
        "Primero en entrar, primero en salir",
        "Salida por orden alfabético",
        "Último en entrar, primero en salir",
        "Salida aleatoria",
      ],
      answer: 2,
    },
    {
      q: "Una correcta gestión del almacén contribuye a:",
      options: [
        "Aumentar las roturas de stock",
        "Incrementar los errores de picking",
        "Elevar los costes logísticos",
        "Reducir costes y mejorar el servicio al cliente",
      ],
      answer: 3,
    },
  ],
};

/**
 * Deterministic shuffle so the exam order is stable per course (no hydration
 * mismatch) but varied between courses.
 */
function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Build the 20-question exam for a given course. */
export function getExam(course: Course): ExamQuestion[] {
  const specific = specificQuestions[course.id] ?? [];
  const seed = course.id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const combined = [...specific, ...generalQuestions];
  return seededShuffle(combined, seed).slice(0, TOTAL_QUESTIONS);
}

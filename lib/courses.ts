export type Category = "Manutención y Carretillas" | "Elevación y Plataformas" | "Grúas y Equipos de Elevación" | "Maquinaria y Movimiento de Tierras" | "Logística y Almacén" | "Prevención de Riesgos Laborales" | "Manipulación y Seguridad";

export type Course = { id: string; title: string; description: string; category: Category; image: string };
export const categories: Category[] = ["Manutención y Carretillas", "Elevación y Plataformas", "Grúas y Equipos de Elevación", "Maquinaria y Movimiento de Tierras", "Logística y Almacén", "Prevención de Riesgos Laborales", "Manipulación y Seguridad"];

export type LessonSection = { heading: string; text: string; bullets?: string[] };
export type Lesson = { title: string; intro: string; points: string[]; sections?: LessonSection[]; references?: string[] };
export type Module = { id: string; title: string; lesson: Lesson };

const M = (id: string, title: string, lesson: string, intro: string, points: string[]): Module => ({ id, title, lesson: { title: lesson, intro, points } });

const temarios: Record<string, Module[]> = {
  carretillero: [
    {
      id: "1",
      title: "Módulo 1: La carretilla elevadora",
      lesson: {
        title: "Tipos, componentes, capacidades y principios de funcionamiento",
        intro: "Este tema introduce la carretilla elevadora como equipo de manutención y explica los elementos que el operador debe identificar antes de utilizarla. El contenido se ha elaborado a partir de referencias técnicas profesionales del INSST y se ha redactado de forma original para el aula de Sindicato de Operarios.",
        points: [
          "Diferencias entre carretillas frontales contrapesadas y carretillas retráctiles.",
          "Mástil, horquillas, tablero portahorquillas, contrapeso, ruedas y puesto de conducción.",
          "Capacidad nominal, centro de carga, altura de elevación y diagramas de carga.",
          "Placa de características, manual del fabricante y dispositivos de seguridad."
        ],
        sections: [
          { heading: "1.1. ¿Qué es una carretilla elevadora?", text: "Es un equipo móvil destinado principalmente a transportar, empujar, tirar o elevar cargas. Para trabajar con seguridad no basta con conocer los mandos: hay que relacionar el tipo de máquina, el implemento, la carga, el entorno y las condiciones de trabajo. La configuración y las limitaciones concretas siempre deben comprobarse en la documentación del fabricante.", bullets: ["La carretilla debe utilizarse para las funciones previstas.", "La carga debe ser compatible con el equipo y estar preparada para su manipulación.", "El operador debe conocer las instrucciones de utilización antes de comenzar el trabajo."] },
          { heading: "1.2. Carretilla frontal y retráctil", text: "La frontal contrapesada utiliza un contrapeso trasero para compensar la carga situada delante del eje motriz. La retráctil está diseñada para trabajar especialmente en pasillos y almacenamiento en altura mediante el desplazamiento del mástil o del conjunto de carga. Aunque ambas son carretillas elevadoras, su comportamiento, radio de giro, visibilidad y forma de trabajo no son idénticos.", bullets: ["No se debe extrapolar el comportamiento de una máquina a otra.", "La configuración del mástil influye en estabilidad y capacidad.", "El operador debe recibir formación específica para el equipo que vaya a utilizar."] },
          { heading: "1.3. Elementos principales", text: "Antes de trabajar hay que saber localizar los componentes que intervienen directamente en la seguridad: mástil, horquillas, tablero, cadenas, cilindros, ruedas, dirección, frenos, asiento, cinturón, protección superior, contrapeso, mandos y dispositivos de señalización. Las horquillas y sus elementos de fijación requieren especial atención porque soportan directamente la carga.", bullets: ["No utilizar horquillas dobladas, fisuradas o con desgaste peligroso.", "Los dispositivos de protección no deben anularse ni modificarse.", "Cualquier anomalía debe comunicarse y, si afecta a la seguridad, impedir el uso del equipo."] },
          { heading: "1.4. Capacidad y centro de carga", text: "La capacidad de una carretilla no es una cifra que pueda aplicarse a cualquier situación. La carga máxima depende de la configuración del equipo, la altura y el centro de carga, entre otros factores indicados por el fabricante. A medida que cambian las condiciones de la carga también puede cambiar la capacidad admisible.", bullets: ["Consultar siempre la placa o diagrama de cargas.", "No superar la capacidad indicada para la configuración utilizada.", "Mantener la carga centrada y lo más próxima al respaldo posible cuando la operación lo permita."] },
          { heading: "1.5. Puesto de conducción y controles", text: "El operador debe identificar antes de iniciar la marcha los mandos de dirección, freno, acelerador o control de avance, elevación, inclinación, señal acústica, iluminación y parada o dispositivos de emergencia que incorpore la máquina. El asiento y los sistemas de retención deben utilizarse conforme a las instrucciones del fabricante.", bullets: ["Realizar una comprobación funcional antes de trabajar.", "Mantener las manos y los pies dentro de la zona prevista para el operador.", "No transportar personas en lugares no diseñados para ello."] }
        ],
        references: ["INSST · NTP 713: Carretillas elevadoras automotoras (I): conocimientos básicos para la prevención de riesgos.", "INSST · NTP 214: Carretillas elevadoras (referencia histórica sustituida por la serie NTP 713-715)."]
      }
    },
    {
      id: "2",
      title: "Módulo 2: Seguridad y PRL",
      lesson: {
        title: "Riesgos, medidas preventivas, circulación y protección",
        intro: "La mayor parte de los accidentes con carretillas se relaciona con la interacción entre máquina, carga, operador y entorno. Este tema desarrolla las medidas preventivas que deben aplicarse antes, durante y después de cada operación.",
        points: [
          "Atropellos, golpes, atrapamientos, vuelcos y caída o desplazamiento de cargas.",
          "Separación entre peatones y equipos móviles y control de zonas de visibilidad reducida.",
          "Uso de EPI adecuados al riesgo y mantenimiento de la zona de trabajo.",
          "Revisión previa, comunicación de defectos y prohibición de utilizar equipos inseguros."
        ],
        sections: [
          { heading: "2.1. Identificación de riesgos", text: "Antes de comenzar hay que observar el recorrido, la zona de carga y descarga, los cruces, puertas, rampas, estanterías, obstáculos, desniveles y presencia de peatones. También deben considerarse las características de la mercancía y cualquier condición que pueda modificar la estabilidad o la visibilidad.", bullets: ["Atropello o golpe a peatones.", "Caída de la carga o desplazamiento de la mercancía.", "Vuelco lateral o longitudinal.", "Atrapamiento contra estructuras, estanterías o vehículos."] },
          { heading: "2.2. Circulación segura", text: "La circulación debe adaptarse al entorno. La velocidad debe permitir detener la carretilla dentro del espacio visible y libre de obstáculos. En cruces o zonas con visibilidad limitada se deben aplicar las medidas establecidas por la organización, como señalización, espejos, reducción de velocidad o señal acústica cuando corresponda.", bullets: ["Mantener distancia de seguridad.", "Reducir la velocidad en curvas, cruces y zonas congestionadas.", "Evitar circular con la carga elevada.", "No adelantar ni maniobrar de forma que se ponga en peligro a otras personas."] },
          { heading: "2.3. Peatones y zonas compartidas", text: "Cuando peatones y carretillas comparten espacio debe existir una organización preventiva clara. Los recorridos, pasos, zonas de carga y zonas de exclusión deben estar señalizados y mantenerse libres. El operador no debe asumir que un peatón ha visto la carretilla.", bullets: ["Extremar la precaución en puertas y salidas.", "Comprobar los ángulos muertos antes de avanzar.", "Detenerse si la trayectoria no está despejada.", "Respetar las instrucciones internas de circulación."] },
          { heading: "2.4. EPI y comportamiento profesional", text: "Los equipos de protección dependen de los riesgos presentes en cada puesto. El calzado de seguridad, la ropa de trabajo y otros EPI deben seleccionarse conforme a la evaluación de riesgos. La ropa suelta, objetos que puedan engancharse y comportamientos como subir a la carga o utilizar el equipo de forma improvisada aumentan el riesgo.", bullets: ["Utilizar el EPI exigido para el puesto.", "Mantener el puesto de conducción ordenado.", "No realizar reparaciones para las que no se esté autorizado."] },
          { heading: "2.5. Comprobación antes de arrancar", text: "La inspección previa permite detectar defectos antes de que se conviertan en una situación peligrosa. Deben comprobarse, según el tipo de equipo y las instrucciones del fabricante, frenos, dirección, ruedas, horquillas, mástil, cadenas, sistemas hidráulicos, señalización, cinturón y dispositivos de seguridad.", bullets: ["Si existe un defecto que compromete la seguridad, no se debe utilizar la máquina.", "Comunicar la anomalía por el procedimiento establecido.", "No anular alarmas ni dispositivos de protección."] }
        ],
        references: ["INSST · NTP 714: Carretillas elevadoras automotoras (II): principales peligros y medidas preventivas."]
      }
    },
    {
      id: "3",
      title: "Módulo 3: Manejo y estabilidad",
      lesson: {
        title: "Carga, estabilidad, circulación, rampas y almacenamiento",
        intro: "La estabilidad de una carretilla depende de la relación entre la máquina, la carga, el centro de gravedad, la altura y las condiciones del terreno. Este tema convierte esos principios en pautas prácticas de manejo.",
        points: [
          "Triángulo de estabilidad y desplazamiento del centro de gravedad.",
          "Recogida, transporte y depósito de cargas de forma controlada.",
          "Rampas, pendientes, giros, visibilidad y circulación marcha atrás.",
          "Apilado y desapilado respetando capacidad, estabilidad y condiciones de la estantería."
        ],
        sections: [
          { heading: "3.1. Principio de estabilidad", text: "La carretilla debe mantenerse dentro de una condición estable durante la manipulación. La posición de la carga, su peso, la altura de elevación, la inclinación del mástil, la velocidad y las fuerzas producidas durante los giros influyen en la estabilidad. Elevar una carga o realizar una maniobra brusca puede modificar significativamente el comportamiento del conjunto.", bullets: ["Mantener la carga estable y centrada.", "Evitar giros bruscos y cambios repentinos de velocidad.", "No elevar una carga más de lo necesario durante el desplazamiento."] },
          { heading: "3.2. Recogida de la carga", text: "Antes de introducir las horquillas se debe comprobar que la carga está preparada y que la aproximación puede hacerse sin golpear personas, palets, estanterías u otros equipos. Las horquillas deben entrar de forma adecuada y la carga debe quedar suficientemente apoyada antes de iniciar el transporte.", bullets: ["Comprobar el estado del palet o soporte.", "Alinear la carretilla con la carga.", "Introducir las horquillas de forma segura y uniforme.", "Inclinar y asegurar la carga según el procedimiento y fabricante."] },
          { heading: "3.3. Transporte", text: "Durante el desplazamiento la carga debe mantenerse en una posición segura y la trayectoria debe permanecer libre. Si la carga impide ver hacia delante, se debe aplicar el procedimiento de circulación previsto, que puede requerir desplazamiento marcha atrás u otras medidas.", bullets: ["Mantener velocidad controlada.", "Evitar transportar cargas inestables.", "Mirar en el sentido de desplazamiento y comprobar el entorno.", "Usar señal acústica o sistemas de advertencia cuando proceda."] },
          { heading: "3.4. Rampas y pendientes", text: "Las pendientes requieren especial atención porque cambian la distribución de fuerzas y pueden afectar al equilibrio de la carretilla y la carga. La orientación correcta depende del tipo de máquina y de la situación; siempre deben seguirse las instrucciones del fabricante y el procedimiento del centro de trabajo.", bullets: ["No girar transversalmente en una pendiente salvo que el procedimiento lo contemple.", "Mantener la carga controlada.", "Comprobar el estado y resistencia de la superficie.", "No realizar maniobras improvisadas."] },
          { heading: "3.5. Apilado y estanterías", text: "El almacenamiento exige comprobar la capacidad y el estado de la estantería, la resistencia del palet y el espacio disponible. La aproximación debe ser lenta y controlada. No se debe utilizar una estantería dañada ni colocar cargas de forma que puedan sobresalir o caer.", bullets: ["Respetar la capacidad de la ubicación.", "Alinear la carga antes de depositarla.", "Evitar impactos contra largueros y protecciones.", "Mantener las zonas de paso y emergencia despejadas."] }
        ],
        references: ["INSST · NTP 713, NTP 714 y NTP 715 · criterios técnicos sobre estabilidad, riesgos y utilización segura."]
      }
    },
    {
      id: "4",
      title: "Módulo 4: Mantenimiento y emergencias",
      lesson: {
        title: "Inspección, mantenimiento, estacionamiento y actuación ante incidencias",
        intro: "El mantenimiento preventivo y la actuación ordenada ante una incidencia forman parte de la seguridad del operador. Una carretilla no debe continuar trabajando cuando presenta un defecto que pueda comprometer la seguridad.",
        points: [
          "Inspección de frenos, dirección, ruedas, mástil, horquillas, hidráulica y señalización.",
          "Baterías, carga, repostaje y precauciones según el tipo de energía.",
          "Estacionamiento, descenso de horquillas, freno e inmovilización.",
          "Actuación ante avería, caída de carga, incendio, vuelco u otra emergencia."
        ],
        sections: [
          { heading: "4.1. Mantenimiento preventivo", text: "El mantenimiento debe realizarse conforme a las instrucciones del fabricante y por personal autorizado cuando se trate de operaciones que requieran cualificación. El operador puede realizar las comprobaciones previstas para su puesto, pero no debe intervenir en sistemas para los que no esté autorizado.", bullets: ["Revisar frenos y dirección.", "Comprobar ruedas y elementos de rodadura.", "Observar fugas hidráulicas y daños visibles.", "Comprobar dispositivos de señalización y seguridad."] },
          { heading: "4.2. Baterías y repostaje", text: "La energía de la carretilla introduce riesgos específicos. Las baterías, cargadores y sistemas de repostaje deben utilizarse en las zonas previstas, con ventilación y medidas de seguridad adecuadas. El procedimiento concreto depende de si el equipo es eléctrico, diésel, GLP u otro sistema.", bullets: ["Seguir el procedimiento del fabricante.", "No fumar ni generar fuentes de ignición en zonas donde esté prohibido.", "Utilizar los EPI establecidos para la operación.", "Comunicar daños, fugas o calentamientos anómalos."] },
          { heading: "4.3. Estacionamiento", text: "Al finalizar el trabajo se debe dejar la carretilla en una posición que no genere peligro. Las horquillas deben quedar en una posición segura, el equipo debe inmovilizarse y se debe retirar la llave o aplicar el sistema de control previsto para evitar usos no autorizados.", bullets: ["Estacionar en la zona asignada.", "No bloquear salidas, extintores ni vías de evacuación.", "Aplicar freno de estacionamiento.", "No abandonar el equipo con la carga elevada."] },
          { heading: "4.4. Avería o defecto", text: "Cuando aparece una anomalía que pueda afectar a la seguridad, la prioridad es detener la operación y evitar que otra persona utilice el equipo. La avería debe comunicarse por el procedimiento establecido y la máquina debe quedar identificada o retirada del servicio cuando corresponda.", bullets: ["Detenerse en una zona segura.", "Bajar la carga o dejar el equipo en condición segura si es posible.", "No intentar reparaciones no autorizadas.", "Informar de forma precisa del defecto observado."] },
          { heading: "4.5. Emergencias y vuelco", text: "Ante una emergencia se debe mantener la calma y seguir el procedimiento del centro de trabajo. En caso de vuelco, el comportamiento correcto depende del tipo de máquina y de las instrucciones del fabricante; no se debe saltar impulsivamente del equipo. La prioridad es proteger al operador y a las personas del entorno y activar la ayuda prevista.", bullets: ["Activar la emergencia y avisar cuando sea necesario.", "Mantener alejadas a las personas de la zona de peligro.", "No acercarse a una carga inestable.", "Seguir las instrucciones específicas del fabricante y del plan de emergencia."] }
        ],
        references: ["INSST · NTP 715: Carretillas elevadoras automotoras (III): mantenimiento y utilización.", "INSST · NTP 714: principales peligros y medidas preventivas."]
      }
    },
    {
      id: "5",
      title: "Módulo 5: Operación de carretilla retráctil",
      lesson: {
        title: "Pasillos, mástil retráctil, almacenamiento en altura y maniobras",
        intro: "Este módulo profundiza en las particularidades de la carretilla retráctil utilizada en almacenes y centros logísticos. La operación debe adaptarse siempre al modelo concreto, a su manual y a las condiciones reales del lugar de trabajo.",
        points: [
          "Características de la carretilla retráctil y diferencias frente a una frontal.",
          "Trabajo en pasillos, estanterías y zonas de almacenamiento en altura.",
          "Desplazamiento del mástil y efectos sobre visibilidad, carga y estabilidad.",
          "Entrada y salida de ubicaciones y maniobras con espacio reducido."
        ],
        sections: [
          { heading: "5.1. Características de la retráctil", text: "La carretilla retráctil está diseñada para operaciones de almacenamiento en las que el espacio disponible puede ser reducido. El conjunto de elevación permite aproximar o retirar la carga respecto del cuerpo de la máquina según la configuración del equipo. El operador debe conocer las posiciones autorizadas del mástil y sus límites.", bullets: ["Identificar el modelo y sus capacidades.", "Consultar el diagrama de carga específico.", "No utilizar el equipo fuera de las funciones previstas."] },
          { heading: "5.2. Trabajo en pasillos", text: "Los pasillos requieren control de velocidad, atención a cruces y separación respecto de peatones y otras máquinas. Antes de entrar en una ubicación hay que comprobar que el espacio está libre y que la carga puede introducirse sin contacto con la estantería.", bullets: ["Reducir velocidad antes de entrar en zonas estrechas.", "Comprobar la altura libre y posibles obstáculos.", "Mantener una trayectoria alineada con la ubicación.", "Detenerse si la visibilidad o el espacio no permiten una maniobra segura."] },
          { heading: "5.3. Almacenamiento en altura", text: "La elevación en altura modifica las condiciones de estabilidad y exige respetar estrictamente la capacidad indicada por el fabricante. La carga debe estar correctamente colocada y la ubicación debe ser adecuada para sus dimensiones y peso.", bullets: ["No superar la capacidad para la altura y configuración utilizadas.", "Evitar impactos contra largueros y protecciones.", "No colocar cargas dañadas o inestables.", "Mantener las zonas inferiores despejadas durante la maniobra."] },
          { heading: "5.4. Maniobras con visibilidad limitada", text: "Cuando la carga o la configuración del equipo limite la visión, debe aplicarse el procedimiento establecido por el centro de trabajo. Puede ser necesario circular en sentido contrario, utilizar sistemas de ayuda o contar con un señalista.", bullets: ["No avanzar a ciegas.", "Utilizar espejos, cámaras u otras ayudas cuando estén disponibles.", "Detener la maniobra ante una duda sobre la trayectoria.", "No permitir que una persona se coloque en una zona de atrapamiento."] }
        ],
        references: ["INSST · NTP 713-715 · criterios técnicos de utilización segura de carretillas elevadoras."]
      }
    },
    {
      id: "6",
      title: "Módulo 6: Casos prácticos y comprobación final",
      lesson: {
        title: "Preparación de la jornada, secuencia de trabajo y resolución de situaciones",
        intro: "El último módulo reúne los conocimientos anteriores en situaciones habituales de trabajo. El objetivo es que el alumno pueda reconocer una operación segura, detectar errores y justificar cuándo debe detener una maniobra.",
        points: [
          "Secuencia completa desde la inspección inicial hasta el estacionamiento.",
          "Análisis de situaciones con carga, peatones, rampas y estanterías.",
          "Reconocimiento de prácticas inseguras y decisiones preventivas.",
          "Preparación para la evaluación teórica del curso."
        ],
        sections: [
          { heading: "6.1. Antes de comenzar", text: "El operador debe conocer el equipo, comprobar su estado, revisar el entorno y confirmar que la tarea puede realizarse con los medios disponibles. La planificación evita improvisaciones durante la maniobra.", bullets: ["Identificar la máquina y consultar sus instrucciones.", "Comprobar frenos, dirección, ruedas, horquillas y dispositivos de seguridad.", "Revisar recorrido, carga, destino y presencia de peatones.", "No comenzar si existe una condición peligrosa no controlada."] },
          { heading: "6.2. Durante la manipulación", text: "Una operación segura requiere movimientos progresivos, velocidad adecuada y vigilancia continua del entorno. La carga debe mantenerse estable y la carretilla debe utilizarse dentro de sus límites.", bullets: ["Evitar aceleraciones y frenazos bruscos.", "Mantener la carga en posición segura durante el transporte.", "Respetar señalización y rutas establecidas.", "Detenerse ante cualquier pérdida de control o visibilidad."] },
          { heading: "6.3. Situaciones que obligan a extremar la precaución", text: "Cruces, rampas, superficies irregulares, cargas largas, zonas congestionadas y maniobras cerca de estanterías requieren medidas adicionales. El procedimiento concreto debe adaptarse al centro de trabajo y al fabricante.", bullets: ["Reducir velocidad.", "Aumentar la vigilancia del entorno.", "Utilizar señalización o ayuda cuando corresponda.", "No continuar una maniobra que no pueda controlarse con seguridad."] },
          { heading: "6.4. Final de la jornada", text: "El trabajo termina dejando el equipo en condiciones que no generen nuevos riesgos. La carretilla debe quedar estacionada en el lugar previsto, inmovilizada y sin cargas suspendidas o elevadas.", bullets: ["Bajar las horquillas a una posición segura.", "Aplicar el freno de estacionamiento.", "Apagar y asegurar el equipo conforme al procedimiento.", "Comunicar cualquier defecto detectado durante la jornada."] },
          { heading: "6.5. Preparación para el test", text: "La evaluación debe comprobar que el alumno comprende los principios de estabilidad, riesgos, circulación, manipulación de cargas, inspección y actuación ante incidencias. Aprobar no sustituye la formación práctica ni la autorización necesaria para operar una máquina en un puesto concreto.", bullets: ["Repasar los seis módulos.", "Comprender el motivo de cada medida preventiva.", "Distinguir entre una práctica permitida y una situación que exige detenerse.", "Aplicar siempre el manual del fabricante y las instrucciones del puesto."] }
        ],
        references: ["INSST · NTP 713, 714 y 715.", "Principios generales de utilización segura de equipos de trabajo y prevención de riesgos laborales."]
      }
    }
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

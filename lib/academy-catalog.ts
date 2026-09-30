import { courses as baseCourses, getTemario, type Course, type Module } from "./courses";

export const academyCategories = [
  "Manutención y Carretillas",
  "Maquinaria y Movimiento de Tierras",
  "Elevación y Plataformas",
  "Grúas y Equipos de Elevación",
  "Construcción y Obra Civil",
  "Mecánica",
  "Mantenimiento Industrial",
  "Soldadura y Fabricación Mecánica",
  "Madera, Mueble y Carpintería",
  "Textil y Confección",
  "Artes Gráficas",
  "Vidrio y Cerámica",
  "Industrias Extractivas",
  "Logística y Almacén",
  "Transporte",
  "Automoción",
  "Prevención de Riesgos Laborales",
  "Manipulación y Seguridad",
  "Emergencias y Seguridad",
  "Seguridad Privada y Protección",
  "Electricidad y Electrónica",
  "Automatización, Robótica e Industria 4.0",
  "Energía y Renovables",
  "Climatización y Refrigeración",
  "Química e Industria",
  "Informática y Competencias Digitales",
  "Inteligencia Artificial",
  "Programación y Desarrollo",
  "Ciberseguridad",
  "Administración y Gestión",
  "Comercio y Ventas",
  "Marketing Digital",
  "Habilidades Profesionales",
  "Empleo y Carrera Profesional",
  "Idiomas",
  "Diseño y Contenidos Digitales",
  "Imagen y Sonido",
  "Hostelería y Turismo",
  "Sanidad y Cuidados",
  "Servicios Sociales",
  "Limpieza y Servicios",
  "Actividades Físicas y Deportivas",
  "Imagen Personal",
  "Medio Ambiente",
  "Agricultura y Medio Rural",
  "Jardinería y Forestal",
  "Marítimo-Pesquera"
] as const;

export const academyCourses: Course[] = [
  { id: "carretillas-elevadoras-frontales-y-retractiles", title: "Curso de Carretillas Elevadoras: Frontales y Retráctiles", description: "Formación gratuita de carretillas elevadoras: frontales y retráctiles, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Manutención y Carretillas", image: "/cursos/carretilla-elevadora.png" },
  { id: "transpaleta-manual-y-electrica", title: "Curso de Transpaleta Manual y Eléctrica", description: "Formación gratuita de transpaleta manual y eléctrica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Manutención y Carretillas", image: "/cursos/carretilla-elevadora.png" },
  { id: "apilador-electrico", title: "Curso de Apilador Eléctrico", description: "Formación gratuita de apilador eléctrico, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Manutención y Carretillas", image: "/cursos/carretilla-elevadora.png" },
  { id: "dumper-y-movimiento-de-tierras", title: "Curso de Dúmper y Movimiento de Tierras", description: "Formación gratuita de dúmper y movimiento de tierras, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Maquinaria y Movimiento de Tierras", image: "/cursos/dumper.png" },
  { id: "retropala-y-pala-cargadora", title: "Curso de Retropala y Pala Cargadora", description: "Formación gratuita de retropala y pala cargadora, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Maquinaria y Movimiento de Tierras", image: "/cursos/dumper.png" },
  { id: "carretilla-telescopica-manitou", title: "Curso de Carretilla Telescópica (Manitou)", description: "Formación gratuita de carretilla telescópica (manitou), con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Maquinaria y Movimiento de Tierras", image: "/cursos/dumper.png" },
  { id: "plataformas-elevadoras-moviles-pemp", title: "Curso de Plataformas Elevadoras Móviles (PEMP)", description: "Formación gratuita de plataformas elevadoras móviles (pemp), con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Elevación y Plataformas", image: "/cursos/pemp.png" },
  { id: "trabajos-seguros-en-altura", title: "Curso de Trabajos Seguros en Altura", description: "Formación gratuita de trabajos seguros en altura, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Elevación y Plataformas", image: "/cursos/pemp.png" },
  { id: "plataformas-de-tijera-y-brazo", title: "Curso de Plataformas de Tijera y Brazo", description: "Formación gratuita de plataformas de tijera y brazo, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Elevación y Plataformas", image: "/cursos/pemp.png" },
  { id: "puente-grua-y-polipasto", title: "Curso de Puente Grúa y Polipasto", description: "Formación gratuita de puente grúa y polipasto, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Grúas y Equipos de Elevación", image: "/cursos/puente-grua.png" },
  { id: "camion-pluma-grua-autocargable", title: "Curso de Camión Pluma / Grúa Autocargable", description: "Formación gratuita de camión pluma / grúa autocargable, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Grúas y Equipos de Elevación", image: "/cursos/puente-grua.png" },
  { id: "eslingado-y-accesorios-de-elevacion", title: "Curso de Eslingado y Accesorios de Elevación", description: "Formación gratuita de eslingado y accesorios de elevación, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Grúas y Equipos de Elevación", image: "/cursos/puente-grua.png" },
  { id: "seguridad-en-obras-de-construccion", title: "Curso de Seguridad en Obras de Construcción", description: "Formación gratuita de seguridad en obras de construcción, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Construcción y Obra Civil", image: "/placeholder.svg" },
  { id: "operaciones-basicas-de-obra-civil", title: "Curso de Operaciones Básicas de Obra Civil", description: "Formación gratuita de operaciones básicas de obra civil, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Construcción y Obra Civil", image: "/placeholder.svg" },
  { id: "maquinaria-y-organizacion-de-obra", title: "Curso de Maquinaria y Organización de Obra", description: "Formación gratuita de maquinaria y organización de obra, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Construcción y Obra Civil", image: "/placeholder.svg" },
  { id: "mecanica-industrial-basica", title: "Curso de Mecánica Industrial Básica", description: "Formación gratuita de mecánica industrial básica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Mecánica", image: "/placeholder.svg" },
  { id: "mantenimiento-mecanico-de-equipos", title: "Curso de Mantenimiento Mecánico de Equipos", description: "Formación gratuita de mantenimiento mecánico de equipos, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Mecánica", image: "/placeholder.svg" },
  { id: "diagnostico-y-reparacion-mecanica", title: "Curso de Diagnóstico y Reparación Mecánica", description: "Formación gratuita de diagnóstico y reparación mecánica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Mecánica", image: "/placeholder.svg" },
  { id: "mantenimiento-preventivo-industrial", title: "Curso de Mantenimiento Preventivo Industrial", description: "Formación gratuita de mantenimiento preventivo industrial, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Mantenimiento Industrial", image: "/placeholder.svg" },
  { id: "mantenimiento-correctivo-y-averias", title: "Curso de Mantenimiento Correctivo y Averías", description: "Formación gratuita de mantenimiento correctivo y averías, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Mantenimiento Industrial", image: "/placeholder.svg" },
  { id: "planificacion-del-mantenimiento-industrial", title: "Curso de Planificación del Mantenimiento Industrial", description: "Formación gratuita de planificación del mantenimiento industrial, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Mantenimiento Industrial", image: "/placeholder.svg" },
  { id: "soldadura-mig-mag", title: "Curso de Soldadura MIG/MAG", description: "Formación gratuita de soldadura mig/mag, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Soldadura y Fabricación Mecánica", image: "/placeholder.svg" },
  { id: "soldadura-tig-y-electrodos", title: "Curso de Soldadura TIG y Electrodos", description: "Formación gratuita de soldadura tig y electrodos, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Soldadura y Fabricación Mecánica", image: "/placeholder.svg" },
  { id: "fabricacion-y-montaje-metalico", title: "Curso de Fabricación y Montaje Metálico", description: "Formación gratuita de fabricación y montaje metálico, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Soldadura y Fabricación Mecánica", image: "/placeholder.svg" },
  { id: "carpinteria-y-trabajo-de-la-madera", title: "Curso de Carpintería y Trabajo de la Madera", description: "Formación gratuita de carpintería y trabajo de la madera, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Madera, Mueble y Carpintería", image: "/placeholder.svg" },
  { id: "fabricacion-y-montaje-de-muebles", title: "Curso de Fabricación y Montaje de Muebles", description: "Formación gratuita de fabricación y montaje de muebles, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Madera, Mueble y Carpintería", image: "/placeholder.svg" },
  { id: "seguridad-en-carpinteria", title: "Curso de Seguridad en Carpintería", description: "Formación gratuita de seguridad en carpintería, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Madera, Mueble y Carpintería", image: "/placeholder.svg" },
  { id: "operaciones-de-confeccion-textil", title: "Curso de Operaciones de Confección Textil", description: "Formación gratuita de operaciones de confección textil, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Textil y Confección", image: "/placeholder.svg" },
  { id: "maquinaria-textil-y-seguridad", title: "Curso de Maquinaria Textil y Seguridad", description: "Formación gratuita de maquinaria textil y seguridad, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Textil y Confección", image: "/placeholder.svg" },
  { id: "patronaje-y-acabados-basicos", title: "Curso de Patronaje y Acabados Básicos", description: "Formación gratuita de patronaje y acabados básicos, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Textil y Confección", image: "/placeholder.svg" },
  { id: "preimpresion-y-artes-graficas", title: "Curso de Preimpresión y Artes Gráficas", description: "Formación gratuita de preimpresión y artes gráficas, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Artes Gráficas", image: "/placeholder.svg" },
  { id: "impresion-y-acabados", title: "Curso de Impresión y Acabados", description: "Formación gratuita de impresión y acabados, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Artes Gráficas", image: "/placeholder.svg" },
  { id: "diseno-para-produccion-grafica", title: "Curso de Diseño para Producción Gráfica", description: "Formación gratuita de diseño para producción gráfica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Artes Gráficas", image: "/placeholder.svg" },
  { id: "procesos-basicos-del-vidrio", title: "Curso de Procesos Básicos del Vidrio", description: "Formación gratuita de procesos básicos del vidrio, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Vidrio y Cerámica", image: "/placeholder.svg" },
  { id: "ceramica-industrial-y-acabados", title: "Curso de Cerámica Industrial y Acabados", description: "Formación gratuita de cerámica industrial y acabados, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Vidrio y Cerámica", image: "/placeholder.svg" },
  { id: "seguridad-en-industria-ceramica", title: "Curso de Seguridad en Industria Cerámica", description: "Formación gratuita de seguridad en industria cerámica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Vidrio y Cerámica", image: "/placeholder.svg" },
  { id: "seguridad-en-industrias-extractivas", title: "Curso de Seguridad en Industrias Extractivas", description: "Formación gratuita de seguridad en industrias extractivas, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Industrias Extractivas", image: "/placeholder.svg" },
  { id: "operaciones-basicas-de-cantera", title: "Curso de Operaciones Básicas de Cantera", description: "Formación gratuita de operaciones básicas de cantera, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Industrias Extractivas", image: "/placeholder.svg" },
  { id: "maquinaria-en-explotaciones-extractivas", title: "Curso de Maquinaria en Explotaciones Extractivas", description: "Formación gratuita de maquinaria en explotaciones extractivas, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Industrias Extractivas", image: "/placeholder.svg" },
  { id: "gestion-de-almacen-y-stock", title: "Curso de Gestión de Almacén y Stock", description: "Formación gratuita de gestión de almacén y stock, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Logística y Almacén", image: "/cursos/gestion-almacen.png" },
  { id: "preparacion-de-pedidos-y-picking", title: "Curso de Preparación de Pedidos y Picking", description: "Formación gratuita de preparación de pedidos y picking, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Logística y Almacén", image: "/cursos/gestion-almacen.png" },
  { id: "recepcion-y-expedicion-de-mercancias", title: "Curso de Recepción y Expedición de Mercancías", description: "Formación gratuita de recepción y expedición de mercancías, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Logística y Almacén", image: "/cursos/gestion-almacen.png" },
  { id: "operaciones-de-transporte-de-mercancias", title: "Curso de Operaciones de Transporte de Mercancías", description: "Formación gratuita de operaciones de transporte de mercancías, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Transporte", image: "/placeholder.svg" },
  { id: "logistica-y-seguridad-en-el-transporte", title: "Curso de Logística y Seguridad en el Transporte", description: "Formación gratuita de logística y seguridad en el transporte, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Transporte", image: "/placeholder.svg" },
  { id: "documentacion-y-gestion-del-transporte", title: "Curso de Documentación y Gestión del Transporte", description: "Formación gratuita de documentación y gestión del transporte, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Transporte", image: "/placeholder.svg" },
  { id: "mecanica-del-automovil", title: "Curso de Mecánica del Automóvil", description: "Formación gratuita de mecánica del automóvil, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Automoción", image: "/placeholder.svg" },
  { id: "electricidad-y-electronica-del-automovil", title: "Curso de Electricidad y Electrónica del Automóvil", description: "Formación gratuita de electricidad y electrónica del automóvil, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Automoción", image: "/placeholder.svg" },
  { id: "mantenimiento-preventivo-del-vehiculo", title: "Curso de Mantenimiento Preventivo del Vehículo", description: "Formación gratuita de mantenimiento preventivo del vehículo, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Automoción", image: "/placeholder.svg" },
  { id: "prl-basico-para-trabajadores", title: "Curso de PRL Básico para Trabajadores", description: "Formación gratuita de prl básico para trabajadores, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Prevención de Riesgos Laborales", image: "/cursos/prl-almacen.png" },
  { id: "prl-en-industria-y-maquinaria", title: "Curso de PRL en Industria y Maquinaria", description: "Formación gratuita de prl en industria y maquinaria, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Prevención de Riesgos Laborales", image: "/cursos/prl-almacen.png" },
  { id: "prl-en-construccion-y-metal", title: "Curso de PRL en Construcción y Metal", description: "Formación gratuita de prl en construcción y metal, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Prevención de Riesgos Laborales", image: "/cursos/prl-almacen.png" },
  { id: "manipulacion-manual-de-cargas", title: "Curso de Manipulación Manual de Cargas", description: "Formación gratuita de manipulación manual de cargas, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Manipulación y Seguridad", image: "/cursos/manipulacion-cargas.png" },
  { id: "ergonomia-y-prevencion-de-sobreesfuerzos", title: "Curso de Ergonomía y Prevención de Sobreesfuerzos", description: "Formación gratuita de ergonomía y prevención de sobreesfuerzos, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Manipulación y Seguridad", image: "/cursos/manipulacion-cargas.png" },
  { id: "epi-y-seguridad-del-operario", title: "Curso de EPI y Seguridad del Operario", description: "Formación gratuita de epi y seguridad del operario, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Manipulación y Seguridad", image: "/cursos/manipulacion-cargas.png" },
  { id: "prevencion-y-actuacion-ante-emergencias", title: "Curso de Prevención y Actuación ante Emergencias", description: "Formación gratuita de prevención y actuación ante emergencias, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Emergencias y Seguridad", image: "/placeholder.svg" },
  { id: "evacuacion-y-planes-de-emergencia", title: "Curso de Evacuación y Planes de Emergencia", description: "Formación gratuita de evacuación y planes de emergencia, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Emergencias y Seguridad", image: "/placeholder.svg" },
  { id: "primeras-actuaciones-ante-accidentes", title: "Curso de Primeras Actuaciones ante Accidentes", description: "Formación gratuita de primeras actuaciones ante accidentes, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Emergencias y Seguridad", image: "/placeholder.svg" },
  { id: "fundamentos-de-seguridad-y-proteccion", title: "Curso de Fundamentos de Seguridad y Protección", description: "Formación gratuita de fundamentos de seguridad y protección, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Seguridad Privada y Protección", image: "/placeholder.svg" },
  { id: "control-de-accesos-y-vigilancia", title: "Curso de Control de Accesos y Vigilancia", description: "Formación gratuita de control de accesos y vigilancia, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Seguridad Privada y Protección", image: "/placeholder.svg" },
  { id: "seguridad-en-instalaciones", title: "Curso de Seguridad en Instalaciones", description: "Formación gratuita de seguridad en instalaciones, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Seguridad Privada y Protección", image: "/placeholder.svg" },
  { id: "electricidad-basica-para-operarios", title: "Curso de Electricidad Básica para Operarios", description: "Formación gratuita de electricidad básica para operarios, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Electricidad y Electrónica", image: "/placeholder.svg" },
  { id: "instalaciones-electricas-basicas", title: "Curso de Instalaciones Eléctricas Básicas", description: "Formación gratuita de instalaciones eléctricas básicas, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Electricidad y Electrónica", image: "/placeholder.svg" },
  { id: "electronica-industrial-basica", title: "Curso de Electrónica Industrial Básica", description: "Formación gratuita de electrónica industrial básica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Electricidad y Electrónica", image: "/placeholder.svg" },
  { id: "automatizacion-industrial-basica", title: "Curso de Automatización Industrial Básica", description: "Formación gratuita de automatización industrial básica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Automatización, Robótica e Industria 4.0", image: "/placeholder.svg" },
  { id: "robotica-industrial-para-operarios", title: "Curso de Robótica Industrial para Operarios", description: "Formación gratuita de robótica industrial para operarios, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Automatización, Robótica e Industria 4.0", image: "/placeholder.svg" },
  { id: "industria-4-0-y-sistemas-inteligentes", title: "Curso de Industria 4.0 y Sistemas Inteligentes", description: "Formación gratuita de industria 4.0 y sistemas inteligentes, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Automatización, Robótica e Industria 4.0", image: "/placeholder.svg" },
  { id: "energia-solar-fotovoltaica", title: "Curso de Energía Solar Fotovoltaica", description: "Formación gratuita de energía solar fotovoltaica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Energía y Renovables", image: "/placeholder.svg" },
  { id: "eficiencia-energetica", title: "Curso de Eficiencia Energética", description: "Formación gratuita de eficiencia energética, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Energía y Renovables", image: "/placeholder.svg" },
  { id: "introduccion-a-energias-renovables", title: "Curso de Introducción a Energías Renovables", description: "Formación gratuita de introducción a energías renovables, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Energía y Renovables", image: "/placeholder.svg" },
  { id: "climatizacion-basica", title: "Curso de Climatización Básica", description: "Formación gratuita de climatización básica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Climatización y Refrigeración", image: "/placeholder.svg" },
  { id: "refrigeracion-industrial-basica", title: "Curso de Refrigeración Industrial Básica", description: "Formación gratuita de refrigeración industrial básica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Climatización y Refrigeración", image: "/placeholder.svg" },
  { id: "mantenimiento-de-equipos-de-climatizacion", title: "Curso de Mantenimiento de Equipos de Climatización", description: "Formación gratuita de mantenimiento de equipos de climatización, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Climatización y Refrigeración", image: "/placeholder.svg" },
  { id: "seguridad-en-procesos-quimicos", title: "Curso de Seguridad en Procesos Químicos", description: "Formación gratuita de seguridad en procesos químicos, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Química e Industria", image: "/placeholder.svg" },
  { id: "operaciones-basicas-en-industria-quimica", title: "Curso de Operaciones Básicas en Industria Química", description: "Formación gratuita de operaciones básicas en industria química, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Química e Industria", image: "/placeholder.svg" },
  { id: "manipulacion-segura-de-productos-quimicos", title: "Curso de Manipulación Segura de Productos Químicos", description: "Formación gratuita de manipulación segura de productos químicos, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Química e Industria", image: "/placeholder.svg" },
  { id: "informatica-basica-para-el-trabajo", title: "Curso de Informática Básica para el Trabajo", description: "Formación gratuita de informática básica para el trabajo, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Informática y Competencias Digitales", image: "/placeholder.svg" },
  { id: "ofimatica-profesional", title: "Curso de Ofimática Profesional", description: "Formación gratuita de ofimática profesional, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Informática y Competencias Digitales", image: "/placeholder.svg" },
  { id: "competencias-digitales-para-operarios", title: "Curso de Competencias Digitales para Operarios", description: "Formación gratuita de competencias digitales para operarios, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Informática y Competencias Digitales", image: "/placeholder.svg" },
  { id: "inteligencia-artificial-para-el-trabajo", title: "Curso de Inteligencia Artificial para el Trabajo", description: "Formación gratuita de inteligencia artificial para el trabajo, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Inteligencia Artificial", image: "/placeholder.svg" },
  { id: "ia-generativa-y-productividad", title: "Curso de IA Generativa y Productividad", description: "Formación gratuita de ia generativa y productividad, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Inteligencia Artificial", image: "/placeholder.svg" },
  { id: "herramientas-de-ia-para-profesionales", title: "Curso de Herramientas de IA para Profesionales", description: "Formación gratuita de herramientas de ia para profesionales, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Inteligencia Artificial", image: "/placeholder.svg" },
  { id: "fundamentos-de-programacion", title: "Curso de Fundamentos de Programación", description: "Formación gratuita de fundamentos de programación, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Programación y Desarrollo", image: "/placeholder.svg" },
  { id: "desarrollo-web-basico", title: "Curso de Desarrollo Web Básico", description: "Formación gratuita de desarrollo web básico, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Programación y Desarrollo", image: "/placeholder.svg" },
  { id: "automatizacion-con-programacion", title: "Curso de Automatización con Programación", description: "Formación gratuita de automatización con programación, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Programación y Desarrollo", image: "/placeholder.svg" },
  { id: "ciberseguridad-para-trabajadores", title: "Curso de Ciberseguridad para Trabajadores", description: "Formación gratuita de ciberseguridad para trabajadores, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Ciberseguridad", image: "/placeholder.svg" },
  { id: "proteccion-de-datos-y-dispositivos", title: "Curso de Protección de Datos y Dispositivos", description: "Formación gratuita de protección de datos y dispositivos, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Ciberseguridad", image: "/placeholder.svg" },
  { id: "buenas-practicas-de-seguridad-digital", title: "Curso de Buenas Prácticas de Seguridad Digital", description: "Formación gratuita de buenas prácticas de seguridad digital, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Ciberseguridad", image: "/placeholder.svg" },
  { id: "administracion-de-empresas", title: "Curso de Administración de Empresas", description: "Formación gratuita de administración de empresas, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Administración y Gestión", image: "/placeholder.svg" },
  { id: "gestion-documental-y-administrativa", title: "Curso de Gestión Documental y Administrativa", description: "Formación gratuita de gestión documental y administrativa, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Administración y Gestión", image: "/placeholder.svg" },
  { id: "organizacion-y-gestion-de-oficina", title: "Curso de Organización y Gestión de Oficina", description: "Formación gratuita de organización y gestión de oficina, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Administración y Gestión", image: "/placeholder.svg" },
  { id: "tecnicas-de-venta", title: "Curso de Técnicas de Venta", description: "Formación gratuita de técnicas de venta, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Comercio y Ventas", image: "/placeholder.svg" },
  { id: "atencion-comercial-y-fidelizacion", title: "Curso de Atención Comercial y Fidelización", description: "Formación gratuita de atención comercial y fidelización, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Comercio y Ventas", image: "/placeholder.svg" },
  { id: "gestion-de-comercio-y-punto-de-venta", title: "Curso de Gestión de Comercio y Punto de Venta", description: "Formación gratuita de gestión de comercio y punto de venta, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Comercio y Ventas", image: "/placeholder.svg" },
  { id: "marketing-digital-basico", title: "Curso de Marketing Digital Básico", description: "Formación gratuita de marketing digital básico, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Marketing Digital", image: "/placeholder.svg" },
  { id: "redes-sociales-para-empresas", title: "Curso de Redes Sociales para Empresas", description: "Formación gratuita de redes sociales para empresas, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Marketing Digital", image: "/placeholder.svg" },
  { id: "creacion-de-contenidos-digitales", title: "Curso de Creación de Contenidos Digitales", description: "Formación gratuita de creación de contenidos digitales, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Marketing Digital", image: "/placeholder.svg" },
  { id: "comunicacion-profesional", title: "Curso de Comunicación Profesional", description: "Formación gratuita de comunicación profesional, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Habilidades Profesionales", image: "/placeholder.svg" },
  { id: "trabajo-en-equipo", title: "Curso de Trabajo en Equipo", description: "Formación gratuita de trabajo en equipo, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Habilidades Profesionales", image: "/placeholder.svg" },
  { id: "liderazgo-y-organizacion-del-trabajo", title: "Curso de Liderazgo y Organización del Trabajo", description: "Formación gratuita de liderazgo y organización del trabajo, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Habilidades Profesionales", image: "/placeholder.svg" },
  { id: "busqueda-de-empleo", title: "Curso de Búsqueda de Empleo", description: "Formación gratuita de búsqueda de empleo, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Empleo y Carrera Profesional", image: "/placeholder.svg" },
  { id: "curriculum-y-entrevista-de-trabajo", title: "Curso de Currículum y Entrevista de Trabajo", description: "Formación gratuita de currículum y entrevista de trabajo, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Empleo y Carrera Profesional", image: "/placeholder.svg" },
  { id: "orientacion-y-desarrollo-profesional", title: "Curso de Orientación y Desarrollo Profesional", description: "Formación gratuita de orientación y desarrollo profesional, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Empleo y Carrera Profesional", image: "/placeholder.svg" },
  { id: "ingles-profesional-basico", title: "Curso de Inglés Profesional Básico", description: "Formación gratuita de inglés profesional básico, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Idiomas", image: "/placeholder.svg" },
  { id: "ingles-para-atencion-al-cliente", title: "Curso de Inglés para Atención al Cliente", description: "Formación gratuita de inglés para atención al cliente, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Idiomas", image: "/placeholder.svg" },
  { id: "espanol-profesional-para-el-trabajo", title: "Curso de Español Profesional para el Trabajo", description: "Formación gratuita de español profesional para el trabajo, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Idiomas", image: "/placeholder.svg" },
  { id: "diseno-grafico-digital", title: "Curso de Diseño Gráfico Digital", description: "Formación gratuita de diseño gráfico digital, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Diseño y Contenidos Digitales", image: "/placeholder.svg" },
  { id: "creacion-de-contenido-para-redes", title: "Curso de Creación de Contenido para Redes", description: "Formación gratuita de creación de contenido para redes, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Diseño y Contenidos Digitales", image: "/placeholder.svg" },
  { id: "herramientas-de-diseno-online", title: "Curso de Herramientas de Diseño Online", description: "Formación gratuita de herramientas de diseño online, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Diseño y Contenidos Digitales", image: "/placeholder.svg" },
  { id: "fotografia-digital", title: "Curso de Fotografía Digital", description: "Formación gratuita de fotografía digital, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Imagen y Sonido", image: "/placeholder.svg" },
  { id: "edicion-de-video", title: "Curso de Edición de Vídeo", description: "Formación gratuita de edición de vídeo, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Imagen y Sonido", image: "/placeholder.svg" },
  { id: "produccion-audiovisual-basica", title: "Curso de Producción Audiovisual Básica", description: "Formación gratuita de producción audiovisual básica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Imagen y Sonido", image: "/placeholder.svg" },
  { id: "operaciones-basicas-de-hosteleria", title: "Curso de Operaciones Básicas de Hostelería", description: "Formación gratuita de operaciones básicas de hostelería, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Hostelería y Turismo", image: "/placeholder.svg" },
  { id: "atencion-al-cliente-en-turismo", title: "Curso de Atención al Cliente en Turismo", description: "Formación gratuita de atención al cliente en turismo, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Hostelería y Turismo", image: "/placeholder.svg" },
  { id: "seguridad-e-higiene-alimentaria", title: "Curso de Seguridad e Higiene Alimentaria", description: "Formación gratuita de seguridad e higiene alimentaria, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Hostelería y Turismo", image: "/placeholder.svg" },
  { id: "auxiliar-de-atencion-y-cuidados", title: "Curso de Auxiliar de Atención y Cuidados", description: "Formación gratuita de auxiliar de atención y cuidados, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Sanidad y Cuidados", image: "/placeholder.svg" },
  { id: "primeros-auxilios-basicos", title: "Curso de Primeros Auxilios Básicos", description: "Formación gratuita de primeros auxilios básicos, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Sanidad y Cuidados", image: "/placeholder.svg" },
  { id: "prevencion-y-seguridad-en-centros-sanitarios", title: "Curso de Prevención y Seguridad en Centros Sanitarios", description: "Formación gratuita de prevención y seguridad en centros sanitarios, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Sanidad y Cuidados", image: "/placeholder.svg" },
  { id: "atencion-a-personas-en-situacion-de-dependencia", title: "Curso de Atención a Personas en Situación de Dependencia", description: "Formación gratuita de atención a personas en situación de dependencia, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Servicios Sociales", image: "/placeholder.svg" },
  { id: "intervencion-social-basica", title: "Curso de Intervención Social Básica", description: "Formación gratuita de intervención social básica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Servicios Sociales", image: "/placeholder.svg" },
  { id: "comunicacion-y-atencion-a-usuarios", title: "Curso de Comunicación y Atención a Usuarios", description: "Formación gratuita de comunicación y atención a usuarios, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Servicios Sociales", image: "/placeholder.svg" },
  { id: "limpieza-profesional", title: "Curso de Limpieza Profesional", description: "Formación gratuita de limpieza profesional, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Limpieza y Servicios", image: "/placeholder.svg" },
  { id: "limpieza-de-centros-y-edificios", title: "Curso de Limpieza de Centros y Edificios", description: "Formación gratuita de limpieza de centros y edificios, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Limpieza y Servicios", image: "/placeholder.svg" },
  { id: "productos-y-tecnicas-de-limpieza", title: "Curso de Productos y Técnicas de Limpieza", description: "Formación gratuita de productos y técnicas de limpieza, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Limpieza y Servicios", image: "/placeholder.svg" },
  { id: "iniciacion-a-la-actividad-fisica", title: "Curso de Iniciación a la Actividad Física", description: "Formación gratuita de iniciación a la actividad física, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Actividades Físicas y Deportivas", image: "/placeholder.svg" },
  { id: "monitor-de-actividades-deportivas", title: "Curso de Monitor de Actividades Deportivas", description: "Formación gratuita de monitor de actividades deportivas, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Actividades Físicas y Deportivas", image: "/placeholder.svg" },
  { id: "seguridad-en-actividades-fisicas", title: "Curso de Seguridad en Actividades Físicas", description: "Formación gratuita de seguridad en actividades físicas, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Actividades Físicas y Deportivas", image: "/placeholder.svg" },
  { id: "peluqueria-basica", title: "Curso de Peluquería Básica", description: "Formación gratuita de peluquería básica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Imagen Personal", image: "/placeholder.svg" },
  { id: "estetica-y-cuidado-personal", title: "Curso de Estética y Cuidado Personal", description: "Formación gratuita de estética y cuidado personal, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Imagen Personal", image: "/placeholder.svg" },
  { id: "higiene-y-seguridad-en-imagen-personal", title: "Curso de Higiene y Seguridad en Imagen Personal", description: "Formación gratuita de higiene y seguridad en imagen personal, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Imagen Personal", image: "/placeholder.svg" },
  { id: "gestion-de-residuos", title: "Curso de Gestión de Residuos", description: "Formación gratuita de gestión de residuos, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Medio Ambiente", image: "/placeholder.svg" },
  { id: "educacion-y-sensibilizacion-ambiental", title: "Curso de Educación y Sensibilización Ambiental", description: "Formación gratuita de educación y sensibilización ambiental, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Medio Ambiente", image: "/placeholder.svg" },
  { id: "prevencion-de-la-contaminacion", title: "Curso de Prevención de la Contaminación", description: "Formación gratuita de prevención de la contaminación, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Medio Ambiente", image: "/placeholder.svg" },
  { id: "operaciones-agricolas-basicas", title: "Curso de Operaciones Agrícolas Básicas", description: "Formación gratuita de operaciones agrícolas básicas, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Agricultura y Medio Rural", image: "/placeholder.svg" },
  { id: "maquinaria-agricola-y-seguridad", title: "Curso de Maquinaria Agrícola y Seguridad", description: "Formación gratuita de maquinaria agrícola y seguridad, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Agricultura y Medio Rural", image: "/placeholder.svg" },
  { id: "prevencion-de-riesgos-en-agricultura", title: "Curso de Prevención de Riesgos en Agricultura", description: "Formación gratuita de prevención de riesgos en agricultura, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Agricultura y Medio Rural", image: "/placeholder.svg" },
  { id: "jardineria-profesional-basica", title: "Curso de Jardinería Profesional Básica", description: "Formación gratuita de jardinería profesional básica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Jardinería y Forestal", image: "/placeholder.svg" },
  { id: "trabajos-forestales-y-seguridad", title: "Curso de Trabajos Forestales y Seguridad", description: "Formación gratuita de trabajos forestales y seguridad, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Jardinería y Forestal", image: "/placeholder.svg" },
  { id: "mantenimiento-de-zonas-verdes", title: "Curso de Mantenimiento de Zonas Verdes", description: "Formación gratuita de mantenimiento de zonas verdes, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Jardinería y Forestal", image: "/placeholder.svg" },
  { id: "seguridad-maritima-basica", title: "Curso de Seguridad Marítima Básica", description: "Formación gratuita de seguridad marítima básica, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Marítimo-Pesquera", image: "/placeholder.svg" },
  { id: "operaciones-pesqueras", title: "Curso de Operaciones Pesqueras", description: "Formación gratuita de operaciones pesqueras, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Marítimo-Pesquera", image: "/placeholder.svg" },
  { id: "mantenimiento-basico-de-embarcaciones", title: "Curso de Mantenimiento Básico de Embarcaciones", description: "Formación gratuita de mantenimiento básico de embarcaciones, con contenidos prácticos, seguridad y buenas prácticas profesionales.", category: "Marítimo-Pesquera", image: "/placeholder.svg" }
];

export const allCourses: Course[] = [...baseCourses, ...academyCourses];
export function getAcademyCourse(id: string) { return allCourses.find((course) => course.id === id); }

export function getAllTemario(course: Course): Module[] {
  const existing = getTemario(course);
  if (existing.length) return existing;

  const title = course.title.replace(/^Curso de /i, "").replace(/^Curso /i, "");
  const category = course.category;

  const profiles: Record<string, {
    context: string;
    safety: string;
    operation: string;
    maintenance: string;
    practice: string;
  }> = {
    "Manutención y Carretillas": {
      context: "La manutención mecánica permite mover, elevar y colocar materiales de forma controlada. En este curso se estudian las características del equipo, su capacidad, los órganos de mando y las condiciones que deben comprobarse antes de iniciar una tarea.",
      safety: "Los principales peligros están relacionados con vuelcos, caída de cargas, atropellos, golpes y atrapamientos. La prevención exige respetar la capacidad del equipo, mantener una velocidad adecuada, separar las zonas de paso y utilizar los sistemas de protección previstos.",
      operation: "La operación segura comienza con una inspección visual y funcional. El operador debe comprobar ruedas, horquillas o implementos, frenos, dirección, alarmas y ausencia de fugas. La carga debe colocarse estable y el desplazamiento realizarse con buena visibilidad y control del entorno.",
      maintenance: "Las revisiones de usuario permiten detectar defectos antes de que provoquen un incidente. Las anomalías deben comunicarse y el equipo no debe utilizarse cuando exista un defecto que pueda comprometer la seguridad.",
      practice: "Los ejercicios deben plantear situaciones reales: pasillos estrechos, cargas descentradas, rampas, cruces con peatones, estanterías y operaciones de carga y descarga."
    },
    "Maquinaria y Movimiento de Tierras": {
      context: "La maquinaria de movimiento de tierras trabaja con grandes masas, inercias y esfuerzos. El operador debe conocer las características del equipo, el terreno, los límites de estabilidad y la zona de influencia de la máquina.",
      safety: "Los riesgos más importantes incluyen vuelco, atropello, atrapamiento, caída de materiales y contacto con instalaciones. La prevención requiere delimitar la zona, controlar pendientes y mantener comunicación con las personas próximas.",
      operation: "Antes de trabajar se revisan mandos, frenos, neumáticos u orugas, implementos, alarmas y posibles fugas. Durante la operación se realizan movimientos progresivos, evitando maniobras bruscas y respetando las limitaciones indicadas por el fabricante.",
      maintenance: "El mantenimiento de usuario comprende comprobaciones, limpieza, niveles cuando corresponda y comunicación de averías. Las intervenciones que requieran desmontaje o reparación deben quedar reservadas al personal autorizado.",
      practice: "Los casos prácticos deben simular excavación, carga, descarga, circulación, trabajo en pendientes y coordinación con otros equipos."
    },
    "Elevación y Plataformas": {
      context: "Las plataformas elevadoras están diseñadas para posicionar personas en altura. Su utilización exige conocer el tipo de plataforma, los mandos, la estabilidad, la capacidad nominal y los dispositivos de seguridad.",
      safety: "El riesgo principal es la caída de personas, junto con vuelco, atrapamiento, colisión y contacto con obstáculos o instalaciones. El operador debe evaluar el terreno y el entorno antes de elevar la plataforma.",
      operation: "Antes de usarla se comprueban controles, parada de emergencia, estructura, ruedas, estabilizadores cuando existan, sistemas de descenso de emergencia y señalización. La plataforma debe utilizarse dentro de los límites establecidos por el fabricante.",
      maintenance: "El usuario realiza las comprobaciones previstas y comunica cualquier anomalía. Nunca deben anularse dispositivos de seguridad ni utilizarse el equipo de una forma distinta a la prevista.",
      practice: "Los ejercicios incluyen posicionamiento, obstáculos superiores, desplazamiento, trabajo cerca de bordes y actuación ante una emergencia."
    },
    "Grúas y Equipos de Elevación": {
      context: "Las operaciones de elevación requieren conocer la grúa, los accesorios de amarre y las características de la carga. Antes de cada maniobra se debe planificar el recorrido y mantener controlada la zona de influencia.",
      safety: "Una carga suspendida puede caer, balancearse o golpear obstáculos. La prevención se basa en seleccionar accesorios adecuados, respetar capacidades, evitar personas bajo la carga y utilizar señales o comunicaciones claras.",
      operation: "La maniobra comienza con la identificación de peso, centro de gravedad y puntos de amarre. Se realiza una elevación de comprobación y después se desplaza la carga suavemente, evitando tirones y movimientos innecesarios.",
      maintenance: "Los accesorios y equipos deben inspeccionarse y retirarse de servicio cuando presenten daños o dudas sobre su integridad. Las anomalías deben quedar comunicadas y registradas.",
      practice: "Los casos prácticos trabajan selección de accesorios, amarre, elevación de prueba, desplazamiento y colocación de cargas."
    },
    "Logística y Almacén": {
      context: "La logística de almacén coordina la recepción, ubicación, preparación y expedición de mercancías. Una organización correcta reduce desplazamientos, errores y riesgos y facilita la trazabilidad.",
      safety: "Los riesgos habituales incluyen caídas, golpes, atrapamientos, sobreesfuerzos y caída de objetos. Las medidas preventivas incluyen orden, señalización, circulación separada, uso correcto de equipos y manipulación adecuada.",
      operation: "La mercancía debe recibirse, identificarse y comprobarse antes de su ubicación. En la preparación de pedidos se verifica referencia, cantidad y estado del producto y se mantiene una secuencia de trabajo que reduzca errores.",
      maintenance: "El control de existencias exige registrar entradas y salidas, revisar ubicaciones y realizar inventarios. Los equipos y estanterías deben mantenerse en condiciones adecuadas y cualquier daño debe comunicarse.",
      practice: "Los ejercicios plantean recepción de mercancías, ubicación, picking, inventario, preparación de expediciones y resolución de incidencias."
    },
    "Prevención de Riesgos Laborales": {
      context: "La prevención parte de identificar los peligros existentes en el puesto y valorar cómo pueden afectar a las personas. La formación debe ayudar a reconocer riesgos antes de iniciar una tarea y a aplicar medidas preventivas eficaces.",
      safety: "Las medidas deben priorizar la eliminación o reducción del riesgo y las protecciones colectivas antes de recurrir al EPI. También son esenciales los procedimientos de trabajo, la señalización, la información y la comunicación de condiciones inseguras.",
      operation: "Una tarea segura se prepara revisando el entorno, los equipos, las instrucciones y las condiciones personales necesarias. Durante el trabajo se controla que las condiciones previstas se mantienen y se detiene la actividad cuando aparece un riesgo no controlado.",
      maintenance: "La prevención necesita seguimiento: inspecciones, comunicación de incidentes, revisión de procedimientos y actualización de medidas. La detección temprana de desviaciones evita que pequeñas anomalías se conviertan en accidentes.",
      practice: "Los casos prácticos presentan puestos de trabajo y piden identificar peligros, valorar situaciones y elegir medidas preventivas razonables."
    },
    "Informática y Competencias Digitales": {
      context: "Las competencias digitales permiten utilizar ordenadores, teléfonos, aplicaciones y servicios de Internet para realizar tareas profesionales. El aprendizaje parte de la organización de archivos y continúa con herramientas de productividad y comunicación.",
      safety: "La seguridad digital requiere contraseñas robustas, autenticación adicional cuando esté disponible, actualizaciones y precaución ante enlaces y archivos inesperados. La información personal y profesional debe tratarse con cuidado.",
      operation: "Una tarea digital eficiente se prepara definiendo el objetivo, seleccionando la herramienta y organizando la información. Documentos, hojas de cálculo y presentaciones deben mantenerse estructurados y fáciles de revisar.",
      maintenance: "El mantenimiento digital incluye actualizaciones, copias de seguridad, limpieza de archivos innecesarios y revisión de permisos. También conviene comprobar periódicamente la configuración de privacidad.",
      practice: "Los ejercicios simulan tareas de oficina, gestión de archivos, correo electrónico, navegación, creación de documentos y resolución de incidencias comunes."
    },
    "Inteligencia Artificial": {
      context: "La inteligencia artificial generativa puede ayudar a redactar, resumir, analizar información, crear ideas y automatizar determinadas tareas. Su utilidad depende de formular instrucciones claras y comprobar siempre los resultados.",
      safety: "No se deben introducir datos confidenciales sin conocer las condiciones del servicio. Las respuestas pueden contener errores o información inventada, por lo que una salida generada por IA no debe aceptarse automáticamente como correcta.",
      operation: "Un buen uso comienza definiendo objetivo, contexto, formato y restricciones. Después se revisa la respuesta, se corrigen instrucciones y se repite el proceso hasta obtener un resultado útil y verificable.",
      maintenance: "El trabajo con IA requiere conservar versiones útiles de instrucciones, revisar cambios de las herramientas y establecer criterios de comprobación. En tareas profesionales conviene documentar cuándo y cómo se utilizó la herramienta.",
      practice: "Los casos prácticos incluyen redactar un procedimiento, resumir información, transformar un texto, generar una lista de tareas y detectar errores en una respuesta de IA."
    },
    "Programación y Desarrollo": {
      context: "Programar consiste en transformar un problema en instrucciones que un sistema pueda ejecutar. Para ello se utilizan variables, condiciones, bucles, funciones y estructuras de datos.",
      safety: "El desarrollo seguro implica validar entradas, proteger credenciales y evitar exponer información sensible. También es importante revisar dependencias y comprobar el comportamiento antes de publicar una aplicación.",
      operation: "El proceso comienza definiendo el problema y dividiéndolo en partes pequeñas. Se escribe código, se ejecutan pruebas, se observan errores y se corrige de forma iterativa.",
      maintenance: "Un programa necesita documentación, control de versiones y revisiones. Los cambios deben realizarse de forma ordenada para poder identificar qué se modificó y recuperar una versión anterior si fuera necesario.",
      practice: "Los ejercicios plantean pequeños problemas de lógica, páginas web sencillas, validación de datos y depuración de errores."
    },
    "Ciberseguridad": {
      context: "La ciberseguridad busca proteger dispositivos, cuentas, redes y datos frente a accesos no autorizados, fraude, pérdida de información y otros incidentes.",
      safety: "Las amenazas más comunes incluyen phishing, contraseñas comprometidas, malware y engaños mediante ingeniería social. La prevención combina hábitos seguros, actualizaciones, copias de seguridad y controles de acceso.",
      operation: "Ante un mensaje sospechoso se debe verificar el remitente, evitar abrir enlaces o archivos dudosos y utilizar canales oficiales. Si se produce un incidente, conviene aislar el equipo afectado y comunicarlo siguiendo el procedimiento establecido.",
      maintenance: "La seguridad debe mantenerse en el tiempo mediante actualizaciones, revisión de permisos, copias de seguridad y comprobaciones periódicas. Las cuentas que ya no se utilizan deben cerrarse o deshabilitarse.",
      practice: "Los ejercicios presentan correos sospechosos, páginas falsas, dispositivos perdidos y contraseñas débiles para practicar decisiones seguras."
    }
  };

  const p = profiles[category] ?? {
    context: `El curso de ${title} introduce los conocimientos necesarios para comprender el sector de ${category}. Se explican los conceptos fundamentales, las herramientas habituales y la forma de organizar el trabajo antes de realizar una tarea profesional.`,
    safety: `La seguridad forma parte de todas las operaciones de ${category}. El alumno aprende a reconocer los peligros más habituales, aplicar medidas preventivas, utilizar correctamente los medios de protección cuando sean necesarios y comunicar cualquier condición insegura.`,
    operation: `Una operación profesional debe prepararse antes de comenzar. Se revisan las instrucciones, los recursos disponibles, el entorno y la secuencia de trabajo. Durante la ejecución se controla el resultado y se corrigen desviaciones sin improvisar procedimientos inseguros.`,
    maintenance: `El mantenimiento y la mejora continua requieren revisar los resultados, conservar la documentación y comunicar anomalías. Las comprobaciones periódicas permiten detectar problemas antes de que afecten a la calidad, la seguridad o la continuidad del trabajo.`,
    practice: `Los ejercicios del curso reproducen situaciones habituales del puesto de trabajo para que el alumno pueda aplicar los conceptos estudiados, identificar errores y elegir una actuación profesional adecuada.`
  };

  const modules = [
    { name:"Introducción y fundamentos", body:p.context, topics:[
      `Qué es ${title} y para qué se utiliza en el ámbito profesional.`,
      `Conceptos, vocabulario y principios que permiten interpretar correctamente las instrucciones de trabajo.`,
      `Funciones y responsabilidades habituales de la persona que desarrolla esta actividad.`,
      `Documentación, herramientas y recursos que conviene conocer antes de comenzar.`
    ]},
    { name:"Preparación y organización del trabajo", body:`Antes de iniciar una tarea de ${title}, es necesario preparar el puesto y comprobar que las condiciones permiten trabajar correctamente. Una buena preparación reduce errores y evita improvisaciones. El alumno aprende a interpretar instrucciones, organizar recursos, revisar el entorno y establecer una secuencia lógica de trabajo.`, topics:[
      `Comprobaciones iniciales y preparación del puesto de trabajo.`,
      `Selección y utilización adecuada de herramientas, equipos o recursos.`,
      `Organización de la tarea, orden de operaciones y control del tiempo.`,
      `Identificación de condiciones anómalas y comunicación antes de continuar.`
    ]},
    { name:"Operaciones y procedimientos", body:p.operation, topics:[
      `Procedimiento básico paso a paso para realizar las operaciones habituales.`,
      `Controles que deben realizarse durante la ejecución y criterios para detener una tarea.`,
      `Errores frecuentes, sus consecuencias y formas de evitarlos.`,
      `Comprobación final del resultado y registro de la actividad cuando corresponda.`
    ]},
    { name:"Seguridad y prevención", body:p.safety, topics:[
      `Identificación de los principales peligros relacionados con el puesto.`,
      `Medidas preventivas que deben aplicarse antes y durante el trabajo.`,
      `Uso correcto de protecciones colectivas y equipos de protección individual cuando proceda.`,
      `Actuación ante incidentes, emergencias y condiciones inseguras.`
    ]},
    { name:"Mantenimiento, calidad y buenas prácticas", body:p.maintenance, topics:[
      `Inspecciones y comprobaciones periódicas relacionadas con la actividad.`,
      `Detección y comunicación de defectos, averías o desviaciones.`,
      `Buenas prácticas para mantener calidad, orden, limpieza y trazabilidad.`,
      `Importancia de seguir las instrucciones del fabricante, empresa o procedimiento aplicable.`
    ]},
    { name:"Casos prácticos y preparación del test", body:`En la parte final se aplican los conocimientos a situaciones parecidas a las que pueden aparecer en un puesto de trabajo. El objetivo no es memorizar una lista de palabras, sino aprender a interpretar una situación, detectar el riesgo o problema, escoger una actuación adecuada y comprobar el resultado. El alumno debe repasar los conceptos anteriores antes de realizar el test gratuito.`, topics:[
      p.practice,
      `Caso práctico 1: preparar una tarea y detectar qué comprobaciones deben realizarse antes de comenzar.`,
      `Caso práctico 2: identificar una actuación incorrecta y explicar qué medida preventiva o procedimiento debería aplicarse.`,
      `Repaso final de conceptos, procedimientos, seguridad y buenas prácticas antes del test.`
    ]}
  ];

  return modules.map((m, i) => ({
    id: String(i + 1),
    title: `Módulo ${i + 1}: ${m.name}`,
    lesson: {
      title: `${m.name} — ${title}`,
      intro: m.body,
      points: m.topics
    }
  }));
}
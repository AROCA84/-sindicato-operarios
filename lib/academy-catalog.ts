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

  type Profile = {
    fundamentals: string;
    preparation: string;
    operation: string;
    safety: string;
    maintenance: string;
    practical: string;
    tools: string;
  };

  const profiles: Record<string, Profile> = {
    "Manutención y Carretillas": {
      fundamentals: "El alumno debe comprender el tipo de equipo, su función, capacidad nominal, centro de gravedad, estabilidad, mandos, dispositivos de seguridad y limitaciones indicadas por el fabricante. La formación debe relacionar cada concepto con las tareas reales que realizará el operador.",
      preparation: "Antes de utilizar el equipo se comprueba el estado general, ruedas, horquillas o implementos, mástil, dirección, frenos, alarmas, luces, fugas y sistemas de retención. También se revisan el suelo, pasillos, pendientes, peatones, estanterías, puertas y cualquier obstáculo del recorrido.",
      operation: "La operación comprende recogida de la carga, elevación, transporte, aproximación, depósito y retirada, realizando movimientos suaves y manteniendo la carga estable. El operador debe adaptar velocidad, altura y recorrido a la carga, al equipo y al entorno.",
      safety: "Los riesgos esenciales son vuelco, caída o desplazamiento de cargas, atropello, golpes y atrapamientos. Nunca se deben anular protecciones, transportar personas en posiciones no previstas ni trabajar con un equipo que presente una deficiencia de seguridad.",
      maintenance: "El operador realiza las comprobaciones previstas para el usuario y comunica inmediatamente defectos, daños o comportamientos anómalos. Las reparaciones y operaciones reservadas a personal competente no deben improvisarse.",
      practical: "Los casos prácticos deben incluir pasillos estrechos, cargas descentradas, rampas, cruces con peatones, estanterías, carga y descarga y pérdida de visibilidad.",
      tools: "Manual del fabricante, placa de características, checklist de inspección, señalización del centro de trabajo y procedimientos internos."
    },
    "Maquinaria y Movimiento de Tierras": {
      fundamentals: "El alumno debe conocer la función de la máquina, sus órganos de mando, implementos, dimensiones, masas, estabilidad y limitaciones de trabajo. Debe comprender cómo influyen el terreno, la pendiente y la carga en la estabilidad.",
      preparation: "Antes de arrancar se revisan accesos, niveles cuando corresponda, frenos, dirección, neumáticos u orugas, implementos, alarmas, protecciones y posibles fugas. El área de trabajo debe quedar delimitada y coordinada con peatones y otras máquinas.",
      operation: "Las maniobras se ejecutan progresivamente, evitando giros o cambios bruscos y manteniendo controlada la zona de influencia. La excavación, carga, descarga y circulación se realizan según el procedimiento y las instrucciones del fabricante.",
      safety: "Se controlan especialmente vuelcos, atropellos, atrapamientos, caída de materiales, zanjas, taludes e instalaciones enterradas o aéreas. Nunca se debe trabajar fuera de los límites de estabilidad o con personas dentro de zonas peligrosas.",
      maintenance: "Las inspecciones de usuario permiten detectar anomalías antes de trabajar. El mantenimiento que implique desmontaje, reparación o intervención técnica debe realizarlo personal autorizado y competente.",
      practical: "Los ejercicios deben plantear circulación, pendientes, excavación, carga, descarga, trabajo junto a otras máquinas y aparición de personas en la zona de peligro.",
      tools: "Manual de instrucciones, checklist, señalización de obra, planos o croquis del área y procedimiento de trabajo."
    },
    "Elevación y Plataformas": {
      fundamentals: "El alumno debe distinguir los tipos de plataforma, conocer sus componentes, mandos, capacidades, limitaciones, estabilización y dispositivos de seguridad. También debe comprender que trabajar en altura exige controlar simultáneamente máquina, terreno y entorno.",
      preparation: "Antes de elevar se inspeccionan estructura, barandillas, accesos, ruedas, estabilizadores cuando existan, mandos, parada de emergencia, alarmas y sistemas de descenso. Se comprueban terreno, desniveles, obstáculos, líneas eléctricas y condiciones meteorológicas.",
      operation: "La plataforma se posiciona de forma estable y los movimientos se realizan de manera progresiva. Se respetan la carga máxima, el número de ocupantes, la altura y alcance permitidos y las instrucciones específicas del fabricante.",
      safety: "Los riesgos incluyen caída de personas, vuelco, atrapamiento, colisión y contacto con obstáculos o instalaciones eléctricas. No se deben sobrecargar plataformas, utilizar como grúa ni anular dispositivos de seguridad.",
      maintenance: "El usuario realiza las comprobaciones previstas y deja constancia de las anomalías según el procedimiento del centro. Las reparaciones y ajustes reservados a mantenimiento deben quedar fuera de la intervención del operador.",
      practical: "Los ejercicios deben incluir posicionamiento, desplazamiento, obstáculos superiores, proximidad a bordes, viento o condiciones adversas y utilización del descenso de emergencia.",
      tools: "Manual del fabricante, marcado y documentación del equipo, checklist, señalización del área y procedimiento de rescate."
    },
    "Grúas y Equipos de Elevación": {
      fundamentals: "El alumno debe conocer la grúa, sus movimientos, capacidades, limitadores, mandos y accesorios. También debe comprender peso, centro de gravedad, puntos de amarre y consecuencias de una carga mal equilibrada.",
      preparation: "Antes de cada maniobra se inspeccionan equipo y accesorios, se identifica la carga y se planifica recorrido, zona de exclusión y comunicación. Las eslingas y accesorios deben ser adecuados para la carga y estar en condiciones de uso.",
      operation: "La maniobra comienza con una elevación de comprobación y continúa con movimientos suaves, evitando tirones y balanceos. Cuando interviene un señalista, las señales deben ser claras y acordadas y el operador debe detenerse si pierde la comunicación.",
      safety: "Nunca debe permanecer personal bajo una carga suspendida ni realizarse una maniobra que exceda la capacidad del equipo o accesorio. Deben controlarse balanceo, obstáculos, viento cuando sea relevante y acceso de personas a la zona peligrosa.",
      maintenance: "Los equipos y accesorios se someten a las comprobaciones establecidas. Eslingas, ganchos o elementos dañados, deformados o con dudas sobre su integridad deben retirarse del servicio y comunicarse.",
      practical: "Los casos deben trabajar selección de accesorios, eslingado, elevación de prueba, traslado, colocación, señales, balanceo y actuación ante una incidencia.",
      tools: "Manual de operación, tablas de carga, inspecciones de accesorios, señalización de maniobra y código de señales."
    },
    "Logística y Almacén": {
      fundamentals: "El alumno debe comprender el flujo de mercancías desde recepción hasta expedición, los sistemas de ubicación, identificación, inventario y trazabilidad. También debe conocer las responsabilidades asociadas a cada etapa.",
      preparation: "La preparación incluye comprobar referencias, cantidades, estado de la mercancía, ubicación, equipos disponibles y orden de trabajo. El puesto debe mantenerse despejado y las rutas de circulación claramente identificadas.",
      operation: "Las operaciones se realizan siguiendo una secuencia controlada: recibir, verificar, registrar, ubicar, preparar, comprobar y expedir. La trazabilidad permite localizar errores y corregirlos antes de que la mercancía salga.",
      safety: "Deben prevenirse caídas de objetos, golpes, atrapamientos, sobreesfuerzos y conflictos entre peatones y equipos móviles. Las cargas deben manipularse respetando límites, ayudas mecánicas y procedimientos del almacén.",
      maintenance: "El control de stock requiere registros fiables, inventarios y revisión de ubicaciones. Estanterías, equipos y zonas de trabajo deben conservarse en condiciones adecuadas y cualquier daño debe comunicarse.",
      practical: "Los ejercicios incluyen recepción, ubicación, picking, inventario, preparación de expediciones y resolución de diferencias entre stock físico y documental.",
      tools: "Etiquetas, órdenes de trabajo, sistemas de gestión de almacén, documentación de mercancía y equipos de manutención."
    },
    "Prevención de Riesgos Laborales": {
      fundamentals: "El alumno debe aprender a identificar peligros, valorar riesgos y relacionarlos con medidas preventivas. La prevención debe integrarse en la planificación de la tarea y no limitarse a actuar después de un incidente.",
      preparation: "Antes de trabajar se revisan instrucciones, equipos, entorno, condiciones personales y medidas preventivas previstas. Cuando las condiciones cambian, se debe reevaluar la situación antes de continuar.",
      operation: "Las tareas se ejecutan siguiendo procedimientos seguros y controlando que las medidas previstas se mantienen. Si aparece un riesgo no controlado, la actuación correcta es detenerse y comunicarlo.",
      safety: "La prevención prioriza eliminar o reducir el riesgo y utilizar protecciones colectivas antes que depender exclusivamente del EPI. También son esenciales señalización, formación, información y coordinación.",
      maintenance: "La mejora preventiva requiere inspecciones, investigación de incidentes, revisión de procedimientos y actualización de medidas. Las condiciones inseguras deben quedar comunicadas para evitar su repetición.",
      practical: "Los casos plantean puestos reales para identificar peligros, valorar situaciones, escoger medidas preventivas y decidir cuándo detener una tarea.",
      tools: "Evaluación de riesgos, procedimientos de trabajo, señalización, fichas de seguridad y equipos de protección cuando proceda."
    },
    "Informática y Competencias Digitales": {
      fundamentals: "El alumno debe conocer el funcionamiento básico de dispositivos, archivos, aplicaciones, navegación, correo y herramientas de productividad. La finalidad es realizar tareas digitales de forma ordenada, segura y verificable.",
      preparation: "Antes de una tarea se define el objetivo, se localizan los archivos necesarios y se selecciona la herramienta adecuada. Conviene utilizar nombres y carpetas coherentes para poder recuperar la información.",
      operation: "La ejecución debe seguir una secuencia clara y comprobar el resultado antes de cerrar o compartir un documento. Los errores deben identificarse y corregirse sin perder información original.",
      safety: "Se aplican contraseñas robustas, autenticación adicional, actualizaciones y precaución ante enlaces o archivos inesperados. La información personal y profesional debe protegerse.",
      maintenance: "El mantenimiento digital incluye actualizaciones, copias de seguridad, limpieza y revisión de permisos. También se debe comprobar periódicamente la configuración de privacidad.",
      practical: "Los ejercicios incluyen organizar archivos, redactar documentos, gestionar correo, navegar de forma segura y resolver incidencias habituales.",
      tools: "Ordenador o dispositivo móvil, sistema operativo, navegador, correo, herramientas ofimáticas y almacenamiento seguro."
    },
    "Inteligencia Artificial": {
      fundamentals: "El alumno debe comprender qué puede y qué no puede hacer una herramienta de IA generativa, cómo interpretar sus respuestas y por qué una respuesta aparentemente correcta puede contener errores.",
      preparation: "Antes de utilizar IA se define el objetivo, contexto, formato y restricciones. No se deben introducir datos confidenciales sin conocer las condiciones de tratamiento del servicio.",
      operation: "Una instrucción eficaz proporciona contexto suficiente y solicita una salida concreta. Después se revisa el resultado, se detectan errores y se reformula la petición cuando sea necesario.",
      safety: "Debe comprobarse la exactitud de la información, evitar datos sensibles y revisar posibles sesgos, errores o contenido inventado. La IA debe ser una herramienta de apoyo y no sustituir las comprobaciones profesionales necesarias.",
      maintenance: "Se deben conservar instrucciones útiles, revisar cambios de las herramientas y documentar los procesos importantes. Las respuestas utilizadas profesionalmente deben poder ser verificadas.",
      practical: "Los ejercicios incluyen redactar, resumir, transformar información, analizar datos y detectar errores en respuestas generadas.",
      tools: "Herramientas de IA, documentos de trabajo, fuentes verificables y sistemas de almacenamiento."
    },
    "Programación y Desarrollo": {
      fundamentals: "El alumno aprende a transformar un problema en datos, reglas y pasos ejecutables. Se trabajan variables, condiciones, bucles, funciones, estructuras de datos y organización del código.",
      preparation: "Antes de programar se define el objetivo, entradas, salidas y casos límite. Dividir el problema en partes pequeñas facilita escribir y comprobar el código.",
      operation: "El desarrollo consiste en escribir, ejecutar, probar, observar errores y corregir. Cada cambio debe comprobarse para evitar introducir nuevos problemas.",
      safety: "El código debe validar entradas, proteger credenciales y evitar exponer datos sensibles. También se revisan dependencias y permisos antes de publicar.",
      maintenance: "La documentación, las pruebas y el control de versiones permiten mantener el proyecto. Los cambios deben ser trazables para poder corregir o recuperar versiones.",
      practical: "Los ejercicios incluyen lógica, formularios, validación, pequeñas páginas web y depuración de errores.",
      tools: "Editor de código, navegador, terminal cuando proceda, control de versiones y herramientas de prueba."
    },
    "Ciberseguridad": {
      fundamentals: "El alumno debe comprender amenazas como phishing, malware, robo de credenciales, ingeniería social y pérdida de dispositivos. También debe conocer los principios de confidencialidad, integridad y disponibilidad.",
      preparation: "La preparación consiste en proteger cuentas, activar medidas de autenticación, actualizar dispositivos y conocer los procedimientos de reporte. Los accesos deben asignarse según necesidad.",
      operation: "Ante un mensaje o actividad sospechosa se verifica el origen y se evita actuar impulsivamente. Ante un incidente se sigue el procedimiento establecido, preservando evidencias y comunicando el problema.",
      safety: "Se deben utilizar contraseñas robustas, autenticación multifactor, actualizaciones, copias de seguridad y precaución con enlaces y archivos. Los permisos deben limitarse a lo necesario.",
      maintenance: "La seguridad requiere revisión periódica de cuentas, permisos, actualizaciones y copias de seguridad. Las cuentas que ya no se utilizan deben deshabilitarse.",
      practical: "Los ejercicios presentan correos sospechosos, páginas falsas, contraseñas débiles, dispositivos perdidos e incidentes de acceso.",
      tools: "Gestor de contraseñas, autenticación multifactor, copias de seguridad, antivirus y herramientas de administración autorizadas."
    }
  };

  const p = profiles[category] ?? {
    fundamentals: \`El curso de \${title} desarrolla los conocimientos fundamentales necesarios para comprender esta actividad profesional dentro del sector de \${category}. El alumno aprende el vocabulario, los principios de funcionamiento, las responsabilidades del puesto y la documentación que debe consultar antes de trabajar.\`,
    preparation: \`La preparación de una tarea de \${title} comienza revisando instrucciones, recursos, puesto, entorno y condiciones de trabajo. Organizar previamente la actividad permite reducir errores, evitar improvisaciones y detectar situaciones que deben comunicarse antes de continuar.\`,
    operation: \`Las operaciones de \${title} deben realizarse siguiendo una secuencia lógica y las instrucciones aplicables. Durante el trabajo se comprueba el resultado, se controlan las desviaciones y se detiene la actividad cuando las condiciones dejan de ser seguras o adecuadas.\`,
    safety: \`La seguridad en \${category} exige identificar los peligros propios de la tarea, aplicar medidas preventivas y utilizar correctamente las protecciones previstas. El alumno debe aprender a reconocer una condición insegura y comunicarla antes de que provoque daños.\`,
    maintenance: \`La calidad y continuidad del trabajo requieren inspecciones, orden, limpieza, documentación y comunicación de anomalías. Las operaciones técnicas que correspondan a personal especializado no deben improvisarse por el operador o trabajador que realiza la tarea habitual.\`,
    practical: \`Los casos prácticos reproducen situaciones habituales de \${title}: preparación del puesto, ejecución de una tarea, detección de un error, aplicación de una medida preventiva y comprobación final del resultado.\`,
    tools: \`El alumno debe familiarizarse con el manual, procedimientos, herramientas, equipos y documentación que se utilicen en el puesto concreto de \${title}. Cuando exista una instrucción específica del fabricante o de la empresa, esta debe prevalecer sobre una explicación genérica.\`
  };

  const moduleData = [
    {
      name: "Fundamentos y conocimiento del equipo o actividad",
      intro: p.fundamentals,
      sections: [
        [\`1.1 Qué es \${title}\`, \`El primer paso es entender qué trabajo realiza \${title}, cuál es su finalidad y qué límites tiene. El alumno debe relacionar la teoría con situaciones reales y saber explicar por qué cada elemento o procedimiento es necesario.\`, [\`Finalidad y aplicaciones profesionales de \${title}.\`, \`Conceptos y vocabulario que aparecen en manuales e instrucciones.\`, \`Responsabilidades del trabajador y límites de actuación.\`]],
        [\`1.2 Componentes, herramientas y elementos de trabajo\`, \`Se estudian los elementos que intervienen directamente en la actividad y la función de cada uno. Conocerlos permite detectar anomalías, interpretar instrucciones y evitar usos para los que un equipo o herramienta no está diseñado.\`, [p.tools, \`Identificación de elementos de mando, control o apoyo cuando existan.\`, \`Relación entre cada elemento y la operación que permite realizar.\`]],
        [\`1.3 Capacidades, limitaciones y documentación\`, \`La información del fabricante, procedimiento de empresa o documentación técnica establece condiciones de utilización que deben respetarse. El alumno aprende a localizar la información relevante antes de realizar una operación.\`, [\`Capacidad, límites de uso y condiciones de trabajo.\`, \`Manual de instrucciones, señalización y documentación aplicable.\`, \`Situaciones en las que debe consultarse al responsable o personal competente.\`]],
        [\`1.4 Responsabilidades profesionales\`, \`Una persona formada no solo debe saber ejecutar una tarea: también debe reconocer cuándo no puede realizarla de forma segura. La responsabilidad incluye respetar procedimientos, comunicar anomalías y no improvisar reparaciones o maniobras.\`, [\`Autorización y formación específica cuando sean exigibles.\`, \`Comunicación de defectos y condiciones inseguras.\`, \`Prohibición de anular dispositivos o realizar usos no previstos.\`]]
      ]
    },
    {
      name: "Preparación y organización del trabajo",
      intro: p.preparation,
      sections: [
        [\`2.1 Comprobaciones antes de comenzar\`, \`Antes de iniciar el trabajo se comprueba que el equipo, herramientas, puesto y entorno se encuentran en condiciones adecuadas. Una revisión inicial permite detectar problemas cuando todavía pueden corregirse sin exponer a personas o materiales.\`, [\`Revisión visual y funcional según el procedimiento aplicable.\`, \`Comprobación del entorno y de posibles obstáculos o interferencias.\`, \`Identificación y comunicación de anomalías.\`]],
        [\`2.2 Preparación del puesto\`, \`El puesto debe organizarse para que las operaciones puedan realizarse sin movimientos innecesarios ni interferencias. La señalización, el orden y la disponibilidad de recursos forman parte de la preparación profesional.\`, [\`Delimitación de zonas de trabajo cuando sea necesaria.\`, \`Orden y limpieza antes de comenzar.\`, \`Separación de personas, materiales y equipos cuando proceda.\`]],
        [\`2.3 Planificación de la tarea\`, \`Una tarea segura se divide en pasos y se anticipan los puntos en los que puede aparecer un problema. El trabajador debe conocer qué hacer, qué comprobar y en qué circunstancias debe detenerse.\`, [\`Secuencia lógica de operaciones.\`, \`Identificación de puntos críticos y condiciones de parada.\`, \`Coordinación con otros trabajadores cuando sea necesaria.\`]],
        [\`2.4 Preparación ante condiciones anómalas\`, \`Si el equipo, entorno o documentación no coincide con las condiciones previstas, no debe improvisarse. La situación debe quedar identificada y comunicada antes de continuar.\`, [\`Qué hacer ante una anomalía o información incompleta.\`, \`Cuándo detener una operación.\`, \`Comunicación al responsable correspondiente.\`]]
      ]
    },
    {
      name: "Operaciones y procedimientos de trabajo",
      intro: p.operation,
      sections: [
        [\`3.1 Procedimiento normal de trabajo\`, \`El alumno aprende la secuencia habitual de la actividad, desde el inicio hasta la comprobación final. Cada paso tiene una finalidad y debe ejecutarse respetando las limitaciones del equipo y del puesto.\`, [\`Inicio ordenado de la operación.\`, \`Ejecución progresiva y controlada.\`, \`Comprobación del resultado antes de finalizar.\`]],
        [\`3.2 Control durante la operación\`, \`Durante el trabajo deben observarse continuamente el equipo, el entorno y el resultado. Si cambia una condición relevante, la operación debe adaptarse o detenerse siguiendo el procedimiento establecido.\`, [\`Vigilancia del entorno y de las personas próximas.\`, \`Control de parámetros o señales relevantes.\`, \`Detención ante una condición no controlada.\`]],
        [\`3.3 Errores frecuentes y corrección\`, \`Los errores se analizan para comprender su causa y evitar que se repitan. La corrección debe realizarse de forma segura, sin ocultar la incidencia ni continuar una operación que haya perdido sus condiciones de seguridad.\`, [\`Errores de preparación, ejecución y comprobación.\`, \`Consecuencias sobre seguridad, calidad y materiales.\`, \`Comunicación y corrección según el procedimiento.\`]],
        [\`3.4 Finalización de la operación\`, \`Terminar una tarea correctamente implica dejar el equipo o puesto en condiciones seguras, conservar la documentación necesaria y comunicar las incidencias. La última comprobación forma parte del trabajo, no es un paso opcional.\`, [\`Parada y aseguramiento del equipo cuando corresponda.\`, \`Orden y limpieza del puesto.\`, \`Registro o comunicación de resultados e incidencias.\`]]
      ]
    },
    {
      name: "Seguridad, riesgos y prevención",
      intro: p.safety,
      sections: [
        [\`4.1 Identificación de peligros\`, \`El alumno debe ser capaz de reconocer los peligros antes de comenzar una tarea. Identificar el riesgo con antelación permite aplicar medidas preventivas antes de que ocurra un accidente.\`, [\`Peligros mecánicos, físicos, eléctricos, químicos u organizativos según el curso.\`, \`Personas, equipos y materiales potencialmente afectados.\`, \`Condiciones que aumentan la probabilidad o gravedad del daño.\`]],
        [\`4.2 Medidas preventivas\`, \`Las medidas preventivas deben actuar sobre el origen del riesgo siempre que sea posible y complementarse con protecciones colectivas, procedimientos y equipos de protección cuando proceda. El alumno aprende a distinguir una medida preventiva de una reacción posterior al accidente.\`, [\`Eliminación o reducción del riesgo.\`, \`Protecciones colectivas y señalización.\`, \`Uso correcto de EPI cuando sean necesarios.\`]],
        [\`4.3 Actuación ante incidentes y emergencias\`, \`Ante un incidente se debe mantener la seguridad de las personas, detener la operación cuando sea necesario y seguir el procedimiento de emergencia. No se deben realizar actuaciones para las que el trabajador no esté formado.\`, [\`Parada segura y aviso.\`, \`Protección de la zona y de las personas expuestas.\`, \`Comunicación y actuación conforme al plan de emergencia.\`]],
        [\`4.4 Conductas prohibidas y límites\`, \`Conocer lo que no debe hacerse es tan importante como conocer el procedimiento correcto. El alumno debe reconocer usos indebidos, improvisaciones y anulaciones de protecciones que puedan generar un riesgo grave.\`, [\`No utilizar equipos fuera de sus condiciones previstas.\`, \`No anular dispositivos de seguridad.\`, \`No continuar cuando exista un riesgo no controlado.\`]]
      ]
    },
    {
      name: "Mantenimiento, calidad y buenas prácticas",
      intro: p.maintenance,
      sections: [
        [\`5.1 Inspección y conservación\`, \`Las comprobaciones periódicas permiten detectar desgaste, daños y desviaciones antes de que afecten a la operación. El alcance de la intervención del usuario debe distinguirse del mantenimiento reservado a personal competente.\`, [\`Inspecciones previstas para el usuario.\`, \`Limpieza, orden y conservación.\`, \`Comunicación de defectos.\`]],
        [\`5.2 Calidad del trabajo\`, \`Una operación profesional debe producir el resultado previsto sin comprometer la seguridad. La calidad se comprueba mediante criterios objetivos, registros y revisión del resultado.\`, [\`Criterios de aceptación del trabajo.\`, \`Comprobación de errores o desviaciones.\`, \`Trazabilidad y registro cuando proceda.\`]],
        [\`5.3 Comunicación de averías e incidencias\`, \`Una anomalía debe comunicarse con información suficiente para que pueda evaluarse y corregirse. Ocultar un defecto o continuar utilizando un equipo inseguro puede aumentar el riesgo.\`, [\`Descripción clara de la anomalía.\`, \`Identificación del equipo o zona afectada.\`, \`Retirada de servicio cuando el procedimiento lo indique.\`]],
        [\`5.4 Buenas prácticas profesionales\`, \`El comportamiento profesional combina seguridad, orden, respeto por los procedimientos y comunicación. Las buenas prácticas deben mantenerse incluso cuando la tarea sea rutinaria o exista presión por terminar rápidamente.\`, [\`Orden y limpieza.\`, \`Uso responsable de equipos y recursos.\`, \`Respeto de instrucciones, límites y coordinación.\`]]
      ]
    },
    {
      name: "Casos prácticos, evaluación y preparación profesional",
      intro: p.practical,
      sections: [
        [\`6.1 Caso práctico: preparación de una tarea\`, \`Se plantea una situación de trabajo y el alumno debe identificar qué necesita conocer antes de empezar. El objetivo es demostrar que sabe convertir la teoría en una secuencia segura de actuación.\`, [\`Identificar equipo, tarea, entorno y riesgos.\`, \`Realizar las comprobaciones previas.\`, \`Decidir si existen condiciones para comenzar.\`]],
        [\`6.2 Caso práctico: incidencia durante el trabajo\`, \`La situación cambia durante la operación y el alumno debe decidir cómo actuar. Se valora que priorice la seguridad, detenga la actividad cuando corresponda y comunique correctamente la incidencia.\`, [\`Reconocer la nueva condición de riesgo.\`, \`Adoptar una parada o actuación segura.\`, \`Comunicar la incidencia por el canal establecido.\`]],
        [\`6.3 Caso práctico: actuación incorrecta\`, \`Se presenta una maniobra o procedimiento incorrecto y el alumno debe explicar qué parte falla y cómo debería realizarse. Esta actividad ayuda a preparar preguntas de razonamiento, no solo de memoria.\`, [\`Detectar el error.\`, \`Explicar la consecuencia posible.\`, \`Proponer la actuación conforme al procedimiento.\`]],
        [\`6.4 Repaso final y preparación del test\`, \`Antes del test gratuito, el alumno debe repasar fundamentos, preparación, operaciones, riesgos, mantenimiento y casos prácticos. Aprobar una prueba teórica demuestra conocimientos evaluados, pero no sustituye por sí solo la formación práctica o autorización que pueda exigir el puesto o la normativa aplicable.\`, [\`Repaso de conceptos y procedimientos.\`, \`Revisión de riesgos y medidas preventivas.\`, \`Realización del test y análisis de los errores.\`]]
      ]
    }
  ];

  return moduleData.map((m, i) => ({
    id: String(i + 1),
    title: \`Módulo \${i + 1}: \${m.name}\`,
    lesson: {
      title: \`\${m.name} — \${title}\`,
      intro: m.intro,
      points: m.sections.map((section) => section[0] as string),
      sections: m.sections.map((section) => ({
        heading: section[0] as string,
        text: section[1] as string,
        bullets: section[2] as string[]
      }))
    }
  }));
}

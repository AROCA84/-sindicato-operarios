export type Category =
  | "Maquinaria de Elevación"
  | "Movimiento de Tierras"
  | "Logística y PRL";

export type Course = {
  id: string;
  title: string;
  description: string;
  category: Category;
  image: string;
};

export const categories: Category[] = [
  "Maquinaria de Elevación",
  "Movimiento de Tierras",
  "Logística y PRL",
];

export type Lesson = {
  title: string;
  intro: string;
  points: string[];
};

export type Module = {
  id: string;
  title: string;
  lesson: Lesson;
};

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getTemario(course: Course): Module[] {
  return [
    {
      id: "modulo-1",
      title: "Módulo 1: Introducción y Tipos de Maquinaria",
      lesson: {
        title: "Conociendo el equipo y su clasificación",
        intro: `En este primer módulo del ${course.title.replace(/^Curso de /, "")} conocerás el equipo, sus componentes principales y las distintas variantes que encontrarás en el entorno de trabajo.`,
        points: [
          "Identificación de los componentes principales de la máquina y su función.",
          "Tipos y variantes según capacidad de carga, tracción y entorno de uso.",
          "Placa de características: cómo leer la capacidad nominal y el centro de carga.",
          "Documentación obligatoria: marcado CE, manual del fabricante y libro de mantenimiento.",
        ],
      },
    },
    {
      id: "modulo-2",
      title: "Módulo 2: Prevención de Riesgos Laborales (PRL) y Normativa",
      lesson: {
        title: "Seguridad, normativa y equipos de protección",
        intro:
          "La prevención es la base de todo trabajo con maquinaria. Aquí repasamos la normativa aplicable y los riesgos más habituales.",
        points: [
          "Marco legal: Ley 31/1995 de PRL y normativa específica del equipo.",
          "Equipos de protección individual (EPI) obligatorios: casco, calzado, chaleco y guantes.",
          "Riesgos frecuentes: vuelcos, atrapamientos, caídas y colisiones con peatones.",
          "Señalización de seguridad y delimitación de zonas de circulación.",
        ],
      },
    },
    {
      id: "modulo-3",
      title: "Módulo 3: Conducción, Manejo de Carga y Estabilidad",
      lesson: {
        title: "Operación segura y control de la carga",
        intro:
          "El corazón del curso: cómo operar la máquina con seguridad manteniendo la estabilidad en todo momento.",
        points: [
          "El triángulo de estabilidad y el efecto del centro de gravedad de la carga.",
          "Técnicas de recogida, transporte y depósito de cargas sin comprometer la estabilidad.",
          "Circulación en rampas, pendientes y superficies irregulares.",
          "Velocidad adecuada, visibilidad y maniobras en marcha atrás.",
        ],
      },
    },
    {
      id: "modulo-4",
      title: "Módulo 4: Mantenimiento y Revisiones Diarias",
      lesson: {
        title: "Revisión preoperacional y conservación",
        intro:
          "Un equipo bien mantenido es un equipo seguro. Aprende la revisión diaria y las tareas básicas de conservación.",
        points: [
          "Checklist de revisión preoperacional antes de cada turno.",
          "Comprobación de niveles, neumáticos, frenos y sistemas hidráulicos.",
          "Detección y comunicación de averías o anomalías.",
          "Carga de baterías y repostaje seguro según el tipo de máquina.",
        ],
      },
    },
  ];
}

export const courses: Course[] = [
  {
    id: "carretillero",
    title: "Curso de Carretillero / Toro (Carretilla Elevadora)",
    description:
      "Aprende a manejar la carretilla elevadora con seguridad: estabilidad, carga y circulación.",
    category: "Maquinaria de Elevación",
    image: "/cursos/carretilla-elevadora.png",
  },
  {
    id: "pemp",
    title: "Curso de Plataformas Elevadoras Móviles (PEMP)",
    description:
      "Trabajo en altura seguro con plataformas de tijera y de brazo articulado.",
    category: "Maquinaria de Elevación",
    image: "/cursos/pemp.png",
  },
  {
    id: "puente-grua",
    title: "Curso de Puente Grúa y Polipasto",
    description:
      "Operación de puentes grúa y polipastos: eslingado, señalización y maniobras.",
    category: "Maquinaria de Elevación",
    image: "/cursos/puente-grua.png",
  },
  {
    id: "transpaleta",
    title: "Curso de Transpaleta Manual y Eléctrica",
    description:
      "Uso correcto de transpaletas manuales y eléctricas en almacén y logística.",
    category: "Logística y PRL",
    image: "/cursos/transpaleta.png",
  },
  {
    id: "apilador",
    title: "Curso de Apilador Eléctrico",
    description:
      "Manejo del apilador eléctrico para estibar y desestibar en estanterías.",
    category: "Maquinaria de Elevación",
    image: "/cursos/apilador.png",
  },
  {
    id: "camion-pluma",
    title: "Curso de Camión Pluma / Grúa Autocargable",
    description:
      "Grúa autocargable sobre camión: cargas, estabilizadores y seguridad.",
    category: "Maquinaria de Elevación",
    image: "/cursos/camion-pluma.png",
  },
  {
    id: "dumper",
    title: "Curso de Dúmper y Movimiento de Tierras",
    description:
      "Conducción de dúmper y fundamentos del movimiento de tierras en obra.",
    category: "Movimiento de Tierras",
    image: "/cursos/dumper.png",
  },
  {
    id: "retropala",
    title: "Curso de Retropala y Pala Cargadora",
    description:
      "Manejo de retroexcavadora mixta y pala cargadora: excavación y carga.",
    category: "Movimiento de Tierras",
    image: "/cursos/retropala.png",
  },
  {
    id: "telescopica",
    title: "Curso de Carretilla Telescópica (Manitou)",
    description:
      "Operación de la manipuladora telescópica en obra y logística agrícola.",
    category: "Movimiento de Tierras",
    image: "/cursos/telescopica.png",
  },
  {
    id: "prl-almacen",
    title: "Curso de Prevención de Riesgos Laborales (PRL) en Almacén",
    description:
      "Prevención de riesgos y buenas prácticas de seguridad en el almacén.",
    category: "Logística y PRL",
    image: "/cursos/prl-almacen.png",
  },
  {
    id: "manipulacion-cargas",
    title: "Curso de Manipulación Manual de Cargas",
    description:
      "Técnicas de levantamiento y posturas seguras para evitar lesiones.",
    category: "Logística y PRL",
    image: "/cursos/manipulacion-cargas.png",
  },
  {
    id: "gestion-almacen",
    title: "Curso de Gestión de Almacén y Stock",
    description:
      "Organización del almacén, control de stock e inventario eficiente.",
    category: "Logística y PRL",
    image: "/cursos/gestion-almacen.png",
  },
];

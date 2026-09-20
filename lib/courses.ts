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

import { Fields } from 'react-spreadsheet-import/types/types';

export const productsFields: Fields<unknown> = [
  {
    label: 'Nombre del Producto',
    example: 'Polera',
    key: 'name',
    alternateMatches: ['nombre', 'productos'],
    fieldType: { type: 'input' },
    editable: true,
    validations: [
      {
        rule: 'required',
        errorMessage: 'La columna "Nombre" es requerida.',
        level: 'error',
      },
    ],
  },
  {
    label: 'Descripción',
    example: 'Polera de algodón',
    key: 'description',
    alternateMatches: ['descripcion', 'Descripcion'],
    fieldType: { type: 'input' },
    validations: [
      {
        rule: 'required',
        errorMessage: 'La columna "Descripción" es requerida.',
        level: 'error',
      },
    ],
  },
  {
    label: 'Categoría',
    example: 'Top Crop',
    key: 'category',
    alternateMatches: ['categoria', 'Categoria'],
    fieldType: { type: 'input' },
  },
  {
    label: 'Precio',
    example: '1000',
    key: 'price',
    alternateMatches: ['precio', 'Precio'],
    fieldType: { type: 'input' },
  },
  {
    label: 'Imagen',
    example: 'https://www.example.com/image.jpg',
    key: 'image',
    alternateMatches: ['imagen', 'Imagen'],
    fieldType: { type: 'input' },
  },
  {
    label: 'Tamaño',
    example: 'XL',
    key: 'size',
    alternateMatches: ['tamaño', 'Tamaño'],
    fieldType: { type: 'input' },
  },
  {
    label: 'Stock',
    example: '100',
    key: 'quantity',
    alternateMatches: ['stock', 'Stock'],
    fieldType: { type: 'input' },
  },
  {
    label: 'Género',
    example: 'Female',
    key: 'gender',
    alternateMatches: ['genero', 'Genero', 'Género', 'género'],
    fieldType: { type: 'input' },
  },
  {
    label: 'Color',
    example: 'Black',
    key: 'color',
    alternateMatches: ['color', 'Color'],
    fieldType: { type: 'input' },
  },
];

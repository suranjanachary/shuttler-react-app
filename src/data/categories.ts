import { Category } from '../types/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Rackets',
    subCategories: [],
  },
  {
    id: '2',
    name: 'Clothes',
    subCategories: [
      {
        id: '1',
        name: 'T-Shirts',
        categoryId: '2',
      },
      {
        id: '2',
        name: 'Shorts',
        categoryId: '2',
      },
      {
        id: '3',
        name: 'Skirts',
        categoryId: '2',
      },
    ],
  },
  {
    id: '3',
    name: 'Shuttles',
    subCategories: [],
  },
  {
    id: '4',
    name: 'Bags',
    subCategories: [],
  },
  {
    id: '5',
    name: 'Accessories',
    subCategories: [
      {
        id: '4',
        name: 'Grips',
        categoryId: '5',
      },
      {
        id: '5',
        name: 'Strings',
        categoryId: '5',
      },
      {
        id: '6',
        name: 'Wristbands',
        categoryId: '5',
      },
    ],
  },
  {
    id: '6',
    name: 'Shoes',
    subCategories: [],
  },
];
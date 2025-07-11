// constants/categories.js
export const CATEGORIES = [
  { 
    id: 1, 
    name: 'Works', 
    icon: 'briefcase', 
    color: '#FF6B9D',
    description: 'Matériel de travail et bureau'
  },
  { 
    id: 2, 
    name: 'Travel', 
    icon: 'airplane', 
    color: '#4ECDC4',
    description: 'Voyages et équipements de voyage'
  },
  { 
    id: 3, 
    name: 'Studying', 
    icon: 'book', 
    color: '#45B7D1',
    description: 'Matériel d\'étude et formation'
  },
];

export const CATEGORY_NAMES = CATEGORIES.map(cat => cat.name);

export const getCategoryByName = (name) => {
  return CATEGORIES.find(cat => cat.name === name);
};

export const getCategoryColor = (name) => {
  const category = getCategoryByName(name);
  return category ? category.color : '#FF6B9D';
};
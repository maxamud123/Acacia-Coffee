import { MenuItem, ServiceItem } from './types';

export const NAV_LINKS = [
  { name: 'Cafe', href: '#menu' },
  { name: 'Food', href: '#menu' },
  { name: 'About', href: '#about' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Reserve Table', href: '#reservation' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Breakfast & Brunch',
    description: 'Start your day with Rwandan tea, fresh chapati, and tropical fruits from the local market.',
    image: 'https://picsum.photos/id/1060/400/500',
  },
  {
    id: '2',
    title: 'Traditional Lunch',
    description: 'Experience authentic flavors with our signature Agatogo and Isombe dishes.',
    image: 'https://picsum.photos/id/1080/400/500',
  },
  {
    id: '3',
    title: 'Evening Grills',
    description: 'Enjoy the finest goat brochettes and grilled tilapia under the Kigali stars.',
    image: 'https://picsum.photos/id/431/400/500',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  {
    id: '1',
    name: 'African Tea & Chapati',
    description: 'Spiced milk tea with ginger, served with two fresh handmade chapatis.',
    price: '$8.00',
    category: 'breakfast',
    image: 'https://picsum.photos/id/431/100/100',
    seasonal: false,
  },
  {
    id: '7',
    name: 'Spanish Omelette',
    description: 'Three farm-fresh eggs with potatoes, onions, and bell peppers, served with toast.',
    price: '$9.00',
    category: 'breakfast',
    image: 'https://picsum.photos/id/102/100/100',
  },
  {
    id: '8',
    name: 'Tropical Fruit Platter',
    description: 'Seasonal selection of sweet mango, papaya, pineapple, passion fruit, and watermelon.',
    price: '$7.00',
    category: 'breakfast',
    image: 'https://picsum.photos/id/108/100/100',
  },
  
  // Lunch
  {
    id: '2',
    name: 'Agatogo with Beef',
    description: 'Plantains stewed with tender beef cubes, tomatoes, and traditional spices.',
    price: '$15.00',
    category: 'lunch',
    image: 'https://picsum.photos/id/835/100/100',
    seasonal: true,
  },
  {
    id: '3',
    name: 'Isombe with Funge',
    description: 'Mashed cassava leaves with spinach, eggplant, and peanut sauce.',
    price: '$12.00',
    category: 'lunch',
    image: 'https://picsum.photos/id/312/100/100',
  },
  {
    id: '9',
    name: 'Whole Grilled Tilapia',
    description: 'Fresh giant Tilapia from Lake Kivu, marinated and grilled, served with fried plantains.',
    price: '$22.00',
    category: 'lunch',
    image: 'https://picsum.photos/id/42/100/100',
  },
  {
    id: '10',
    name: 'Coconut Chicken Curry',
    description: 'Tender chicken breast simmered in fresh coconut milk, turmeric, and coriander.',
    price: '$16.00',
    category: 'lunch',
    image: 'https://picsum.photos/id/488/100/100',
  },

  // Dinner
  {
    id: '4',
    name: 'Goat Brochettes',
    description: 'Charcoal-grilled goat meat skewers marinated in local herbs, served with fries.',
    price: '$18.00',
    category: 'dinner',
    image: 'https://picsum.photos/id/75/100/100',
    seasonal: false,
  },
  {
    id: '5',
    name: 'Lake Kivu Sambaza',
    description: 'Crispy fried small fish from Lake Kivu, served with lemon and pili-pili sauce.',
    price: '$16.00',
    category: 'dinner',
    image: 'https://picsum.photos/id/493/100/100',
  },
  {
    id: '6',
    name: 'Akabenz Ribs',
    description: 'Slow-roasted marinated pork ribs, glazed with a sweet and tangy bbq sauce.',
    price: '$20.00',
    category: 'dinner',
    image: 'https://picsum.photos/id/429/100/100',
  },
  {
    id: '11',
    name: 'Pepper Steak',
    description: 'Premium beef tenderloin grilled to your liking with cracked peppercorn sauce.',
    price: '$24.00',
    category: 'dinner',
    image: 'https://picsum.photos/id/292/100/100',
  },

  // Drinks
  {
    id: '12',
    name: 'Rwandan Specialty Coffee',
    description: 'Premium single-origin Bourbon Arabica coffee, freshly brewed (Black or with Milk).',
    price: '$4.00',
    category: 'drinks',
    image: 'https://picsum.photos/id/425/100/100',
  },
  {
    id: '13',
    name: 'Fresh Passion Juice',
    description: 'Freshly squeezed passion fruit juice, sweet and tangy.',
    price: '$5.00',
    category: 'drinks',
    image: 'https://picsum.photos/id/431/100/100',
  },
  {
    id: '14',
    name: 'Ikivuguto',
    description: 'Traditional fermented milk, rich, creamy and naturally refreshing.',
    price: '$3.00',
    category: 'drinks',
    image: 'https://picsum.photos/id/326/100/100',
  },
  {
    id: '15',
    name: 'Virunga Mist Cocktail',
    description: 'Gin infused with local herbs, tonic, lime, and a hint of honey.',
    price: '$10.00',
    category: 'drinks',
    image: 'https://picsum.photos/id/419/100/100',
  },
];
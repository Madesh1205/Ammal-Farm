export interface Goat {
  id: string;
  name: string;
  aka: string;
  description: string;
  breed: string;
  age: string;
  weight: string;
  feedType: string;
  vaccination: string;
  status: 'available' | 'sold';
  image: string;
  images: string[];
  tags: string[];
  altText: string;
}

export const GOATS: Goat[] = [
  {
    id: 'nellore-jodipi-male-001',
    name: 'Nellore Jodipi',
    aka: 'Elite Breeding Buck',
    description: 'Elite linebred pure Nellore Jodipi goat with high skeleton density, supreme standing posture, and pristine characteristic black eye patches. Reared organically under free-grazing and premium fodder conditions in Vellore.',
    breed: 'Nellore Jodipi',
    age: '14 Months',
    weight: '55 kg (Live Weight)',
    feedType: 'CO-4 Fodder, Green Grass & Certified Grain Concentrate',
    vaccination: 'PPR, ET, and FMD complete vaccination schedules',
    status: 'available',
    image: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/Livestock/nellore-judipi.jpg',
    images: [
      'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/Livestock/nellore-judipi.jpg',
      '/nellore-jodipi-goat-for-sale-ammal-farm.jpg',
      '/pure-bred-nellore-jodipi-stud-goat-ammal-farm.jpg'
    ],
    tags: ['Premium', 'Farming Stock', 'Vellore'],
    altText: 'Nellore Jodipi breeding male goat with majestic black eye patches standing in a farm pasture at Ammal Farm Tamil Nadu'
  },
  {
    id: 'salem-black-buck-001',
    name: 'Salem Black',
    aka: 'Hardy Native Sire',
    description: 'Certified premium Salem Black male breeding goat. Highly localized, disease-resistant pedigree with rich glossy black coat. Best-suited for establishing native herd starters in dry and challenging climates.',
    breed: 'Salem Black',
    age: '12 Months',
    weight: '42 kg (Live Weight)',
    feedType: 'Natural Free-Grazing Range & Certified Pulse Bran',
    vaccination: 'Fully Dewormed, PPR & ET vaccinated',
    status: 'available',
    image: '/premium-salem-black-goat-breeding-male-ammal-farm.jpg',
    images: [
      '/premium-salem-black-goat-breeding-male-ammal-farm.jpg',
      '/healthy-breeding-buck-salem-black-goat-ammal-farm.jpg'
    ],
    tags: ['Indigenous', 'Hardy', 'Tamil Nadu'],
    altText: 'Purebred Salem Black breeding buck displaying rich glossy black coat standing on natural grazing land'
  },
  {
    id: 'nellore-jodipi-champion-002',
    name: 'Nellore Jodipi',
    aka: 'Grand Heavyweight Buck',
    description: 'A previously sold flagship Nellore Jodipi superstar. Features an extraordinary chest width and heavy bone structure, chosen for legacy breeding arrays in South India.',
    breed: 'Nellore Jodipi',
    age: '18 Months',
    weight: '72 kg',
    feedType: 'Organically Cultivated Legume Fodders & Probiotics',
    vaccination: 'Completed All Active Lifelong Schedules',
    status: 'sold',
    image: '/pure-bred-nellore-jodipi-stud-goat-ammal-farm.jpg',
    images: [
      '/pure-bred-nellore-jodipi-stud-goat-ammal-farm.jpg',
      '/nellore-jodipi-goat-for-sale-ammal-farm.jpg'
    ],
    tags: ['Champion', 'Heavyweight', 'Sold'],
    altText: 'Grand champion Nellore Jodipi heavyweight buck showing strong bone structure in outdoor farm yard'
  },
  {
    id: 'salem-black-doe-002',
    name: 'Salem Black',
    aka: 'High-Fecundity Breeder',
    description: 'A highly maternal, sleek native Salem Black doe sold to a premium herd operator in Tamil Nadu. Selected for higher twinning rates and extreme survival resilience.',
    breed: 'Salem Black',
    age: '16 Months',
    weight: '38 kg',
    feedType: 'Sorghum leaves, Tree loppings & Concentrates',
    vaccination: 'Dewormed, PPR vaccinated',
    status: 'sold',
    image: '/healthy-breeding-buck-salem-black-goat-ammal-farm.jpg',
    images: [
      '/healthy-breeding-buck-salem-black-goat-ammal-farm.jpg',
      '/premium-salem-black-goat-breeding-male-ammal-farm.jpg'
    ],
    tags: ['High Fecundity', 'Resilient', 'Sold'],
    altText: 'Highly resilient Salem Black elite breeding female doe foraging naturally under shade trees'
  }
];

export const POULTRY = [
  { 
    name: 'Country Chicken (Nattu Kozhi)', 
    type: 'Free Range - Tamil Nadu', 
    image: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/country-chicken.jpg',
    altText: 'Healthy free-range country chicken or Nattu Kozhi foraging in the green fields of Ammal Farm'
  },
  { 
    name: 'Kadaknath (Black Chicken)', 
    type: 'Medicinal Value - TN', 
    image: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/black-chicken.jpg',
    altText: 'Elite pure black Kadaknath chicken known for highly nutritious medicinal value at a free-range farm in Tamil Nadu'
  },
  { 
    name: 'Turkey (Van Kozhi)', 
    type: 'Seasonal Special', 
    status: 'Limited Availability', 
    image: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/turkey.jpg',
    altText: 'Plump farm-raised Turkey or Van Kozhi bird standing proudly on sustainable pastures'
  },
  { 
    name: 'Ducks (Vaathu)', 
    type: 'Farm Raised', 
    status: 'Year Round', 
    image: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/ducks.jpg',
    altText: 'Glistening farm-raised ducks enjoying natural pond water and open grassy fields'
  }
];

export const EGGS = [
  { name: 'Chicken Eggs', type: 'Farm Fresh', price: 'Contact for deals' },
  { name: 'Turkey Eggs', type: 'Limited/Nutritious', price: 'Contact for availability' },
  { name: 'Duck Eggs', type: 'Rich & Large', price: 'Contact for availability' }
];

export const whatsappNumber = "+916380898358";
export const mapsLink = "https://maps.app.goo.gl/nsvn6YGBHCA3QQvf9";
export const instagramUrl = "https://www.instagram.com/ammal_farm";

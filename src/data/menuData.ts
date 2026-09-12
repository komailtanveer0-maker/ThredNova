import { MenuItem, DealItem, VideoReel } from '../types';
import regeneratedDeal1Img from '../assets/images/regenerated_image_1789214547637.png';
import regeneratedDeal2Img from '../assets/images/regenerated_image_1789214556946.png';
import regeneratedDeal3Img from '../assets/images/regenerated_image_1789214562459.png';

export const PIZZAGARDEN_CONTACT = {
  name: 'PizzaGarden Chakwal',
  slogan: 'Taste · Ambience · Services',
  phone: '+92 329 6864242',
  phoneRaw: '+923296864242',
  whatsappRaw: '923296864242',
  address: 'Talagang Hwy, opposite NFC, Chakwal, Punjab, Pakistan',
  openingHours: '11:00 AM – 1:00 AM Daily',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  deliveryMinOrder: 500,
  deliveryFeeDefault: 100,
};

export const VIDEO_REELS: VideoReel[] = [
  {
    id: 'reel-kitchen',
    title: 'Fresh From The Oven',
    tagline: 'Live Kitchen Craft & Cheesy Pulls',
    videoUrl: '/assets/videos/pizzagarden-kitchen-reel.mp4',
    posterUrl: '/assets/videos/kitchen-thumb.jpg',
    duration: '14.3s',
    aspectRatio: '9:16',
    features: [
      '100% Real Mozzarella Melt',
      'Fresh Handmade Dough & Herbs',
      'Stuffed Behari Spin Rolls',
      'Crispy Golden Crusts'
    ],
    description: 'Get a front-row seat to the PizzaGarden culinary station. Watch our chefs prepare signature wood-style oven baked pizzas and sizzling stuffed rolls in Chakwal.'
  },
  {
    id: 'reel-ambience',
    title: 'Experience PizzaGarden',
    tagline: 'Taste · Ambience · Services',
    videoUrl: '/assets/videos/pizzagarden-ambience-reel.mp4',
    posterUrl: '/assets/videos/ambience-thumb.jpg',
    duration: '35.6s',
    aspectRatio: '9:16',
    features: [
      'Fairy Light Lit Grand Entrance',
      'Lush Indoor Palms & Greenery',
      'Cozy Amber Lighting & Arches',
      'Private Family Dining Booths'
    ],
    description: 'Immerse yourself in Chakwal’s premier dining destination. Featuring modern architectural arches, warm pendant glow, relaxed indoor palm gardens, and spacious family seating.'
  }
];

export const DEALS: DealItem[] = [
  {
    id: 'deal-train-pizza',
    title: 'The Big Boss Train Pizza',
    subtitle: '36-Inches of Pure Feast (Choose Any 3 Flavours)',
    price: 3599,
    originalPrice: 4200,
    items: [
      '36-Inch Continuous Giant Pizza Board',
      'Pick 3 Signature Flavours (Tikka, Ranch Drizzle, Super Supreme)',
      'Feeds 6 to 8 Hungry Foodies',
      'Includes House Garlic Dips & Seasoning'
    ],
    image: '/assets/images/train_pizza_1789213434117.jpg',
    posterImage: '/assets/images/train-pizza-poster.svg',
    badge: '★ BIG BOSS RECORD 36"',
    serves: '6 - 8 Persons',
    description: 'Our show-stopping 36-inch rectangular Train Pizza served on a rustic wooden plank with three of your favorite flavors side-by-side.'
  },
  {
    id: 'deal-family-1',
    title: 'Family Deal 1',
    subtitle: 'Extra Large Supreme Feast with All Sides',
    price: 4899,
    originalPrice: 5600,
    items: [
      '1 Extra Large Handcrafted Pizza (Any Flavor)',
      'Crispy Patty Burgers',
      '4 Pieces Tender Malai Rolls',
      '10 Pieces Crispy Golden Nuggets',
      '1 Fresh Russian Salad Bowl',
      '2 Bottles Cold Drink (1.5 Litre each)'
    ],
    image: regeneratedDeal1Img,
    posterImage: regeneratedDeal1Img,
    badge: 'FAMILY COMBO',
    serves: '5 - 7 Persons',
    description: 'The ultimate family table spread! A massive XL pizza accompanied by burgers, malai rolls, crispy nuggets, chilled drinks, and sweet Russian salad.'
  },
  {
    id: 'deal-mega-treat-3',
    title: 'Mega Treat Fit For 3',
    subtitle: 'Medium Pizza + Spin Rolls + Cheese Fries',
    price: 2299,
    originalPrice: 2750,
    items: [
      '1 Medium Pizza of Your Choice',
      'Fresh Baked Behari Spin Rolls',
      'Loaded Golden Cheese Fries',
      '1 Litre Chilled Cold Drink'
    ],
    image: regeneratedDeal2Img,
    posterImage: regeneratedDeal2Img,
    badge: 'BESTSELLER TRIO',
    serves: '3 Persons',
    description: 'Share the mega treat cravings with friends or family. Fresh oven baked medium pizza paired with stuffed Behari rolls and hot melted cheese fries.'
  },
  {
    id: 'deal-mega-treat-2',
    title: 'Mega Treat Good For 2',
    subtitle: 'Small Pizza + 5 Wings + Zinger Burger + 2 Drinks',
    price: 1699,
    originalPrice: 2050,
    items: [
      '1 Small Pizza of Your Choice',
      '5 Oven Baked Crispy Wings',
      '1 Signature Zingerita Crispy Burger',
      '2 Regular Chilled Soft Drinks'
    ],
    image: regeneratedDeal3Img,
    posterImage: regeneratedDeal3Img,
    badge: 'COUPLES & DUO',
    serves: '2 Persons',
    description: 'Two cravings in one mega treat! Combines a hot cheesy pizza, succulent baked wings, crispy chicken zinger burger, and twin drinks.'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Special Pizzas
  {
    id: 'p-lovers-special',
    name: 'Pizza Lovers Special',
    category: 'special-pizzas',
    description: 'Our signature specialty pie loaded with marinated smoked chicken, sausages, black olives, bell peppers, sweet corn, and double mozzarella.',
    price: 1400,
    sizes: [
      { size: 'Small', price: 800 },
      { size: 'Medium', price: 1400 },
      { size: 'Large', price: 1850 },
      { size: 'X-Large', price: 2600 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg',
    badge: 'Chef Signature',
    isPopular: true
  },
  {
    id: 'p-richard-kebab',
    name: 'Richard Kebab Pizza',
    category: 'special-pizzas',
    description: 'Succulent seekh kebab bites baked into garlic crust with spicy marinara, onions, and rich mozzarella cheese.',
    price: 1400,
    sizes: [
      { size: 'Small', price: 800 },
      { size: 'Medium', price: 1400 },
      { size: 'Large', price: 1850 },
      { size: 'X-Large', price: 2600 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg',
    badge: 'Kebab Special',
    isSpicy: true
  },
  {
    id: 'p-super-supreme',
    name: 'Super Supreme Pizza',
    category: 'special-pizzas',
    description: 'Classic meat lovers and veggie blend: tender chicken fajita, beef chunks, mushrooms, crunchy green peppers, onions, and ripe black olives.',
    price: 1400,
    sizes: [
      { size: 'Small', price: 800 },
      { size: 'Medium', price: 1400 },
      { size: 'Large', price: 1850 },
      { size: 'X-Large', price: 2600 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg',
    isPopular: true
  },
  {
    id: 'p-peri-peri',
    name: 'Peri Peri Hot Pizza',
    category: 'special-pizzas',
    description: 'Zesty Portuguese style peri-peri sauce glazed over roasted chicken chunks, jalapeños, onions, and melted mozzarella.',
    price: 1400,
    sizes: [
      { size: 'Small', price: 800 },
      { size: 'Medium', price: 1400 },
      { size: 'Large', price: 1850 },
      { size: 'X-Large', price: 2600 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg',
    badge: 'Spicy Kick',
    isSpicy: true
  },
  {
    id: 'p-barbe-fine',
    name: 'Barbe Fine Pizza',
    category: 'special-pizzas',
    description: 'Smoky hickory barbecue sauce base, pulled grilled chicken, caramelized red onions, and melted golden cheese.',
    price: 1400,
    sizes: [
      { size: 'Small', price: 800 },
      { size: 'Medium', price: 1400 },
      { size: 'Large', price: 1850 },
      { size: 'X-Large', price: 2600 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg'
  },
  {
    id: 'p-delight',
    name: 'Pizza Delight Signature',
    category: 'special-pizzas',
    description: 'A creamy white garlic herb sauce with smoked breast chunks, sliced mushrooms, sweet capsicum, and herb mozzarella.',
    price: 1400,
    sizes: [
      { size: 'Small', price: 800 },
      { size: 'Medium', price: 1400 },
      { size: 'Large', price: 1850 },
      { size: 'X-Large', price: 2600 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg',
    isPopular: true
  },

  // Traditional Pizzas
  {
    id: 'p-chicken-tikka',
    name: 'Chicken Tikka Traditional',
    category: 'traditional-pizzas',
    description: 'Authentic Desi spiced chicken tikka morsels, rings of red onions, spicy tomato sauce, and golden mozzarella.',
    price: 1200,
    sizes: [
      { size: 'Small', price: 600 },
      { size: 'Medium', price: 1200 },
      { size: 'Large', price: 1600 },
      { size: 'X-Large', price: 2300 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg',
    badge: 'Local Favorite',
    isPopular: true
  },
  {
    id: 'p-chicken-fajita',
    name: 'Chicken Fajita Classic',
    category: 'traditional-pizzas',
    description: 'Mexican style fajita seasoned chicken breast, bell peppers, fresh onion slices, and hot marinara cheese blend.',
    price: 1200,
    sizes: [
      { size: 'Small', price: 600 },
      { size: 'Medium', price: 1200 },
      { size: 'Large', price: 1600 },
      { size: 'X-Large', price: 2300 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg'
  },
  {
    id: 'p-tandoori',
    name: 'Tandoori Hot Pizza',
    category: 'traditional-pizzas',
    description: 'Fire roasted tandoori spiced chicken cubes, green chilies, cilantro aroma, and melted mozzarella.',
    price: 1200,
    sizes: [
      { size: 'Small', price: 600 },
      { size: 'Medium', price: 1200 },
      { size: 'Large', price: 1600 },
      { size: 'X-Large', price: 2300 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg',
    isSpicy: true
  },
  {
    id: 'p-cheese-lover',
    name: 'Cheese Lover Margherita',
    category: 'traditional-pizzas',
    description: 'Pure dairy indulgence with a thick layer of stringy mozzarella, sharp cheddar, Italian tomato sauce, and oregano.',
    price: 1200,
    sizes: [
      { size: 'Small', price: 600 },
      { size: 'Medium', price: 1200 },
      { size: 'Large', price: 1600 },
      { size: 'X-Large', price: 2300 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg',
    isVegetarian: true
  },
  {
    id: 'p-veggie-lover',
    name: 'Garden Veggie Lover',
    category: 'traditional-pizzas',
    description: 'Crunchy green peppers, sweet red onions, juicy tomatoes, button mushrooms, and Spanish black olives.',
    price: 1200,
    sizes: [
      { size: 'Small', price: 600 },
      { size: 'Medium', price: 1200 },
      { size: 'Large', price: 1600 },
      { size: 'X-Large', price: 2300 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg',
    isVegetarian: true
  },

  // Crust Specials & Train Pizza
  {
    id: 'p-train-pizza-single',
    name: 'The Big Boss Train Pizza (36")',
    category: 'crust-specials',
    description: 'The monumental 36-inch rectangular feast! Feeds up to 8 people. Choose three distinct flavours in one epic wooden board.',
    price: 3599,
    sizes: [
      { size: '36-Inch', price: 3599 }
    ],
    image: '/assets/images/train_pizza_1789213434117.jpg',
    badge: '36-Inch Monster',
    isPopular: true,
    flavours: ['Chicken Tikka', 'Mayo Garlic Ranch', 'Super Supreme', 'Fajita', 'Peri Peri']
  },
  {
    id: 'p-crispy-chicken-crust',
    name: 'Crispy Chicken Pizza',
    category: 'crust-specials',
    description: '"Crunchy Till The Last Bite" — topped with crispy golden fried chicken tenders, house sauce, and loaded mozzarella.',
    price: 1750,
    sizes: [
      { size: 'Large', price: 1750 },
      { size: 'X-Large', price: 2400 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg',
    badge: 'Crunchy Crust'
  },
  {
    id: 'p-stuffed-crust',
    name: 'Stuffed Crust Pizza',
    category: 'crust-specials',
    description: 'Outer ring generously stuffed with gooey mozzarella cheese strings and savory herbs. Choice of up to 3 gourmet toppings.',
    price: 1800,
    sizes: [
      { size: 'Medium', price: 1800 },
      { size: 'Large', price: 2300 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg'
  },
  {
    id: 'p-crown-crust',
    name: 'Crown Crust Royal Pizza',
    category: 'crust-specials',
    description: 'Majestic crown edges folded into pockets filled with chicken kebab and molten cheese sauce.',
    price: 2000,
    sizes: [
      { size: 'Large', price: 2000 },
      { size: 'X-Large', price: 2700 }
    ],
    image: '/assets/images/pizza_delight_1789213397214.jpg'
  },

  // Burgers & Grilled
  {
    id: 'b-zingerita',
    name: 'Zingerita Crispy Burger',
    category: 'burgers',
    description: 'Whole chicken breast marinated in hot spices, double crunch breaded, with crisp iceberg lettuce and garlic mayo on toasted sesame buns.',
    price: 500,
    image: '/assets/images/zinger_burger_1789213414778.jpg',
    badge: 'Top Burger',
    isPopular: true
  },
  {
    id: 'b-pizza-burger',
    name: 'Pizza Burger Special',
    category: 'burgers',
    description: 'Where burger meets pizza! Juicy patty layered with pizza sauce, melted mozzarella, black olives, and herbs.',
    price: 600,
    image: '/assets/images/zinger_burger_1789213414778.jpg',
    badge: 'Hybrid Special'
  },
  {
    id: 'b-malai-grilled',
    name: 'Malai Grilled Chicken Burger',
    category: 'burgers',
    description: 'Tender chicken fillet marinated in creamy malai boti yogurt spices, chargrilled and topped with house dressing.',
    price: 750,
    image: '/assets/images/zinger_burger_1789213414778.jpg'
  },
  {
    id: 'b-chapli',
    name: 'Peshawari Chapli Burger',
    category: 'burgers',
    description: 'Authentic spiced beef chapli patty with tomato slice, mint chutney, and caramelized onion relish.',
    price: 460,
    image: '/assets/images/zinger_burger_1789213414778.jpg'
  },
  {
    id: 'b-patty',
    name: 'Classic Chicken Patty Burger',
    category: 'burgers',
    description: 'Golden seasoned patty with fresh cucumber, lettuce, and creamy burger mayo.',
    price: 350,
    image: '/assets/images/zinger_burger_1789213414778.jpg'
  },

  // Crispy Fried Chicken
  {
    id: 'fc-1pc',
    name: 'Crispy Fried Chicken (1 Pc Meal)',
    category: 'fried-chicken',
    description: '1 piece signature crispy fried chicken, served with 1 hot bun, golden French fries, and garlic dip sauce.',
    price: 400,
    image: '/assets/images/zinger_burger_1789213414778.jpg'
  },
  {
    id: 'fc-3pc',
    name: 'Crispy Fried Chicken (3 Pcs Meal)',
    category: 'fried-chicken',
    description: '3 pieces crispy spiced fried chicken, served with 2 buns, generous French fries, and 2 garlic mayo dips.',
    price: 900,
    image: '/assets/images/zinger_burger_1789213414778.jpg',
    isPopular: true
  },
  {
    id: 'fc-9pc',
    name: 'Bucket Fried Chicken (9 Pcs Bucket)',
    category: 'fried-chicken',
    description: '9 pieces crispy fried chicken family bucket, served with 8 buns, jumbo French fries, and 4 creamy dips.',
    price: 2150,
    image: '/assets/images/zinger_burger_1789213414778.jpg',
    badge: 'Feast Bucket'
  },

  // Appetizers & Sides
  {
    id: 'app-spin-rolls',
    name: 'Signature Behari Spin Rolls',
    category: 'appetizers',
    description: 'Fresh dough rolled around tender spicy chicken filling and mozzarella, baked to golden brown and served with garlic mayo.',
    price: 650,
    image: '/assets/images/spin_rolls_1789213450425.jpg',
    badge: 'Must Try',
    isPopular: true
  },
  {
    id: 'app-baked-wings',
    name: 'Oven Baked Wings (10 Pcs)',
    category: 'appetizers',
    description: 'Slow roasted chicken wings glazed in spicy tangy barbecue sauce, baked till sticky and tender.',
    price: 750,
    image: '/assets/images/spin_rolls_1789213450425.jpg'
  },
  {
    id: 'app-hot-shots',
    name: 'Crispy Hot Shots (10 Pcs)',
    category: 'appetizers',
    description: 'Bite-sized boneless chicken crunchies with spicy seasoning and dip.',
    price: 600,
    image: '/assets/images/zinger_burger_1789213414778.jpg'
  },
  {
    id: 'app-nuggets',
    name: 'Golden Chicken Nuggets (10 Pcs)',
    category: 'appetizers',
    description: 'Crispy breaded tender chicken nuggets loved by kids and adults alike.',
    price: 500,
    image: '/assets/images/spin_rolls_1789213450425.jpg'
  },

  // Pasta & Fries
  {
    id: 'pf-cheese-fries',
    name: 'Loaded Cheese Fries',
    category: 'pasta-fries',
    description: 'Crispy potato fries smothered in warm molten cheddar cheese sauce and seasoned with herbs.',
    price: 450,
    image: '/assets/images/zinger_burger_1789213414778.jpg',
    isPopular: true
  },
  {
    id: 'pf-special-pasta',
    name: 'Chef Special Oven Baked Pasta',
    category: 'pasta-fries',
    description: 'Penne pasta tossed in spicy red & white sauce with chicken, covered in mozzarella and baked until bubbly.',
    price: 600,
    image: '/assets/images/pizza_delight_1789213397214.jpg',
    badge: 'House Baked'
  },
  {
    id: 'pf-lasagne',
    name: 'Italian Lasagne Pasta',
    category: 'pasta-fries',
    description: 'Multi-layered pasta sheets with rich meat bolognese sauce, bechamel cream, and melted cheese crust.',
    price: 750,
    image: '/assets/images/pizza_delight_1789213397214.jpg'
  },

  // Beverages
  {
    id: 'bev-cold-drink-15',
    name: 'Cold Drink Bottle (1.5 Litre)',
    category: 'beverages',
    description: 'Choice of chilled Coca-Cola, Sprite, or Fanta 1.5L bottle.',
    price: 250,
    image: '/assets/images/pizza_delight_1789213397214.jpg'
  },
  {
    id: 'bev-cold-drink-can',
    name: 'Cold Drink Can / Regular',
    category: 'beverages',
    description: 'Chilled 250ml canned soda (Coke, Sprite, Fanta, Dew).',
    price: 120,
    image: '/assets/images/pizza_delight_1789213397214.jpg'
  },
  {
    id: 'bev-water',
    name: 'Mineral Water (500ml)',
    category: 'beverages',
    description: 'Pure chilled mineral spring water.',
    price: 90,
    image: '/assets/images/pizza_delight_1789213397214.jpg'
  }
];

export const FULL_MENU_POSTER_DEAL: DealItem = {
  id: 'full-menu-artwork',
  title: 'PizzaGarden Complete Menu Card',
  subtitle: 'Dine-In, Takeaway & Free Delivery Menu',
  price: 3599,
  items: [
    'Special Pizzas & Handcrafted Crusts',
    'The Big Boss 36" Train Pizza',
    'Crispy Fried Chicken & Zinger Burgers',
    'Signature Behari Spin Rolls',
    'Family & Super Saver Bundles'
  ],
  image: '/assets/images/menu_full_card.svg',
  posterImage: '/assets/images/menu_full_card.svg',
  badge: 'Complete Menu',
  serves: 'Chakwal Foodies',
  description: 'Official complete menu and pricing guide for PizzaGarden Chakwal. Located at Talagang Hwy, opposite NFC.'
};


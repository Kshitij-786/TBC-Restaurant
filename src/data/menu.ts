import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // --- APPETIZERS ---
  {
    id: 'ap-1',
    name: 'Veg Spring Roll',
    category: 'Appetizers',
    price: 60,
    description: 'Crisp wrapper filled with finely julienned garden vegetables and savory spices.',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'ap-2',
    name: 'Veg Crispy',
    category: 'Appetizers',
    price: 80,
    description: 'Crispy batter-fried mixed vegetables tossed in a tangy and sweet oriental sauce.',
    image: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-3',
    name: 'French Fries',
    category: 'Appetizers',
    price: 50,
    description: 'Golden-fried potato fingers salted to absolute perfection.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-4',
    name: 'Chilly Potato',
    category: 'Appetizers',
    price: 80,
    description: 'Crispy potato fingers tossed in a spicy, flavorful chili-garlic and soy glaze.',
    image: 'https://images.unsplash.com/photo-1518013006361-7aa47b9e0242?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-5',
    name: 'Honey Chilly Potato',
    category: 'Appetizers',
    price: 90,
    description: 'Crispy potatoes glazed with rich organic honey, hot chili, and sprinkled with sesame.',
    image: 'https://images.unsplash.com/photo-1518013006361-7aa47b9e0242?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'ap-6',
    name: 'Chilly Paneer (Dry/Gravy)',
    category: 'Appetizers',
    price: 130,
    description: 'Battered cottage cheese cubes tossed with bell peppers, onions, and spicy dark soy sauce.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'ap-7',
    name: 'Chilly Paneer Masala',
    category: 'Appetizers',
    price: 120,
    description: 'Cottage cheese wok-tossed with robust Chinese spices, fresh ginger, and green chilies.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-8',
    name: 'Manchurian (Dry/Gravy)',
    category: 'Appetizers',
    price: 100,
    description: 'Crispy vegetable rounds simmered in classic pungent coriander and garlic-soy Manchurian sauce.',
    image: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-9',
    name: 'Paneer Tikka',
    category: 'Appetizers',
    price: 120,
    description: 'Charcoal-grilled cottage cheese chunks marinated in highly aromatic tandoori red masala.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'ap-10',
    name: 'Paneer Hariyali Tikka',
    category: 'Appetizers',
    price: 130,
    description: 'Cottage cheese pieces marinated in garden-fresh mint, cilantro, and yogurt blend, then clay-roasted.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-11',
    name: 'Tandoori Aaloo',
    category: 'Appetizers',
    price: 100,
    description: 'Scooped tandoori-baked baby potatoes loaded with seasoned paneer mash and mild dry fruits.',
    image: 'https://images.unsplash.com/photo-1518013006361-7aa47b9e0242?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-12',
    name: 'Paneer Garlic Tikka',
    category: 'Appetizers',
    price: 150,
    description: 'Charred paneer cubes infused with heavy crushed garlic, green coriander, and warm yellow spices.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-13',
    name: 'Malai Tikka (Veg)',
    category: 'Appetizers',
    price: 130,
    description: 'Melt-in-mouth soft paneer chunks marinated in rich cashew paste, cheese, and double dairy cream.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-14',
    name: 'Paneer Shashlik Tikka',
    category: 'Appetizers',
    price: 150,
    description: 'Spiced paneer skewered alongside juicy tomatoes, crisp onions, and vibrant bell pepper shells.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-15',
    name: 'Mushroom Tikka',
    category: 'Appetizers',
    price: 120,
    description: 'Fresh white button mushrooms marinated in classic tandoori curd and baked in clay oven.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-16',
    name: 'Mushroom Malai Tikka',
    category: 'Appetizers',
    price: 130,
    description: 'Juicy skewered mushrooms cooked in cream, cardamom paste, and crushed white peppercorns.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-17',
    name: 'Soya Malai Pasanda',
    category: 'Appetizers',
    price: 140,
    description: 'Soft soya chunks stuffed with nuts and spices, grilled with cream and cheese.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-18',
    name: 'Tandoori Soya',
    category: 'Appetizers',
    price: 120,
    description: 'Healthy soy protein sticks skewered and roasted with thick, spicy tandoori masalas.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-19',
    name: 'Tandoori Chicken (Half)',
    category: 'Appetizers',
    price: 195,
    description: 'Smoky half tandoori chicken cooked in classic clay oven over glowing coals.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-20',
    name: 'Tandoori Chicken (Full)',
    category: 'Appetizers',
    price: 360,
    description: 'Full platter of smoky roasted tandoori chicken marinated with red chili oil and local hand-ground spices.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'ap-21',
    name: 'Afgani Chicken (Half)',
    category: 'Appetizers',
    price: 200,
    description: 'Rich, non-spicy half portion chicken marinated in yogurt, cream, cashew butter and green cardamom.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-22',
    name: 'Afgani Chicken (Full)',
    category: 'Appetizers',
    price: 380,
    description: 'Succulent chicken slow-grilled in a creamy, velvety cashew-cardamom marinade with butter wash.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'ap-23',
    name: 'Chicken Tikka',
    category: 'Appetizers',
    price: 195,
    description: 'Boneless chicken cubes cooked on iron rods in coal kiln, infused with mustard oil.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-24',
    name: 'Murg Hariyali Tikka',
    category: 'Appetizers',
    price: 210,
    description: 'Clay-oven baked chicken thighs coated with thick pure spinach, coriander, and sour curd.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-25',
    name: 'Murg Malai Tikka',
    category: 'Appetizers',
    price: 210,
    description: 'Ultra-creamy boneless chicken kebab melts infused with cheese, butter, cream, and white pepper.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'ap-26',
    name: 'Murg Podina Tikka',
    category: 'Appetizers',
    price: 220,
    description: 'Sizzling chicken tikka flavored with wild mint extract, lemon and warm masalas.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-27',
    name: 'Murg Ajmani Tikka',
    category: 'Appetizers',
    price: 220,
    description: 'Special tandoori chicken bites flavored with carom seeds (Ajwain) and traditional spices.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-28',
    name: 'Murg Lehsuni Tikka',
    category: 'Appetizers',
    price: 230,
    description: 'Clay-oven baked hot chicken thighs finished with heavy garlic-butter glaze and sea salt.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-29',
    name: 'Chicken Sheek Kabab',
    category: 'Appetizers',
    price: 210,
    description: 'Juicy, butter-brushed skewers of minced chicken blended with onions and green herbs.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-30',
    name: 'Chilly Chicken (Dry/Gravy)',
    category: 'Appetizers',
    price: 200,
    description: 'Hakka-style crispy pan-tossed chicken chunks in rich soy sauce, ginger, garlic, and fresh green chilies.',
    image: 'https://images.unsplash.com/photo-1527477396000-e2cb862f9255?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'ap-31',
    name: 'Chicken Manchurian',
    category: 'Appetizers',
    price: 200,
    description: 'Crispy fried chicken balls simmered in a dark soy-coriander gravy.',
    image: 'https://images.unsplash.com/photo-1527477396000-e2cb862f9255?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-32',
    name: 'Chicken 65',
    category: 'Appetizers',
    price: 210,
    description: 'Classic deep-fried South Indian chicken appetizer tossed with curry leaves, yogurt, and mustard.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'ap-33',
    name: 'Chicken Crispy',
    category: 'Appetizers',
    price: 210,
    description: 'Crisp, thread-shredded golden chicken fillets glazed with sweet spicy chili-plum syrup.',
    image: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-34',
    name: 'Hot Garlic Chicken',
    category: 'Appetizers',
    price: 200,
    description: 'Sautéed tenders in sharp, thick, fiery hot garlic pepper glaze.',
    image: 'https://images.unsplash.com/photo-1527477396000-e2cb862f9255?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-35',
    name: 'Chicken Dragon',
    category: 'Appetizers',
    price: 210,
    description: 'Tender chicken slices wok-fried with fiery red cashew-nut and bell pepper sauce.',
    image: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-36',
    name: 'Schezwan Chilly Chicken',
    category: 'Appetizers',
    price: 210,
    description: 'Spiced up pan-grilled chicken pieces in extra spicy house-special Schezwan oil sauce.',
    image: 'https://images.unsplash.com/photo-1527477396000-e2cb862f9255?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-37',
    name: 'Mutton Boti Kabab',
    category: 'Appetizers',
    price: 250,
    description: 'Soft boneless mutton cubes slowly skewered and butter-braised in classic spicy tandoori paste.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-38',
    name: 'Mutton Seek Kabab',
    category: 'Appetizers',
    price: 250,
    description: 'Finely minced mutton skewered with whole cardamoms, ginger, and garlic paste, coal charred.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'ap-39',
    name: 'Mutton Lamb Chops',
    category: 'Appetizers',
    price: 260,
    description: 'Juicy rack cuts of mutton double-marinated in lime juice, raw papaya, and tandoori paste.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'ap-40',
    name: 'Dahi Kebab',
    category: 'Appetizers',
    price: 50,
    description: 'Soft, creamy curd discs lightly spiced and golden-crusted on hot pan griddle.',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-41',
    name: 'Cigar Paneer',
    category: 'Appetizers',
    price: 80,
    description: 'Cottage cheese spears seasoned and tightly wrapped in ultra-thin, crunchy pastry roll shells.',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'ap-42',
    name: 'Cigar Chicken',
    category: 'Appetizers',
    price: 100,
    description: 'Crisp-rolled spring rolls loaded with savory spiced ground chicken breast and spring greens.',
    image: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },

  // --- SIDE ORDER / MOMOS ---
  {
    id: 'mo-1',
    name: 'Plain Steamed Momos (Veg)',
    category: 'Side Order / Momos',
    price: 50,
    description: 'Traditional thin-wrapped hand-pleated dumplings filled with cabbage and onion garlic greens.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'mo-2',
    name: 'Paneer Momos',
    category: 'Side Order / Momos',
    price: 60,
    description: 'Handcrafted flour pockets filled with finely spiced fresh cottage cheese mash.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'mo-3',
    name: 'Chicken Momos',
    category: 'Side Order / Momos',
    price: 70,
    description: 'Savory flour skins filled with juicy ground seasoned chicken, served with extremely hot red chili dip.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'mo-4',
    name: 'Chinese Potli',
    category: 'Side Order / Momos',
    price: 50,
    description: 'Crunchy golden bag dumplings loaded with garlic-butter tossed vegetables.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'mo-5',
    name: 'Chinese Chopsey',
    category: 'Side Order / Momos',
    price: 70,
    description: 'Crisp-fried noodles topped with rich sweet-and-sour mixed vegetable glazes.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'mo-6',
    name: 'Chinese Lollipop (Veg)',
    category: 'Side Order / Momos',
    price: 60,
    description: 'Unique crisp vegetable drumsticks served with spicy hot garlic-chili dipping sauce.',
    image: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },

  // --- SOUP ---
  {
    id: 'sp-1',
    name: 'Tomato Soup',
    category: 'Soup',
    price: 40,
    description: 'Creamy, butter-enriched red tomato brew topped with crunchy baked bread cubes.',
    image: 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'sp-2',
    name: 'Veg Sweet Corn Soup',
    category: 'Soup',
    price: 50,
    description: 'Warm golden corn kernel broth infused with light seasonal greens.',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'sp-3',
    name: 'Cream of Mushroom',
    category: 'Soup',
    price: 60,
    description: 'Earthy fresh button mushrooms simmered in seasoned dairy roux and cream.',
    image: 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'sp-4',
    name: 'Hot & Sour Soup',
    category: 'Soup',
    price: 50,
    description: 'Hot peppery-sour clear soup loaded with minced mushrooms, carrot stalks, and soy sauce.',
    image: 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'sp-5',
    name: 'Manchow Soup',
    category: 'Soup',
    price: 50,
    description: 'Spicy dark soy-broth containing finely chopped veggies and topped with crunchy fried noodles.',
    image: 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'sp-6',
    name: 'Lemon & Coriander Soup',
    category: 'Soup',
    price: 50,
    description: 'Light vegetable stock loaded with freshly squeezed lime and dynamic coriander stems.',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },

  // --- RICE & NOODLES ---
  {
    id: 'rn-1',
    name: 'Veg. Chowmein',
    category: 'Rice & Noodles',
    price: 70,
    description: 'Hakka street style noodles wok-tossed with fresh onions, capsicums, and light soy.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'rn-2',
    name: 'Hakka Noodle',
    category: 'Rice & Noodles',
    price: 90,
    description: 'Thin standard oriental noodles tossed dry with sesame oil, pepper, cabbage, and celery.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'rn-3',
    name: 'Paneer Chowmein',
    category: 'Rice & Noodles',
    price: 100,
    description: 'Stir-fried noodles loaded with golden cottage cheese cubes and local Chinese spices.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'rn-4',
    name: 'Schezwan Noodle',
    category: 'Rice & Noodles',
    price: 90,
    description: 'Hot and fiery stir-fried noodles seasoned with house-made Sichuan pepper chili oil.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'rn-5',
    name: 'Veg. Fried Rice',
    category: 'Rice & Noodles',
    price: 70,
    description: 'Perfect long grain basmati rice tossed with carrots, fine beans, and spring onion greens.',
    image: 'https://images.unsplash.com/photo-1603133872878-68550a50c0c5?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'rn-6',
    name: 'Schezwan Fried Rice',
    category: 'Rice & Noodles',
    price: 90,
    description: 'Fiery red wok-fried rice blended with dynamic Sichuan pastes and sweet scallions.',
    image: 'https://images.unsplash.com/photo-1603133872878-68550a50c0c5?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'rn-7',
    name: 'Egg Fried Rice',
    category: 'Rice & Noodles',
    price: 110,
    description: 'Basmati rice stir-fried with rich scrambled farm eggs, spring onions, and white pepper.',
    image: 'https://images.unsplash.com/photo-1603133872878-68550a50c0c5?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'rn-8',
    name: 'Chicken Fried Rice',
    category: 'Rice & Noodles',
    price: 120,
    description: 'Fragrant pan-tossed rice with shredded seasoned chicken tenders, egg threads, and dark soy.',
    image: 'https://images.unsplash.com/photo-1603133872878-68550a50c0c5?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'rn-9',
    name: 'Chicken Garlic Fried Rice',
    category: 'Rice & Noodles',
    price: 150,
    description: 'Deep toasted garlic and seasoned chicken shreds fried with premium basmati rice.',
    image: 'https://images.unsplash.com/photo-1603133872878-68550a50c0c5?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'rn-10',
    name: 'Chicken Noodle',
    category: 'Rice & Noodles',
    price: 120,
    description: 'Tasty wok noodles loaded with rich chicken shreds and tossed in Hakka sauces.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'rn-11',
    name: 'Egg Noodle',
    category: 'Rice & Noodles',
    price: 110,
    description: 'Comforting stir-fried noodles packed with double farm scrambled eggs and fresh scallions.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },

  // --- ROTI & BREADS ---
  {
    id: 'br-1',
    name: 'Tawa Roti',
    category: 'Roti & Breads',
    price: 10,
    description: 'Traditional flatbread cooked directly on iron griddle (Tawa).',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'br-2',
    name: 'Plain Tandoori Roti',
    category: 'Roti & Breads',
    price: 10,
    description: 'Healthy whole wheat flatbread freshly baked in tandoori clay oven.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'br-3',
    name: 'Butter Roti',
    category: 'Roti & Breads',
    price: 12,
    description: 'Whole wheat tandoori flatbread rich with melted table butter.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'br-4',
    name: 'Lachha Parantha',
    category: 'Roti & Breads',
    price: 30,
    description: 'Beautiful multi-layered crispy wheat bread baked with tandoori heat.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'br-5',
    name: 'Butter Naan',
    category: 'Roti & Breads',
    price: 30,
    description: 'Soft, fluffy leavened white flour bread brushed heavily with butter.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'br-6',
    name: 'Plain Naan',
    category: 'Roti & Breads',
    price: 25,
    description: 'Leavened soft white flour flatbread roasted to standard perfection.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'br-7',
    name: 'Missi Roti',
    category: 'Roti & Breads',
    price: 30,
    description: 'Savoury gram flour bread mixed with chopped coriander seeds, methi, and onions.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'br-8',
    name: 'Stuff Naan',
    category: 'Roti & Breads',
    price: 50,
    description: 'Tandoori naan loaded with spiced cottage cheese, potatoes, and coriander roots.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'br-9',
    name: 'Paneer Parantha & Dahi (2 Pcs)',
    category: 'Roti & Breads',
    price: 80,
    description: 'Two rich golden griddled paranthas stuffed with seasoned cottage cheese, served with fresh curd.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'br-10',
    name: 'Aloo Parantha & Dahi (2 Pcs)',
    category: 'Roti & Breads',
    price: 60,
    description: 'Two pan-fried griddle paranthas stuffed with delicious potato masala, served with cold yogurt.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'br-11',
    name: 'Chicken Parantha & Dahi (2 Pcs)',
    category: 'Roti & Breads',
    price: 100,
    description: 'Two double-grilled paranthas stuffed with minced chicken tandoori kebabs, served with rich curd.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true
  },

  // --- PASTA & MAGGIE ---
  {
    id: 'pm-1',
    name: 'Red Sauce Pasta',
    category: 'Pasta & Maggie',
    price: 80,
    description: 'Penne noodles simmered in tangy, aromatic plum tomato and herb sauce.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'pm-2',
    name: 'White Sauce Pasta',
    category: 'Pasta & Maggie',
    price: 110,
    description: 'Penne pasta tossed in an rich, comforting, cheese-loaded heavy cream roux sauce.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'pm-3',
    name: 'Mix Sauce Pasta',
    category: 'Pasta & Maggie',
    price: 100,
    description: 'Harmonious blend of sweet red tomato sauce and silky white cheese sauce over penne.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'pm-4',
    name: 'Plain Maggie',
    category: 'Pasta & Maggie',
    price: 25,
    description: 'Fast-paced street style instant noodles cooked with traditional yellow tastemaker.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'pm-5',
    name: 'Veggie Maggie',
    category: 'Pasta & Maggie',
    price: 35,
    description: 'Classic instant noodles tossed with chopped sweet peas, onions, tomatoes, and chilies.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'pm-6',
    name: 'Cheesy Maggie',
    category: 'Pasta & Maggie',
    price: 45,
    description: 'Hot masala Maggie layers loaded with rich, gooey melted cheddar-mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },

  // --- MAIN COURSE ---
  {
    id: 'mc-1',
    name: 'Paneer Tikka Butter Masala',
    category: 'Main Course',
    price: 220,
    description: 'Smoky oven-charred paneer chunks simmered in highly spiced, butter-loaded red gravy.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'mc-2',
    name: 'Kadhai Paneer',
    category: 'Main Course',
    price: 200,
    description: 'Fresh cottage cheese stir-fried with heavy capsicums, onions, and coarse ground coriander seeds.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'mc-3',
    name: 'Paneer Changeji',
    category: 'Main Course',
    price: 210,
    description: 'Semi-dry tangy and robust pan-braised cottage cheese strips with yogurt and rich spices.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'mc-4',
    name: 'Shahi Paneer',
    category: 'Main Course',
    price: 200,
    description: 'Royal Muglai dish cooked in mild, sweet, and velvety cashew-onion yellow cream sauce.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'mc-5',
    name: 'Paneer Bhurji',
    category: 'Main Course',
    price: 250,
    description: 'Delectable scrambled cottage cheese wok-fried with chopped onions, tomatoes, and fresh coriander.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'mc-6',
    name: 'Paneer Lababdaar',
    category: 'Main Course',
    price: 210,
    description: 'Luscious, rich tomato-cream curry carrying grated cottage cheese shreds and soft cubes.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'mc-7',
    name: 'Paneer Butter Masala',
    category: 'Main Course',
    price: 200,
    description: 'Soft cottage cheese squares cooked in a silky, creamy, mildly sweet tomato-butter gravy.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'mc-8',
    name: 'Dal Tadka',
    category: 'Main Course',
    price: 120,
    description: 'Creamy yellow lentils cooked soft and finished with a hot ghee tarka of cumin and red chilies.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'mc-9',
    name: 'Dal Makhni',
    category: 'Main Course',
    price: 180,
    description: 'Slow overnight-simmered whole black lentils cooked with butter, rich cream, and mild fenugreek.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'mc-10',
    name: 'Mushroom Masala',
    category: 'Main Course',
    price: 180,
    description: 'Fresh white button mushrooms cooked in thick, spicy, aromatic onion-tomato reduction gravy.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'mc-11',
    name: 'Mix Veg.',
    category: 'Main Course',
    price: 130,
    description: 'Healthy assortment of fresh seasonal vegetables dry-tossed in robust Indian masalas.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'mc-12',
    name: 'Malai Kofta',
    category: 'Main Course',
    price: 200,
    description: 'Rich cottage cheese and potato rounds stuffed with nuts, served in cardamon cream cashew gravy.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'mc-13',
    name: 'Delux Thali',
    category: 'Main Course',
    price: 150,
    description: 'Generous platter consisting of Dal, Rice, Paneer Butter Masala, 3 Butter Rotis, fresh Salad & Raita.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'mc-14',
    name: 'TBC Special Thali',
    category: 'Main Course',
    price: 230,
    description: 'Chef\'s ultimate feast: Kadhai Paneer, Dal Makhni, Lachha Paratha, Butter Naan, Rice, Raita, Salad & sweet Gulab Jamun.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'mc-15',
    name: 'Butter Chicken (Half)',
    category: 'Main Course',
    price: 250,
    description: 'Smoky roasted tandoori chicken cooked in a rich, sweet, and highly buttery tomato gravy.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'mc-16',
    name: 'Butter Chicken (Full)',
    category: 'Main Course',
    price: 450,
    description: 'Chef\'s special whole tandoori chicken prepared in sweet, silky red butter gravy with cream swirl.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'mc-17',
    name: 'Murg Dum Dahi Handi (Full)',
    category: 'Main Course',
    price: 450,
    description: 'Slow fire steamed clay handi chicken finished with sour cream curd and fresh mint leaves.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'mc-18',
    name: 'Chicken Korma (Full)',
    category: 'Main Course',
    price: 450,
    description: 'Classic Mughlai spiced gravy made from caramelized onions, almond paste, and ghee.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'mc-19',
    name: 'Mutton Rogen Josh',
    category: 'Main Course',
    price: 250,
    description: 'Aromatic Kashmiri mutton curry cooked in deep red kashmiri chili oil, dry ginger, and fennel.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'mc-20',
    name: 'Keema Maska',
    category: 'Main Course',
    price: 200,
    description: 'Delicious hot minced mutton fried with onions and raw spices, loaded with real butter.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },

  // --- BIRYANI ---
  {
    id: 'bi-1',
    name: 'Veg. Biryani',
    category: 'Biryani',
    price: 140,
    description: 'Fragrant basmati rice slow-steamed with seasonal vegetables, rose water, and saffron threads.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  },
  {
    id: 'bi-2',
    name: 'Paneer Tikka Biryani',
    category: 'Biryani',
    price: 160,
    description: 'Aged basmati rice slow cooked with coal-grilled spicy paneer cubes, mint, and caramelized onions.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true
  },
  {
    id: 'bi-3',
    name: 'Egg Biryani',
    category: 'Biryani',
    price: 100,
    description: 'Saffron rice slow cooked with golden pan-fried boiled eggs, cardamoms, and caramelized shallots.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    isVeg: false
  },
  {
    id: 'bi-4',
    name: 'Murg Biryani',
    category: 'Biryani',
    price: 160,
    description: 'Authentic slow-cooked layered chicken dum biryani with spices and brown onions.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'bi-5',
    name: 'Dum Gosh Biryani',
    category: 'Biryani',
    price: 190,
    description: 'Royal slow-steamed basmati rice cooked with tender marinated mutton cuts, mace, and ghee.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    isVeg: false,
    isPopular: true
  },
  {
    id: 'bi-6',
    name: 'Jeera Rice',
    category: 'Biryani',
    price: 80,
    description: 'Long grain rice tossed in hot ghee with lots of fried cumin seeds.',
    image: 'https://images.unsplash.com/photo-1603133872878-68550a50c0c5?auto=format&fit=crop&w=600&q=80',
    isVeg: true
  }
];

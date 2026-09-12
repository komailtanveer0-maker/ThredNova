import fs from 'fs';
import path from 'path';

const outDir = './public/assets/images';

// Copy the hero image as interior-collage and 4ce86f31-3790-4a4c-b7e1-aa1d931941a6.png
const heroFile = fs.readdirSync(outDir).find(f => f.startsWith('pizzagarden_hero'));
if (heroFile) {
  fs.copyFileSync(path.join(outDir, heroFile), path.join(outDir, 'interior-collage.jpg'));
  fs.copyFileSync(path.join(outDir, heroFile), path.join(outDir, '4ce86f31-3790-4a4c-b7e1-aa1d931941a6.png'));
  fs.copyFileSync(path.join(outDir, heroFile), path.join(outDir, '4ce86f31-3790-4a4c-b7e1-aa1d931941a6.jpg'));
}

// Build the detailed PizzaGarden Full Menu Poster SVG (1200x800 high definition)
const fullMenuSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900" fill="none">
  <rect width="1400" height="900" fill="#09090b"/>
  
  <!-- Left Panel: Pizzas -->
  <g transform="translate(30, 30)">
    <rect width="390" height="840" rx="16" fill="#18181b" stroke="#27272a" stroke-width="2"/>
    <rect x="0" y="0" width="390" height="80" rx="16" fill="#dc2626"/>
    <text x="195" y="55" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="44" fill="#ffffff" letter-spacing="3">PIZZAS</text>
    
    <!-- Pizza Rancho Square Treat -->
    <g transform="translate(20, 100)">
      <text x="0" y="24" font-family="system-ui, sans-serif" font-weight="900" font-size="18" fill="#facc15">PIZZA RANCHO SQUARE TREAT</text>
      <text x="0" y="46" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#cbd5e1">Small: 940 | Medium: 1490 | Large: 2190</text>
    </g>

    <!-- Grown Crust -->
    <g transform="translate(20, 160)">
      <text x="0" y="24" font-family="system-ui, sans-serif" font-weight="900" font-size="18" fill="#facc15">GROWN CRUST</text>
      <text x="0" y="46" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#cbd5e1">Large: 2000 | X-Large: 2700</text>
    </g>

    <!-- Stuffed Crust Pizza -->
    <g transform="translate(20, 220)">
      <text x="0" y="24" font-family="system-ui, sans-serif" font-weight="900" font-size="18" fill="#facc15">STUFFED CRUST PIZZA</text>
      <text x="0" y="42" font-family="system-ui, sans-serif" font-weight="600" font-size="11" fill="#94a3b8">Large Stuffed Pizza · Choose up to 3 toppings</text>
      <text x="0" y="62" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#cbd5e1">Medium: 1800 | Large: 2300</text>
    </g>

    <!-- Traditional Touch -->
    <g transform="translate(20, 305)">
      <rect x="-10" y="0" width="370" height="34" fill="#27272a" rx="6"/>
      <text x="175" y="23" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#ffffff" letter-spacing="1">TRADITIONAL TOUCH</text>
      
      <g transform="translate(0, 45)">
        ${[
          'Chicken Tikka', 'Chicken Fajita', 'Tandoori', 'Tajin Signature',
          'Beef & Spicy', 'Cheese Lover', 'Veggie Lover', 'Euro', 'Chicken Supreme'
        ].map((item, idx) => `
          <text x="0" y="${idx * 24}" font-family="system-ui, sans-serif" font-weight="600" font-size="13" fill="#e2e8f0">• ${item}</text>
        `).join('')}
      </g>

      <g transform="translate(0, 275)">
        <rect x="-10" y="0" width="370" height="70" fill="#0f172a" rx="8" stroke="#0284c7" stroke-width="1"/>
        <text x="0" y="25" font-family="system-ui, sans-serif" font-weight="800" font-size="12" fill="#38bdf8">PRICES:</text>
        <text x="0" y="50" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#ffffff">S: 600 | M: 1200 | L: 1600 | XL: 2300</text>
      </g>
    </g>
  </g>

  <!-- Middle Panel: Special Pizzas & Crispy Chicken -->
  <g transform="translate(450, 30)">
    <rect width="450" height="840" rx="16" fill="#18181b" stroke="#27272a" stroke-width="2"/>
    <rect x="0" y="0" width="450" height="80" rx="16" fill="#b91c1c"/>
    <text x="225" y="55" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="36" fill="#ffffff" letter-spacing="2">SPECIAL PIZZAS</text>

    <!-- Flavours List -->
    <g transform="translate(25, 100)">
      ${[
        'Pizza Lovers Special', 'Richard Kebab', 'Super Supreme',
        'Peri Peri', 'Barbe Fine', 'Pizza Delight', 'Supreme UK Bistro'
      ].map((item, idx) => `
        <text x="0" y="${idx * 28}" font-family="system-ui, sans-serif" font-weight="700" font-size="15" fill="#facc15">★ ${item}</text>
      `).join('')}

      <!-- Prices table -->
      <g transform="translate(0, 210)">
        <rect width="400" height="60" fill="#27272a" rx="8"/>
        <text x="20" y="38" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#ffffff">S: 800 | M: 1400 | L: 1850 | XL: 2600</text>
      </g>
    </g>

    <!-- Crispy Chicken Pizza -->
    <g transform="translate(25, 395)">
      <rect width="400" height="130" fill="#022954" rx="10" stroke="#38bdf8" stroke-width="2"/>
      <text x="200" y="35" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="22" fill="#ffffff">CRISPY CHICKEN PIZZA</text>
      <text x="200" y="60" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#facc15">"Crunchy Till The Last Bite"</text>
      <text x="200" y="95" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="18" fill="#ffffff">Large: 1750 | X-Large: 2400</text>
    </g>

    <!-- Crispy Fried Chicken -->
    <g transform="translate(25, 545)">
      <rect width="400" height="260" fill="#27272a" rx="10"/>
      <text x="20" y="35" font-family="system-ui, sans-serif" font-weight="900" font-size="20" fill="#facc15">CRISPY FRIED CHICKEN</text>
      <text x="20" y="65" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#ffffff">1 Piece: Rs. 400 (1 Bun, Fries, 1 Garlic Dip)</text>
      <text x="20" y="100" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#ffffff">3 Pcs: Rs. 900 (2 Bun, Fries, 2 Garlic Dip)</text>
      <text x="20" y="135" font-family="system-ui, sans-serif" font-weight="700" font-size="14" fill="#ffffff">9 Pcs: Rs. 2150 (8 Bun, Fries, 4 Garlic Dips)</text>
      <text x="20" y="170" font-family="system-ui, sans-serif" font-weight="600" font-size="13" fill="#cbd5e1">Mayo Dip Sauce: Rs. 60</text>
      
      <rect x="20" y="195" width="360" height="45" rx="8" fill="#22c55e"/>
      <text x="200" y="223" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#ffffff">ORDER ON WHATSAPP: +92 329 6864242</text>
    </g>
  </g>

  <!-- Right Panel: Burgers, Appetizers, Pasta, Beverages -->
  <g transform="translate(930, 30)">
    <rect width="440" height="840" rx="16" fill="#18181b" stroke="#27272a" stroke-width="2"/>
    <rect x="0" y="0" width="440" height="80" rx="16" fill="#dc2626"/>
    <text x="220" y="55" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="34" fill="#ffffff" letter-spacing="2">BURGERS &amp; SIDES</text>

    <!-- Appetizers -->
    <g transform="translate(20, 100)">
      <text x="0" y="20" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#facc15">APPETIZERS</text>
      <text x="0" y="42" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">Over Baked Wings 5pcs: 400 | 10pcs: 750</text>
      <text x="0" y="62" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">Nuggets 5pcs: 300 | 10pcs: 500</text>
      <text x="0" y="82" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">Hot Wings 5pcs: 400 | 10pcs: 700</text>
      <text x="0" y="102" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">Hot Shot 4pcs: 400 | 10pcs: 600</text>
      <text x="0" y="122" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">Malai Boti 4pcs: 600 | Garlic Finger: 500</text>
    </g>

    <!-- Burgers & Grilled -->
    <g transform="translate(20, 250)">
      <text x="0" y="20" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#facc15">BURGERS &amp; GRILLED</text>
      <text x="0" y="42" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#ffffff">Zingerita: Rs. 500 | Chapli: Rs. 460 | Patty: Rs. 350</text>
      <text x="0" y="64" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">Pizza Burger Special: 600 | Malai Grilled: 750</text>
      <text x="0" y="84" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">Honey Mustard: 600 | Royal Grill: 550</text>
      <text x="0" y="104" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">The Blazee Grilled: 550 | Classy Classic: 650</text>
    </g>

    <!-- Fries & Pasta -->
    <g transform="translate(20, 385)">
      <text x="0" y="20" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#facc15">FRIES &amp; PASTA</text>
      <text x="0" y="42" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">French Fries: S 250 / L 400 | Twister: S 300 / L 450</text>
      <text x="0" y="62" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">Chicken Fried: S 500 / L 600</text>
      <text x="0" y="84" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">Chef Special Pasta: 500/600 | Mashroom Pasta: 450/750</text>
      <text x="0" y="104" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">Crunchy Pasta: 450/750 | Lasagne Pasta: 750</text>
    </g>

    <!-- Beverages & Contact -->
    <g transform="translate(20, 520)">
      <text x="0" y="20" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#facc15">BEVERAGES</text>
      <text x="0" y="42" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">Soft Drinks: Small 80 | Large 120</text>
      <text x="0" y="62" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#cbd5e1">Bottles: 500ml 160 | 1.5L 250</text>
    </g>

    <!-- Bottom Stamp -->
    <g transform="translate(20, 640)">
      <rect width="400" height="150" fill="#0f172a" rx="12" stroke="#facc15" stroke-width="2"/>
      <text x="200" y="35" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="18" fill="#facc15">PIZZAGARDEN CHAKWAL</text>
      <text x="200" y="60" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#ffffff">Talagang Hwy, opposite NFC, Chakwal</text>
      <text x="200" y="85" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#38bdf8">Open Daily: 11:00 AM – 1:00 AM</text>
      <text x="200" y="115" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#22c55e">WhatsApp: +92 329 6864242</text>
    </g>
  </g>
</svg>`;

fs.writeFileSync(path.join(outDir, 'full-menu-poster.svg'), fullMenuSvg);
fs.writeFileSync(path.join(outDir, '07bd7f05-35bd-4506-ae20-39fe1ee08cd7.svg'), fullMenuSvg);
fs.writeFileSync(path.join(outDir, 'e4da4a05-4c3f-4c7b-98bb-f41f28f9253e.svg'), fullMenuSvg);

console.log("Menu artwork created successfully!");

import fs from 'fs';
import path from 'path';

const outDir = './public/assets/images';

// 1. Mega Treat Fit for 3
const megaTreat3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" fill="none">
  <defs>
    <linearGradient id="bg-blue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#024182"/>
      <stop offset="50%" stop-color="#052c5c"/>
      <stop offset="100%" stop-color="#021b38"/>
    </linearGradient>
    <linearGradient id="yellow-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
  </defs>

  <!-- Blue vertical ribbed background -->
  <rect width="800" height="1000" fill="url(#bg-blue)"/>
  <!-- Ribbed lines effect -->
  <g opacity="0.12">
    ${Array.from({length: 40}).map((_, i) => `<rect x="${i * 20}" y="0" width="10" height="1000" fill="#ffffff"/>`).join('')}
  </g>

  <!-- Header Brand -->
  <g transform="translate(40, 30)">
    <circle cx="36" cy="36" r="32" fill="#0f172a" stroke="#facc15" stroke-width="3"/>
    <text x="80" y="32" font-family="system-ui, sans-serif" font-weight="900" font-size="24" fill="#ffffff">PIZZA</text>
    <text x="155" y="32" font-family="system-ui, sans-serif" font-weight="900" font-size="24" fill="#facc15">GARDEN</text>
    <text x="80" y="52" font-family="system-ui, sans-serif" font-weight="700" font-size="12" fill="#38bdf8" letter-spacing="2">CHAKWAL</text>
  </g>

  <!-- Headline -->
  <text x="400" y="150" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="44" fill="#facc15" letter-spacing="3">MEGA TREAT</text>
  <text x="320" y="240" text-anchor="end" font-family="system-ui, sans-serif" font-weight="900" font-size="80" fill="#ffffff">FIT FOR</text>
  <text x="420" y="270" text-anchor="start" font-family="system-ui, sans-serif" font-weight="900" font-size="160" fill="#ffffff" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.5))">3</text>
  
  <rect x="230" y="280" width="340" height="34" rx="6" fill="#facc15"/>
  <text x="400" y="303" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#0f172a" letter-spacing="2">SHARE THE MEGA TREAT CRAVINGS</text>

  <!-- Price Tag Card -->
  <g transform="translate(470, 340)">
    <rect width="280" height="100" rx="12" fill="#ffffff" filter="drop-shadow(0 15px 30px rgba(0,0,0,0.4))"/>
    <text x="25" y="65" font-family="system-ui, sans-serif" font-weight="900" font-size="34" fill="#024182">Rs.</text>
    <text x="85" y="68" font-family="system-ui, sans-serif" font-weight="900" font-size="52" fill="#024182">2299</text>
    <rect x="15" y="78" width="250" height="20" rx="4" fill="#facc15"/>
    <text x="140" y="93" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="11" fill="#021b38" letter-spacing="1">DINE-IN | TAKE-AWAY | DELIVERY</text>
  </g>

  <!-- Items list badge -->
  <g transform="translate(50, 340)">
    <rect width="360" height="180" rx="14" fill="#022954" stroke="#38bdf8" stroke-width="2" opacity="0.95"/>
    <text x="25" y="42" font-family="system-ui, sans-serif" font-weight="800" font-size="20" fill="#facc15">1. MEDIUM PIZZA</text>
    <text x="25" y="78" font-family="system-ui, sans-serif" font-weight="800" font-size="20" fill="#ffffff">2. BEHARI SPIN ROLLS</text>
    <text x="25" y="114" font-family="system-ui, sans-serif" font-weight="800" font-size="20" fill="#ffffff">3. CHEESE FRIES</text>
    <text x="25" y="150" font-family="system-ui, sans-serif" font-weight="800" font-size="20" fill="#ffffff">4. 1 LITRE COLD DRINK</text>
  </g>

  <!-- Food composition mockup showcase -->
  <g transform="translate(400, 720)">
    <!-- White pedestal stage -->
    <ellipse cx="0" cy="180" rx="360" ry="80" fill="#e2e8f0" opacity="0.9"/>
    <!-- Pizza illustration circle -->
    <circle cx="90" cy="-60" r="160" fill="#f59e0b" stroke="#78350f" stroke-width="12"/>
    <circle cx="90" cy="-60" r="140" fill="#fde68a"/>
    <!-- Toppings -->
    ${[
      [30, -90], [150, -90], [90, -10], [40, -20], [130, -20], [90, -110], [50, -50], [120, -50]
    ].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12" fill="#7f1d1d"/><circle cx="${x+15}" cy="${y-10}" r="8" fill="#15803d"/><circle cx="${x-10}" cy="${y+10}" r="6" fill="#000000"/>`).join('')}
    
    <!-- Behari Spin Rolls & Dip -->
    <g transform="translate(-230, 40)">
      <rect x="0" y="0" width="130" height="40" rx="10" fill="#f59e0b" stroke="#b45309" stroke-width="3"/>
      <rect x="20" y="30" width="130" height="40" rx="10" fill="#d97706" stroke="#b45309" stroke-width="3"/>
      <rect x="10" y="60" width="130" height="40" rx="10" fill="#f59e0b" stroke="#b45309" stroke-width="3"/>
      <circle cx="-30" cy="70" r="28" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
      <circle cx="-30" cy="70" r="22" fill="#fef08a"/>
    </g>

    <!-- Cheese Fries Tray -->
    <g transform="translate(-80, 100)">
      <ellipse cx="40" cy="30" rx="100" ry="35" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
      <path d="M -40 25 Q 40 -10 120 25 Q 40 50 -40 25 Z" fill="#facc15"/>
      <path d="M -30 22 Q 40 5 110 22" stroke="#dc2626" stroke-width="6" fill="none"/>
    </g>

    <!-- Coca Cola Bottle -->
    <g transform="translate(250, -50)">
      <rect x="25" y="10" width="20" height="25" rx="3" fill="#dc2626"/>
      <path d="M 20 35 C 10 70, 0 110, 0 180 C 0 240, 20 260, 35 260 C 50 260, 70 240, 70 180 C 70 110, 60 70, 50 35 Z" fill="#1c1917"/>
      <rect x="5" y="120" width="60" height="50" fill="#dc2626"/>
      <text x="35" y="152" text-anchor="middle" font-family="'Brush Script MT', cursive, sans-serif" font-weight="bold" font-size="20" fill="#ffffff">Coca-Cola</text>
    </g>
  </g>

  <!-- Footer official contact bar -->
  <g transform="translate(0, 930)">
    <rect width="800" height="70" fill="#021b38"/>
    <text x="40" y="32" font-family="system-ui, sans-serif" font-weight="900" font-size="18" fill="#ffffff">| WhatsApp: +92 329 6864242</text>
    <text x="40" y="52" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#94a3b8">TALAGANG HWY, OPPOSITE NFC, CHAKWAL</text>
    <rect x="580" y="15" width="180" height="40" rx="20" fill="#22c55e"/>
    <text x="670" y="40" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#ffffff">ORDER ON WHATSAPP</text>
  </g>
</svg>`;

// 2. The Big Boss Train Pizza 36"
const trainPizzaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" fill="none">
  <defs>
    <radialGradient id="dark-wood" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#2a1b14"/>
      <stop offset="100%" stop-color="#120c08"/>
    </radialGradient>
  </defs>

  <rect width="800" height="1000" fill="url(#dark-wood)"/>
  
  <!-- Logo -->
  <g transform="translate(40, 30)">
    <circle cx="36" cy="36" r="32" fill="#0f172a" stroke="#facc15" stroke-width="3"/>
    <text x="80" y="32" font-family="system-ui, sans-serif" font-weight="900" font-size="24" fill="#ffffff">PIZZA</text>
    <text x="155" y="32" font-family="system-ui, sans-serif" font-weight="900" font-size="24" fill="#facc15">GARDEN</text>
    <text x="80" y="52" font-family="system-ui, sans-serif" font-weight="700" font-size="12" fill="#38bdf8" letter-spacing="2">CHAKWAL</text>
  </g>

  <!-- Title Badge -->
  <rect x="40" y="130" width="340" height="46" fill="#dc2626" rx="6"/>
  <text x="210" y="162" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="24" fill="#ffffff" letter-spacing="2">THE BIG BOSS</text>
  
  <text x="40" y="240" font-family="system-ui, sans-serif" font-weight="900" font-size="70" fill="#ffffff" letter-spacing="3">TRAIN</text>
  <text x="40" y="310" font-family="system-ui, sans-serif" font-weight="900" font-size="70" fill="#ffffff" letter-spacing="3">PIZZA</text>
  <text x="40" y="345" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#facc15" letter-spacing="2">MORE HUNGER MORE FUN</text>

  <!-- Flavours Badge -->
  <g transform="translate(520, 110) rotate(22)">
    <rect width="260" height="54" rx="8" fill="#dc2626"/>
    <text x="130" y="35" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="20" fill="#ffffff">CHOOSE ANY 3-FLAVOURS</text>
  </g>

  <!-- Big Size specs -->
  <text x="40" y="660" font-family="system-ui, sans-serif" font-weight="900" font-size="110" fill="#ffffff">36''</text>
  <text x="210" y="615" font-family="system-ui, sans-serif" font-weight="900" font-size="38" fill="#ffffff">INCHES</text>
  <text x="210" y="655" font-family="system-ui, sans-serif" font-weight="900" font-size="28" fill="#ffffff">PIZZA LENGTH</text>

  <rect x="40" y="690" width="340" height="40" fill="#dc2626" rx="6"/>
  <text x="210" y="718" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="22" fill="#ffffff">SUPER SHARING FEAST</text>

  <text x="40" y="780" font-family="system-ui, sans-serif" font-weight="800" font-size="28" fill="#ffffff">IN JUST</text>
  <text x="40" y="870" font-family="system-ui, sans-serif" font-weight="900" font-size="95" fill="#facc15">3599/-</text>

  <!-- Wooden Plank & 3 Pizza Slices Rectangles -->
  <g transform="translate(480, 230)">
    <!-- Plank -->
    <rect x="-40" y="0" width="320" height="660" rx="16" fill="#854d0e" stroke="#58310c" stroke-width="8"/>
    
    <!-- 3 Flavours rectangles -->
    <!-- Flavour 1 Tikka -->
    <rect x="-10" y="30" width="260" height="170" rx="10" fill="#f59e0b" stroke="#78350f" stroke-width="4"/>
    <text x="120" y="125" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#78350f">CHICKEN TIKKA</text>
    
    <!-- Flavour 2 Mayo Ranch Drizzle -->
    <rect x="-10" y="230" width="260" height="170" rx="10" fill="#fde047" stroke="#78350f" stroke-width="4"/>
    <path d="M 0 250 Q 120 280 240 250 M 0 290 Q 120 320 240 290 M 0 330 Q 120 360 240 330 M 0 370 Q 120 400 240 370" stroke="#ffffff" stroke-width="7" fill="none"/>
    <text x="120" y="325" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#000000">RANCH DRIZZLE</text>

    <!-- Flavour 3 Supreme -->
    <rect x="-10" y="430" width="260" height="190" rx="10" fill="#f59e0b" stroke="#78350f" stroke-width="4"/>
    ${[
      [30, 470], [90, 480], [150, 470], [210, 480],
      [50, 530], [110, 540], [170, 530],
      [40, 580], [100, 590], [180, 580]
    ].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#000000"/><circle cx="${x+12}" cy="${y+5}" r="7" fill="#15803d"/>`).join('')}
    <text x="120" y="535" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#78350f">SUPER SUPREME</text>
  </g>

  <!-- Footer official contact bar -->
  <g transform="translate(0, 920)">
    <rect width="800" height="80" fill="#000000" opacity="0.8"/>
    <text x="40" y="38" font-family="system-ui, sans-serif" font-weight="900" font-size="18" fill="#ffffff">| WhatsApp: +92 329 6864242</text>
    <text x="40" y="60" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#94a3b8">TALAGANG HWY, OPPOSITE NFC, CHAKWAL</text>
    <rect x="580" y="20" width="180" height="42" rx="21" fill="#22c55e"/>
    <text x="670" y="47" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#ffffff">ORDER ON WHATSAPP</text>
  </g>
</svg>`;

// Write the files
fs.writeFileSync(path.join(outDir, 'mega-treat-3-poster.svg'), megaTreat3Svg);
fs.writeFileSync(path.join(outDir, 'train-pizza-poster.svg'), trainPizzaSvg);

// Also save aliases so original prompt image names map gracefully
fs.writeFileSync(path.join(outDir, 'e7310f07-f9eb-446a-af07-98210c8ff3d4.svg'), megaTreat3Svg);
fs.writeFileSync(path.join(outDir, 'e6873d5e-6141-4196-8878-0d6078e82670.svg'), trainPizzaSvg);

console.log("Posters generated successfully!");

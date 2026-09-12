import fs from 'fs';
import path from 'path';

const outDir = './public/assets/images';

// 3. Family Deal 1 (Rs. 4899)
const familyDeal1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" fill="none">
  <defs>
    <linearGradient id="bg-blue2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#024182"/>
      <stop offset="50%" stop-color="#042750"/>
      <stop offset="100%" stop-color="#02162e"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bg-blue2)"/>
  <g opacity="0.1">
    ${Array.from({length: 40}).map((_, i) => `<rect x="${i * 20}" y="0" width="10" height="1000" fill="#ffffff"/>`).join('')}
  </g>
  <g transform="translate(40, 30)">
    <circle cx="36" cy="36" r="32" fill="#0f172a" stroke="#facc15" stroke-width="3"/>
    <text x="80" y="32" font-family="system-ui, sans-serif" font-weight="900" font-size="24" fill="#ffffff">PIZZA</text>
    <text x="155" y="32" font-family="system-ui, sans-serif" font-weight="900" font-size="24" fill="#facc15">GARDEN</text>
    <text x="80" y="52" font-family="system-ui, sans-serif" font-weight="700" font-size="12" fill="#38bdf8" letter-spacing="2">CHAKWAL</text>
  </g>
  <text x="400" y="140" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="64" fill="#facc15">FAMILY</text>
  <text x="320" y="235" text-anchor="end" font-family="system-ui, sans-serif" font-weight="900" font-size="80" fill="#ffffff">DEAL</text>
  <text x="410" y="270" text-anchor="start" font-family="system-ui, sans-serif" font-weight="900" font-size="160" fill="#ffffff">1</text>
  
  <rect x="230" y="275" width="340" height="34" rx="6" fill="#facc15"/>
  <text x="400" y="298" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#0f172a" letter-spacing="2">SHARE THE MEGA TREAT CRAVINGS</text>

  <!-- Price Tag -->
  <g transform="translate(470, 335)">
    <rect width="280" height="100" rx="12" fill="#ffffff"/>
    <text x="25" y="65" font-family="system-ui, sans-serif" font-weight="900" font-size="34" fill="#024182">Rs.</text>
    <text x="85" y="68" font-family="system-ui, sans-serif" font-weight="900" font-size="52" fill="#024182">4899</text>
    <rect x="15" y="78" width="250" height="20" rx="4" fill="#facc15"/>
    <text x="140" y="93" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="11" fill="#021b38" letter-spacing="1">DINE-IN | TAKE-AWAY | DELIVERY</text>
  </g>

  <!-- Items list -->
  <g transform="translate(50, 335)">
    <rect width="360" height="210" rx="14" fill="#022954" stroke="#38bdf8" stroke-width="2"/>
    <text x="25" y="38" font-family="system-ui, sans-serif" font-weight="800" font-size="18" fill="#facc15">1. EXTRA LARGE PIZZA</text>
    <text x="25" y="70" font-family="system-ui, sans-serif" font-weight="800" font-size="18" fill="#ffffff">2. PATTY BURGERS</text>
    <text x="25" y="102" font-family="system-ui, sans-serif" font-weight="800" font-size="18" fill="#ffffff">3. 4 Pcs MALAI ROLLS</text>
    <text x="25" y="134" font-family="system-ui, sans-serif" font-weight="800" font-size="18" fill="#ffffff">4. 10 Pcs NUGGETS</text>
    <text x="25" y="166" font-family="system-ui, sans-serif" font-weight="800" font-size="18" fill="#ffffff">5. 1 RUSSIAN SALAD</text>
    <text x="25" y="198" font-family="system-ui, sans-serif" font-weight="800" font-size="18" fill="#ffffff">6. 2 COLD DRINKS 1.5 LITRE</text>
  </g>

  <!-- Food graphic composition -->
  <g transform="translate(400, 720)">
    <ellipse cx="0" cy="180" rx="360" ry="80" fill="#e2e8f0" opacity="0.9"/>
    <!-- XL Pizza -->
    <circle cx="0" cy="-60" r="160" fill="#f59e0b" stroke="#78350f" stroke-width="10"/>
    <circle cx="0" cy="-60" r="140" fill="#fde68a"/>
    <!-- Burgers -->
    <g transform="translate(-250, 20)">
      <ellipse cx="60" cy="50" rx="60" ry="35" fill="#d97706"/>
      <ellipse cx="60" cy="40" rx="65" ry="15" fill="#15803d"/>
      <ellipse cx="60" cy="30" rx="55" ry="30" fill="#f59e0b"/>
    </g>
    <!-- Nuggets & Salad -->
    <g transform="translate(140, 40)">
      <ellipse cx="60" cy="60" rx="80" ry="30" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <ellipse cx="60" cy="55" rx="70" ry="20" fill="#fef08a"/>
    </g>
    <!-- 2 Bottles Coke -->
    <g transform="translate(260, -80)">
      <rect x="0" y="0" width="30" height="150" rx="10" fill="#1c1917"/>
      <rect x="35" y="0" width="30" height="150" rx="10" fill="#1c1917"/>
      <rect x="0" y="60" width="65" height="30" fill="#dc2626"/>
    </g>
  </g>

  <g transform="translate(0, 930)">
    <rect width="800" height="70" fill="#02162e"/>
    <text x="40" y="32" font-family="system-ui, sans-serif" font-weight="900" font-size="18" fill="#ffffff">| WhatsApp: +92 329 6864242</text>
    <text x="40" y="52" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#94a3b8">TALAGANG HWY, OPPOSITE NFC, CHAKWAL</text>
    <rect x="580" y="15" width="180" height="40" rx="20" fill="#22c55e"/>
    <text x="670" y="40" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#ffffff">ORDER ON WHATSAPP</text>
  </g>
</svg>`;

// 4. Mega Treat Good For 2 (Rs. 1699)
const megaTreat2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" fill="none">
  <defs>
    <linearGradient id="bg-blue3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#024182"/>
      <stop offset="100%" stop-color="#031d3b"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bg-blue3)"/>
  <text x="400" y="140" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="44" fill="#facc15">MEGA TREAT</text>
  <text x="320" y="235" text-anchor="end" font-family="system-ui, sans-serif" font-weight="900" font-size="80" fill="#ffffff">GOOD FOR</text>
  <text x="420" y="270" text-anchor="start" font-family="system-ui, sans-serif" font-weight="900" font-size="160" fill="#ffffff">2</text>
  
  <rect x="230" y="275" width="340" height="34" rx="6" fill="#facc15"/>
  <text x="400" y="298" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#0f172a" letter-spacing="2">TWO CRAVINGS, ONE MEGA TREAT!</text>

  <!-- Price Tag -->
  <g transform="translate(470, 335)">
    <rect width="280" height="100" rx="12" fill="#ffffff"/>
    <text x="25" y="65" font-family="system-ui, sans-serif" font-weight="900" font-size="34" fill="#024182">Rs.</text>
    <text x="85" y="68" font-family="system-ui, sans-serif" font-weight="900" font-size="52" fill="#024182">1699</text>
    <rect x="15" y="78" width="250" height="20" rx="4" fill="#facc15"/>
    <text x="140" y="93" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="11" fill="#021b38" letter-spacing="1">DINE-IN | TAKE-AWAY | DELIVERY</text>
  </g>

  <!-- Items list -->
  <g transform="translate(50, 335)">
    <rect width="360" height="180" rx="14" fill="#022954" stroke="#38bdf8" stroke-width="2"/>
    <text x="25" y="42" font-family="system-ui, sans-serif" font-weight="800" font-size="20" fill="#facc15">1. SMALL PIZZA</text>
    <text x="25" y="78" font-family="system-ui, sans-serif" font-weight="800" font-size="20" fill="#ffffff">2. 5 OVEN BAKED WINGS</text>
    <text x="25" y="114" font-family="system-ui, sans-serif" font-weight="800" font-size="20" fill="#ffffff">3. 1 ZINGER BURGER</text>
    <text x="25" y="150" font-family="system-ui, sans-serif" font-weight="800" font-size="20" fill="#ffffff">4. 2 REGULAR DRINKS</text>
  </g>

  <!-- Food mock visuals -->
  <g transform="translate(400, 720)">
    <ellipse cx="0" cy="180" rx="360" ry="80" fill="#e2e8f0" opacity="0.9"/>
    <!-- Small Pizza -->
    <circle cx="100" cy="-60" r="140" fill="#f59e0b" stroke="#78350f" stroke-width="8"/>
    <circle cx="100" cy="-60" r="120" fill="#fde68a"/>
    <!-- Crispy Zinger Burger -->
    <g transform="translate(-230, -30)">
      <ellipse cx="70" cy="60" rx="70" ry="40" fill="#d97706"/>
      <ellipse cx="70" cy="45" rx="75" ry="18" fill="#15803d"/>
      <ellipse cx="70" cy="30" rx="65" ry="35" fill="#f59e0b"/>
    </g>
    <!-- Oven Baked Wings -->
    <g transform="translate(-60, 80)">
      <ellipse cx="40" cy="30" rx="70" ry="30" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <path d="M 0 30 Q 30 10 70 30" stroke="#b91c1c" stroke-width="18" stroke-linecap="round"/>
    </g>
    <!-- Drinks -->
    <g transform="translate(240, -40)">
      <rect x="0" y="0" width="25" height="120" rx="8" fill="#1c1917"/>
      <rect x="30" y="0" width="25" height="120" rx="8" fill="#1c1917"/>
    </g>
  </g>

  <g transform="translate(0, 930)">
    <rect width="800" height="70" fill="#02162e"/>
    <text x="40" y="32" font-family="system-ui, sans-serif" font-weight="900" font-size="18" fill="#ffffff">| WhatsApp: +92 329 6864242</text>
    <rect x="580" y="15" width="180" height="40" rx="20" fill="#22c55e"/>
    <text x="670" y="40" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#ffffff">ORDER ON WHATSAPP</text>
  </g>
</svg>`;

// Write the files
fs.writeFileSync(path.join(outDir, 'family-deal-1-poster.svg'), familyDeal1Svg);
fs.writeFileSync(path.join(outDir, 'mega-treat-2-poster.svg'), megaTreat2Svg);

fs.writeFileSync(path.join(outDir, '16088442-20ba-4797-8b14-ac0d66622509.svg'), familyDeal1Svg);
fs.writeFileSync(path.join(outDir, 'a0853cd1-9020-4075-ba41-b43677417a72.svg'), megaTreat2Svg);

console.log("Additional posters generated!");

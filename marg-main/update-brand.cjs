const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (let r of replacements) {
        content = content.replace(r.search, r.replace);
    }
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', filePath);
    }
}

// 1. Logo.tsx text
replaceInFile('src/components/Logo.tsx', [
    { search: /alt="MARG Icon"/g, replace: 'alt="Marg Footwear Icon"' },
    { search: /alt="MARG"/g, replace: 'alt="Marg Footwear"' },
    { search: /<img\s+src="\/images\/logo\.png"\s+alt="Marg Footwear"\s+className=\{`\$\{heightClass\}\s+w-auto\s+object-contain\s+transition-transform\s+group-hover:scale-105`\}\s+style=\{\{\s+\.\.\.\(glow\s+\?\s+\{\s+filter:\s+"drop-shadow\(0\s+0\s+10px\s+rgba\(255,106,0,0\.4\)\)"\s+\}\s+:\s+\{\}\)\s+\}\}\s+\/>/, replace: '<img src="/images/logo.png" alt="Marg Footwear" className={`${heightClass} w-auto object-contain transition-transform group-hover:scale-105`} style={{ ...(glow ? { filter: "drop-shadow(0 0 10px rgba(255,106,0,0.4))" } : {}) }} />\n      <span className="font-display font-bold text-xl md:text-2xl tracking-tight leading-none uppercase">Marg<br/>Footwear</span>' }
]);

// 2. index.tsx Hero
replaceInFile('src/routes/index.tsx', [
    { search: /text-6xl md:text-8xl font-display font-bold tracking-tighter leading-\[0\.9\] text-gradient-neon"\s*>\s*MARG/g, replace: 'text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[1] text-gradient-neon">\n              Marg Footwear' },
    { search: /Marg — Step Into Power/g, replace: 'Marg Footwear — Step Into Power' },
]);

// Now do global replacements for other files
const files = [
    'src/routes/__root.tsx',
    'src/routes/women.tsx',
    'src/routes/product.$id.tsx',
    'src/routes/new-arrivals.tsx',
    'src/routes/men.tsx',
    'src/routes/kids.tsx',
    'src/routes/contact.tsx',
    'src/routes/checkout.tsx',
    'src/routes/cart.tsx',
    'src/routes/about.tsx',
    'src/routes/index.tsx', // include index for the remaining "Marg" texts
    'src/components/Preloader.tsx',
    'src/components/Navbar.tsx',
    'src/components/Footer.tsx',
    'src/lib/products.ts'
];

for (let file of files) {
    replaceInFile(file, [
        { search: /Marg(?! Footwear)/g, replace: 'Marg Footwear' },
        { search: /MARG/g, replace: 'Marg Footwear' } // In preloader, footer etc
    ]);
}

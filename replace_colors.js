const fs = require('fs');
const path = require('path');

const colorMap = {
  '#0E5A43': 'forest-green',
  '#1D6B4F': 'botanical-green',
  '#A9C3A2': 'sage-green',
  '#F5EFE4': 'cream-beige',
  '#F6D34E': 'citrus-yellow',
  '#F7A76C': 'peach-orange',
  '#DDEBD0': 'mint-green',
  '#FAF7F2': 'ivory',
  '#B68B5E': 'brown-sugar',
};

// Also add lowercase versions just in case
const colorMapLower = {};
for (const [hex, name] of Object.entries(colorMap)) {
  colorMapLower[hex.toLowerCase()] = name;
  colorMapLower[hex.toUpperCase()] = name;
}

function processFile(filePath) {
  if (filePath.endsWith('globals.css')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const [hex, name] of Object.entries(colorMapLower)) {
    // Replace tailwind arbitrary values e.g. text-[#0E5A43] -> text-forest-green
    // We look for `-[\${hex}]` and replace with `-${name}`
    // Since hex has #, we escape it or just use simple replace.
    // Actually, tailwind syntax is `prefix-[#hex]`.
    // Let's replace `[#hex]` with `${name}` but only if preceded by a letter/dash
    // Wait, `prefix-[#hex]` -> `prefix-name`. So we replace `-[#hex]` with `-${name}`.
    // e.g. bg-[#0E5A43] -> bg-forest-green
    const tailwindRegex = new RegExp(`\\[${hex}\\]`, 'g');
    content = content.replace(tailwindRegex, name);

    // Replace literal hex codes with var(--color-name)
    const literalRegex = new RegExp(hex, 'g');
    content = content.replace(literalRegex, `var(--color-${name})`);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'src'));
console.log("Done");

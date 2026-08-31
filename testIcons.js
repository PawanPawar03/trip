import * as lucide from 'lucide-react';
import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('src/components');
let hasError = false;
files.forEach(file => {
  const content = fs.readFileSync('src/components/' + file, 'utf8');
  const match = content.match(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/);
  if (match) {
    const icons = match[1].split(',').map(s => s.trim()).filter(Boolean);
    icons.forEach(icon => {
      if (!lucide[icon]) {
        console.error('MISSING ICON IN ' + file + ':', icon);
        hasError = true;
      }
    });
  }
});
if (!hasError) {
  console.log('ALL LUCIDE ICONS ARE 100% VALID!');
}

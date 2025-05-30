const fs = require('fs');
const path = require('path');

const infoDir = path.join(__dirname, 'public', 'info');
const outputFile = path.join(__dirname, 'src', 'infoList.js');

fs.readdir(infoDir, (err, files) => {
  if (err) {
    console.error('Failed to read info directory:', err);
    return;
  }

  const names = files
    .filter(file => file.endsWith('.md'))
    .map(file => path.basename(file, '.md').toLowerCase());

  const output = `// Auto-generated by generateInfoFiles.js\n` +
                 `export const infoNodes = new Set(${JSON.stringify(names, null, 2)});\n`;

  fs.writeFile(outputFile, output, err => {
    if (err) {
      console.error('Failed to write infoFiles.js:', err);
    } else {
      console.log(`✅ Generated ${outputFile} with ${names.length} entries.`);
    }
  });
});
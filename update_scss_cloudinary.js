const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.scss')) {
        results.push(file);
      }
    }
  });
  return results;
}

const scssDir = path.join(process.cwd(), 'styles', 'scss');
if (!fs.existsSync(scssDir)) {
  console.error('Styles directory not found');
  process.exit(1);
}

const files = walk(scssDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Pattern: .../upload/[PARAMS]/...
  // We want to ensure f_auto,q_auto is in [PARAMS]
  
  const updatedContent = content.replace(/(https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/)([^\/]+)(\/.*)/g, (match, prefix, params, rest) => {
    if (params.includes('f_auto') && params.includes('q_auto')) {
      return match;
    }
    
    changed = true;
    // If params looks like a version (starts with v and followed by numbers), 
    // we should prepend f_auto,q_auto to it.
    // Otherwise, if it's already params, we add to it.
    if (params.startsWith('v') && !isNaN(params.substring(1))) {
        return `${prefix}f_auto,q_auto/${params}${rest}`;
    }
    
    return `${prefix}f_auto,q_auto,${params}${rest}`;
  });

  if (changed) {
    fs.writeFileSync(file, updatedContent, 'utf8');
    console.log(`Updated: ${file}`);
  }
});

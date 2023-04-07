const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

interface IJsDocComment {
  description?: string;
  kind?: string | 'function';
  category?: string;
  examples?: string;
}

const FILES = glob.sync('packages/style-lib/src/**/*.ts');

// console.log(`Getting template data...`);

const res: IJsDocComment[] = jsdoc2md.getTemplateDataSync({
  files: FILES,
  configure: 'docs/jsdoc.json',
});

// console.log(`got template data, looking up categories...`);

const categories = res.reduce((acc, curr) => {
  const category = curr.category?.toLowerCase();
  console.log(`evaluating category ${category}`);
  if (category) {
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ ...curr, category });
  }

  return acc;
}, {});
// console.log(`Categories:\n${JSON.stringify(categories, null, 2)}`);

const outputPath = path.join('docs', 'docs', 'style-lib');
if (!fs.existsSync(outputPath)) {
  // console.log(`Output path ${outputPath} does not exist, creating!`);
  fs.mkdirSync(outputPath);
}

for (const [category, items] of Object.entries(categories)) {
  let md = `---\nslug: /style-lib/${category.toLowerCase()}\n---\n\n# ${capitalize(
    category
  )}\n\n`;

  md += items
    .sort((funcA, funcB) => sortFunctions(funcA, funcB))
    .map(getDocsSection)
    .join('\n\n---\n\n');

  fs.writeFileSync(path.join(outputPath, `${category.toLowerCase()}.md`), md, {
    encoding: 'utf8',
  });
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDocsSection({ name, description, examples }) {
  let section = ``;
  const sperator = `\n\n`;
  const header = `### \`\`\`${name}\`\`\``;
  const sectionText = `${description}`;
  const usageText = `\`\`\`shell\n$ npm i -D @nx-fullstack/style-lib\n\n${examples.join(
    '\n'
  )}\n\`\`\``;

  section += header;
  section += sperator;
  section += sectionText;
  section += sperator;
  section += usageText;

  return section;
}

function sortFunctions(funcA, funcB) {
  if (funcA.name < funcB.name) {
    return -1;
  }

  if (funcA.name > funcB.name) {
    return 1;
  }

  return 0;
}

const fs = require('fs/promises');
const path = require('path');

// Dynamically import ES modules.
const importESM = async (modulePath) => {
  const fullPath = path.resolve(__dirname, '..', modulePath);
  // Use a cache-busting query string to ensure the latest version is imported.
  // The cache buster was causing issues with babel-register, so it's removed for now.
  return await import(fullPath);
};

const generateMarkdownForRule = (rule, level = 1) => {
  let markdown = '';

  if (rule.name) {
    markdown += `${'#'.repeat(level)} ${rule.name}\n\n`;
  }

  if (rule.description) {
    // Trim and handle multiline descriptions, removing backticks
    markdown += `${rule.description.trim().replace(/`/g, '')}\n\n`;
  }

  // Handle specific rule properties for detailed formatting
  if (rule.maxUpgrades) {
    markdown += `- **Max Upgrades:** ${rule.maxUpgrades}\n`;
  }
  if (rule.costType === 'progressive' && Array.isArray(rule.costs)) {
    const totalCosts = rule.costs.reduce((acc, cost, index) => {
      const total = (acc[index - 1] || 0) + cost;
      acc.push(total);
      return acc;
    }, []);
    markdown += '- **Costs (Incremental: Total):**\n';
    rule.costs.forEach((cost, i) => {
      markdown += `  - +${i + 1}: (${cost}: ${totalCosts[i]})\n`;
    });
    markdown += '\n';
  } else if (rule.costType === 'size-based' && typeof rule.costs === 'object') {
    markdown += '- **Costs by Size:**\n';
    for (const [size, cost] of Object.entries(rule.costs)) {
      markdown += `  - Size ${size}: ${cost} points\n`;
    }
    markdown += '\n';
  }

  if (rule.min !== undefined && rule.max !== undefined && rule.unit) {
    markdown += `- **Valid Range:** ${rule.min}-${rule.max}${rule.unit}\n\n`;
  } else if (rule.min !== undefined) {
    markdown += `- **Minimum:** ${rule.min}\n\n`;
  }

  // Recursively process sub-rules
  if (rule.rules && Array.isArray(rule.rules)) {
    for (const subRule of rule.rules) {
      markdown += generateMarkdownForRule(subRule, level + 1);
    }
  }

  return markdown;
};


const generateDocs = async () => {
  const rulesDir = path.resolve(__dirname, '..', 'src/rules');
  const outputDir = path.resolve(__dirname, '..', '..'); // Project root

  try {
    const files = await fs.readdir(rulesDir);
    const docFiles = files.filter(file => file.startsWith('doc-') && file.endsWith('.js'));

    if (docFiles.length === 0) {
      console.log('No doc files found in src/rules.');
      return;
    }

    for (const docFile of docFiles) {
      const modulePath = path.join('src/rules', docFile);
      try {
        const ruleModule = await importESM(modulePath);
        const rootRule = ruleModule.default;

        if (rootRule) {
          const markdownContent = generateMarkdownForRule(rootRule);
          
          const outputFileName = `${rootRule.name.replace(/\s+/g, '-')}.md`;
          const outputFilePath = path.join(outputDir, outputFileName);

          // Trim trailing whitespace and ensure a single newline at the end
          await fs.writeFile(outputFilePath, markdownContent.trim() + '\n');
          console.log(`Generated: ${outputFilePath}`);
        }
      } catch (error) {
        console.error(`Error processing ${docFile}:`, error);
      }
    }
  } catch (error) {
    console.error('Failed to generate documentation:', error);
  }
};

generateDocs();

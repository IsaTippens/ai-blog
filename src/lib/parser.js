/**
 * Parses simple front matter from a markdown file string.
 * @param {string} fileContent
 * @returns {{ data: Record<string, any>, content: string }}
 */
export function parseFrontMatter(fileContent) {
  const lines = fileContent.split('\n');
  const data = {};
  let content = '';

  if (lines.length > 0 && lines[0].trim() === '---') {
    let i = 1;
    while (i < lines.length && lines[i].trim() !== '---') {
      const line = lines[i];
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        let valueStr = line.slice(colonIndex + 1).trim();

        // Parse array if it starts with [ and ends with ]
        if (valueStr.startsWith('[') && valueStr.endsWith(']')) {
          try {
            const normalized = valueStr.replace(/'/g, '"');
            data[key] = JSON.parse(normalized);
          } catch (e) {
            data[key] = valueStr.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
          }
        } else {
          // Remove wrapping quotes if present
          if ((valueStr.startsWith('"') && valueStr.endsWith('"')) ||
              (valueStr.startsWith("'") && valueStr.endsWith("'"))) {
            valueStr = valueStr.slice(1, -1);
          }
          data[key] = valueStr;
        }
      }
      i++;
    }
    content = lines.slice(i + 1).join('\n');
  } else {
    content = fileContent;
  }

  return { data, content };
}

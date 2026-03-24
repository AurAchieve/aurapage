const fs = require('fs');
const path = require('path');

const extensions = ['.js', '.ts', '.tsx', '.mjs'];
const exclude = ['node_modules', '.next', '.git', 'dist', 'build', 'scripts'];

function removeComments(content) {

    const regex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\/\*[\s\S]*?\*\/)|(\/\/.*)/g;
    
    return content.replace(regex, (match, string, blockComment, lineComment) => {
        if (string) return string; 

        return ''; 
    });
}

function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        const newContent = removeComments(content);

        const cleanedContent = newContent.replace(/^\s*[\r\n]/gm, '');
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Processed: ${filePath}`);
        }
    } catch (e) {
        console.error(`Error processing ${filePath}:`, e);
    }
}

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (exclude.includes(file)) continue;
        
        if (stat.isDirectory()) {
            walk(filePath);
        } else if (extensions.includes(path.extname(filePath))) {
            processFile(filePath);
        }
    }
}

const routeDir = path.join(process.cwd(), 'app/api/file');
if (fs.existsSync(routeDir)) {
    console.log('Removing unused route directory...');
    fs.rmSync(routeDir, { recursive: true, force: true });
}

console.log('Removing comments from source files...');
walk(process.cwd());
console.log('Done.');

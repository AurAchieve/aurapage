const fs = require('fs');
const path = require('path');

const extensions = ['.js', '.ts', '.tsx', '.mjs'];
const exclude = ['node_modules', '.next', '.git', 'dist', 'build', 'scripts'];

function removeComments(content) {
    // Regex to match strings (double, single, backtick) or comments (block, line)
    // We capture strings to preserve them, and replace comments with empty string
    const regex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\/\*[\s\S]*?\*\/)|(\/\/.*)/g;
    
    return content.replace(regex, (match, string, blockComment, lineComment) => {
        if (string) return string; // It's a string, keep it
        // It's a comment, remove it
        // For block comments, we might want to keep newlines if we want to preserve line count, 
        // but usually removing them is fine. 
        // If it's a line comment, we remove it.
        return ''; 
    });
}

function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // specific fix for the file that might have // in a string that regex might miss or handle weirdly?
        // The regex above is robust for standard JS strings.
        
        const newContent = removeComments(content);
        
        // Basic cleanup of multiple empty lines that might result from removing comments
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

// 1. Delete the unused route file/dir if it exists
const routeDir = path.join(process.cwd(), 'app/api/file');
if (fs.existsSync(routeDir)) {
    console.log('Removing unused route directory...');
    fs.rmSync(routeDir, { recursive: true, force: true });
}

// 2. Remove comments
console.log('Removing comments from source files...');
walk(process.cwd());
console.log('Done.');

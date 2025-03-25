import fs from 'fs';
import path from 'path';

const groupFilesByVisibility = (directory) => {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(`Error reading the directory: ${err.message}`);
            return;
        }

        const publicFiles = [];
        const hiddenFiles = [];

        files.forEach(file => {
            if (file.startsWith('.')) {
                hiddenFiles.push(file);  
            } else {
                publicFiles.push(file);  
            }
        });

        console.log('Public Files:', publicFiles.join(', ') || 'No public files');
        console.log('Hidden Files:', hiddenFiles.join(', ') || 'No hidden files');
    });
};

const directory = process.argv[2] || '.';

groupFilesByVisibility(directory);

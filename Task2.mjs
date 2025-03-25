import { createReadStream, createWriteStream } from 'fs';
import { Transform } from 'stream';

// to read from input.txt
const inputStream = createReadStream('input.txt', { encoding: 'utf8' });

// to convert text to uppercase
const toUpperCase = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

// to write into output.txt
const outputStream = createWriteStream('output.txt');

// pipe the streams
inputStream.pipe(toUpperCase).pipe(outputStream);

console.log('To see the result check the output.txt');

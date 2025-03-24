import { Readable, Writable, Transform } from "stream";
import { format } from "date-fns";
import { createWriteStream } from "fs";

//Emits current time every second
class TimeStream extends Readable {
  constructor() {
    super();
  }

  _read() {
    setTimeout(() => {
      const time = new Date();
      this.push(time.toISOString()); // Push timestamp
    }, 1000);
  }
}

//Formats time
class FormatTimeStream extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const formattedTime = format(
      new Date(chunk.toString()),
      "yyyy-MM-dd HH:mm:ss"
    );
    this.push(formattedTime + "\n");
    callback();
  }
}

//Writes to a file
const outputFile = createWriteStream("output.log", { flags: "a" });

//Create stream pipeline
const timeStream = new TimeStream();
const formatStream = new FormatTimeStream();

timeStream.pipe(formatStream).pipe(outputFile);

console.log("You can check output.log now!!");

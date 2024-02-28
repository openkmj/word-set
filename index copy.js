const keypress = require("keypress");
const fs = require("fs");

const log = (message) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(message);
};

keypress(process.stdin);

const writeToFile = async (word, type) => {
  const fileName = type === "word" ? "word.txt" : "deprecated.txt";
  await fs.promises.appendFile(fileName, `${word}\n`, "utf8", (err) => {
    if (err) {
      console.error(err);
      process.exit();
    }
  });
};

const main = async (_idx) => {
  const next = async () => {
    await writeToFile(data[idx], "word");
    idx++;
    if (idx === data.length) process.exit();
    log(`${idx}: ${data[idx]}`);
  };
  const skip = async () => {
    await writeToFile(data[idx], "deprecated");
    idx++;
    if (idx === data.length) process.exit();
    log(`${idx}: ${data[idx]}`);
  };

  const data = (await fs.promises.readFile("input.txt", "utf8")).split("|");

  let idx = _idx ?? 0;

  process.stdin.on("keypress", function (ch, key) {
    if (!key) return;
    if (key.name === "q" || (key.ctrl && key.name === "c")) {
      console.log("Exit");
      process.exit();
    } else if (key.name === "return") {
      next();
    } else if (key.name === "k") {
      skip();
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();

  log(`${idx}: ${data[idx]}`);
};

main(2010);

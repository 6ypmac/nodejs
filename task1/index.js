process.stdin.on("data", inputString => {
    const reverseString = inputString
        .toString()
        .slice(0, -1)
        .split("")
        .reverse()
        .join("");
    process.stdout.write(reverseString + "\n");
})
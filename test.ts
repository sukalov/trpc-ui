const output = decodeURIComponent(
  "%7B%220%22%3A%7B%22json%22%3A%7B%22transactionId%22%3A%22txn_01K23XPNG0J376K8N7FYE0PNHT%22%7D%7D%7D",
);

const nonBatched = decodeURIComponent(
  "%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D",
);

console.log(output);
console.log(typeof output);

console.log(nonBatched);
console.log(typeof nonBatched);

//! The batching is completely optional. We need to send a string like
// {"0":{"json":{"transactionId":"txn_01K23XPNG0J376K8N7FYE0PNHT"}}}
// string

//! this
// {"json":null,"meta":{"values":["undefined"]}}
// string

//! in the input

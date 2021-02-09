const Twitter = require('twitter-lite');
const config = require('./config.json');

const client = new Twitter(config);

let tweetText = "There will be a Nintendo Direct tomorrow"
if (tweetText.length > 280) {
    return console.log("Tweet body can only be 280 characters long.");
} else if (tweetText.length < 1) {
    return console.log("Tweet body has to be at least 1 character long.");
};


// Adaptive tweet text and checks

// Set body to an object
let postBody = {
    'status': tweetText
};

// Tweet
client.post('statuses/update', postBody).catch(console.error).then(result => {
    // console.log(result);
    return console.log(`You successfully tweeted: "${result.text}"`);
});
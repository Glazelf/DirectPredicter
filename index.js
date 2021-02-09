const Twitter = require('twitter-lite');
const config = require('./config.json');
const readline = require('readline-sync');

const client = new Twitter(config);

// Adaptive tweet text and checks

// Set body to an object
let postBody = {
    'status': "There will be a Nintendo Direct tomorrow."
};

// Tweet
client.post('statuses/update', postBody).catch(console.error).then(result => {
    // console.log(result);
    return console.log(`You successfully tweeted: "${result.text}"`);
});
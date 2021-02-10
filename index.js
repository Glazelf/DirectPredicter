const config = require('./config.json');
const cron = require("cron");
const timezone = 'cest';
const time = '00 00 20 * * *'; //Sec Min Hour, 8pm
const Twitter = require('twitter-lite');
const client = new Twitter(config);

let tweetText = "A Nintendo Direct will be announced tomorrow.";
if (tweetText.length > 280) {
    return console.log("Tweet body can only be 280 characters long.");
} else if (tweetText.length < 1) {
    return console.log("Tweet body has to be at least 1 character long.");
};

console.log("Starting cronjob...");

new cron.CronJob(time, async () => {
    // Set body to an object
    let postBody = {
        'status': tweetText
    };

    // Tweet
    client.post('statuses/update', postBody).catch(console.error).then(result => {
        // console.log(result);
        console.log(`Successfully tweeted: "${result.text}"`);
    });
}, timeZone = timezone, start = true);
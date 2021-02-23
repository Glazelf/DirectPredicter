const cron = require("cron");
const timezone = 'cest';
const time = '00 00 20 * * *'; // Sec Min Hour, 8pm
const config = require('./config.json');
const Twitter = require('twitter-lite');
const client = new Twitter(config);

console.log("Awaiting cronjob...");

new cron.CronJob(time, async () => {
    let tweetText = "A Nintendo Direct will be announced tomorrow";

    // Pokémon text
    tweetText = tweetText.replace("Nintendo", "Pokémon");

    // Get the date
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    let dateOutput = tomorrow.getDate() + '/' + (tomorrow.getMonth() + 1) + '/' + tomorrow.getFullYear();
    tweetText = `${tweetText} (${dateOutput}).`;

    // Check body length
    if (tweetText.length > 280) {
        return console.log(`Tweet body can only be 280 characters long. (Current length: ${tweetText.length})`);
    } else if (tweetText.length < 1) {
        return console.log("Tweet body has to be at least 1 character long.");
    };

    // Set body to an object
    let postBody = {
        'status': tweetText
    };

    // Tweet
    client.post('statuses/update', postBody).catch(console.error).then(result => {
        // console.log(result);
        console.log(`Tweeted: "${result.text}"`);
    });
}, timeZone = timezone, start = true);
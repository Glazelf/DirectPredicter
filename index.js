const cron = require("cron");
const timezone = 'cest';
const time11am = '00 00 11 * * *'; // Sec Min Hour, 11am
const time11pm = '00 00 23 * * *'; // 11pm
const config = require('./config.json');
const Twitter = require('twitter-lite');
const client = new Twitter(config);

console.log("Awaiting cronjob...");

let nintendoText = "A Nintendo Direct will be announced tomorrow";
let pokemonText = nintendoText.replace("Nintendo", "Pokémon");

// Send Pokémon direct prediction at 11am
new cron.CronJob(time11am, async () => {
    tweet(pokemonText);
}, timeZone = timezone, start = true);

// Send Nintendo direct prediction at 11pm
new cron.CronJob(time11pm, async () => {
    tweet(nintendoText);
}, timeZone = timezone, start = true);

// Tweet function
function tweet(tweetText) {
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
};
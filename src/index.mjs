import fetch from "node-fetch";

const args = process.argv.slice(2);
const command = args.length >= 1 ? args[0] : "deaths";

getDataFromWiki(command);

async function getDataFromWiki(command) {

    const mm = new Date().getMonth();
    const dd = new Date().getDate();

    const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/feed/onthisday/${command}/${mm}/${dd}`,
    );

    const body = await response.text();
    const data = JSON.parse(body);
    const rows = data[command];

    for (const [k, v] of rows.entries()) {
        console.log(v.text);
    }
}

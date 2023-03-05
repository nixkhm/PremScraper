import axios from "axios"
import cheerio from "cheerio"

const url = "https://analytics.soccerment.com/en/league/premier_league";
const AxiosInstance = axios.create();

interface team {
    name:string;
    position:number;
}

AxiosInstance.get(url)
.then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const rankingTablesRows = $(".table_container > tr")

    const teams : team[] = [];
    rankingTablesRows.each((i,elem) => {
        const name:string = $(elem).find(".team > a > span").text();
        const pos:number =  (i + 1);

        teams.push({
            name : name,
            position: pos
        })
    })

    console.log(teams);
}).catch(console.error);
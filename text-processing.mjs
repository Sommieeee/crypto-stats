
//Axios handles HTTP requests to web service
import axios from 'axios';

// Calls text-processing web service and logs sentiment.
export async function tpSentiment(text){
    //URL of web service
    let url = `http://text-processing.com/api/sentiment/`;

    //Sent GET to endpoint with Axios
    let response = await axios.post(url, {
            text: text
        },{
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    //Log result
    console.log(`Text: ${text}.`);
    console.log(response.data);

}

tpSentiment("Cryptocurrency is very exciting");



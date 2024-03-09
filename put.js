//Import AWS modules
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
//Create new DocumentClient
const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);
export async function saveNews(symbol, time, text) {
    //Create command with parameters of item we want to store
    const command = new PutCommand({
        TableName: "CryptoPrices",
        Item: {
            Text: text,
            CryptoSymbols: symbol,
            CryptoTimeStamp: time,
        },
    });
    //Store data in DynamoDB and handle errors
    try {
        const response = await documentClient.send(command);
        console.log(response);
    }
    catch (err) {
        console.error("ERROR uploading data: " + JSON.stringify(err));
    }
}

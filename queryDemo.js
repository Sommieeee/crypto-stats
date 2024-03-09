import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);
/* Retrieve all items with specified currency */
const query = {
    TableName: "Crypto",
    KeyConditionExpression: "Currency = :curr",
    ExpressionAttributeValues: { ":curr": "USD"
    },
};

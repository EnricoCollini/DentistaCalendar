'use strict';
const { DynamoDB } = require("aws-sdk");
const AWS = require("aws-sdk");

module.exports.create = async (event, context) => {
    let bodyObj = {}
    try {
        bodyObj = JSON.parse(event.body)
    } catch (jsonError) {
        console.log("Errore", jsonError)
        return {
            statusCode: 400
        }
    }
    if (typeof bodyObj.timestampAppuntamento === 'undefined' ||
        typeof bodyObj.paziente === 'paziente' ||
        typeof bodyObj.anno === 'undefined' ||
        typeof bodyObj.mese === 'undefined' ||
        typeof bodyObj.giorno === 'undefined' ||
        typeof bodyObj.ora === 'undefined' ||
        typeof bodyObj.minuti === 'undefined') {
        console.log("Missing parameters")
        return {
            statusCode: 400
        }
    }

    let putParams = {
        TableName: "newCalendarTable",
        Item: {
            timestampAppuntamento: bodyObj.timestampAppuntamento,
            paziente: bodyObj.paziente,
            anno: bodyObj.anno,
            mese: bodyObj.mese,
            giorno: bodyObj.giorno,
            ora: bodyObj.ora,
            minuti: bodyObj.minuti            
        },
        ConditionExpression: "attribute_not_exists(timestampAppuntamento)"
    }

    let putResult = {}
    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient()
        putResult = await dynamodb.put(putParams).promise()
    } catch (putError) {
        console.log("C'è un errore nell'inserimento dell'appuntamento")
        console.log("putParams", putParams)
        return {
            statusCode: 500
        }
    }

    return {
        statusCode: 201
    }
}

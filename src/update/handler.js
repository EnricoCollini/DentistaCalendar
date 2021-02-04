'use strict';
const { DynamoDB } = require("aws-sdk");
const AWS = require("aws-sdk")

module.exports.update = async (event, context) => {
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
        typeof bodyObj.paziente === 'undefined' ||
        typeof bodyObj.anno === 'undefined' || 
        typeof bodyObj.mese === 'undefined' ||
        typeof bodyObj.giorno === 'undefined' ||
        typeof bodyObj.ora === 'undefined' ||  
        typeof bodyObj.minuti === "undefined") {
        console.log("Missing parameters")
        return {
            statusCode: 400
        }
    }

    let updateParams = {
        TableName: "newCalendarTable",
        Key: {
            timestampAppuntamento: parseInt(event.pathParameters.timestampAppuntamento)
        },
        ExpressionAttributeValues: {
            ':paziente': bodyObj.paziente,
            ':anno': bodyObj.anno,
            ':mese': bodyObj.mese,
            ':giorno': bodyObj.giorno,
            ':ora': bodyObj.ora,
            ':minuti': bodyObj.minuti
        },
        UpdateExpression:   'SET paziente = :paziente , anno = :anno , mese =  :mese , giorno = :giorno , ora = :ora , minuti = :minuti' 
    }

    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient()
        await dynamodb.update(updateParams).promise()
    } catch (updateError) {
        console.log("c'è stato un errore nell'aggiornare l'utente")
        console.log(updateError)
        return {
            statusCode: 500
        }
    }

    return {
        statusCode: 200,
    }
}
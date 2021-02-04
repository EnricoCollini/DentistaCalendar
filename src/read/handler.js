'use strict';
const { DynamoDB } = require("aws-sdk");
const AWS = require("aws-sdk")

module.exports = {
    list: async (event, context) => {
        let scanParams = {
            TableName: "newCalendarTable"
        }
        let scanResult = {}
        try {
            let dynamodb = new AWS.DynamoDB.DocumentClient()
            scanResult = await dynamodb.scan(scanParams).promise()
        } catch (scanError) {
            console.log("C'è stato un errore scansionando gli appuntamenti")
            console.log("scanParams", scanParams)
            return {
                statusCode: 500
            }
        }

        if (scanResult.Item === null || !Array.isArray(scanResult.Items) || scanResult.Items.length === 0) {
            return {
                statusCode: 404
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(scanResult.Items.map(res => {
                return {
                    timestampAppuntamento: res.timestampAppuntamento,
                    paziente: res.paziente,
                    anno: res.anno,
                    mese: res.mese,
                    giorno: res.giorno,
                    ora: res.ora,
                    minuti: res.minuti,
                }
            }))
        }
    },
    get: async (event, context) => {
        let getParams = {
            TableName:  "newCalendarTable",
            Key: {
                timestampAppuntamento: parseInt(event.pathParameters.timestampAppuntamento)
            }
        }
        let getResult = {}
        try {
            let dynamodb = new AWS.DynamoDB.DocumentClient()
            getResult = await dynamodb.get(getParams).promise()
        } catch (getError) {
            console.log("c'è stato un errore nel prendere l'appuntamento per questa data")
            console.log(getError)
            return {
                statusCode: 500
            }
        }

        if (getResult.Item === null) {
            return {
                statusCode: 404
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                timestampAppuntamento: getResult.Item.timestampAppuntamento,
                paziente: getResult.Item.paziente,
                anno: getResult.Item.anno,
                mese: getResult.Item.mese,
                giorno: getResult.Item.giorno,
                ora: getResult.Item.ora,
                minuti: getResult.Item.minuti,
            })
        }
    },
    getAppuntamentiOfTheDay: async (event, context) => {
        console.log(event.pathParameters.anno)
        console.log(event.pathParameters.mese)
        console.log(event.pathParameters.giorno)
        let getParams = {
            TableName : "newCalendarTable",
            FilterExpression: "anno = :anno and mese = :mese and giorno = :giorno",
            ExpressionAttributeValues: {
                ":anno": parseInt(event.pathParameters.anno),
                ":mese": parseInt(event.pathParameters.mese),
                ":giorno": parseInt(event.pathParameters.giorno)
            }
        };
        let queryResults = {}
        try {
            let dynamodb = new AWS.DynamoDB.DocumentClient()
            queryResults = await dynamodb.scan(getParams).promise()
        } catch (getError) {
            console.log("c'è stato un errore nel prendere l'appuntamento per questa data")
            console.log(getError)
            return {
                statusCode: 500
            }
        }


        return {
            statusCode: 200,
            body: JSON.stringify(queryResults.Items.map(res => {
                return {
                    timestampAppuntamento: res.timestampAppuntamento,
                    paziente: res.paziente,
                    anno: res.anno,
                    mese: res.mese,
                    giorno: res.giorno,
                    ora: res.ora,
                    minuti: res.minuti,
                }
            }))
        }
    },
    getAppuntamentiOfTheMonth: async (event, context) => {
        console.log(event.pathParameters.anno)
        console.log(event.pathParameters.mese)
        let getParams = {
            TableName : "newCalendarTable",
            FilterExpression: "anno = :anno and mese = :mese",
            ExpressionAttributeValues: {
                ":anno": parseInt(event.pathParameters.anno),
                ":mese": parseInt(event.pathParameters.mese)
            }
        };
        let queryResults = {}
        try {
            let dynamodb = new AWS.DynamoDB.DocumentClient()
            queryResults = await dynamodb.scan(getParams).promise()
        } catch (getError) {
            console.log("c'è stato un errore nel prendere l'appuntamento per questa data")
            console.log(getError)
            return {
                statusCode: 500
            }
        }


        return {
            statusCode: 200,
            body: JSON.stringify(queryResults.Items.map(res => {
                return {
                    timestampAppuntamento: res.timestampAppuntamento,
                    paziente: res.paziente,
                    anno: res.anno,
                    mese: res.mese,
                    giorno: res.giorno,
                    ora: res.ora,
                    minuti: res.minuti,
                }
            }))
        }
    },
    getappuntamentiDelPaziente: async (event, context) => {
        console.log(event.pathParameters.paziente)
        let getParams = {
            TableName : "newCalendarTable",
            FilterExpression: "paziente = :paziente",
            ExpressionAttributeValues: {
                ":paziente": event.pathParameters.paziente
            }
        };
        let queryResults = {}
        try {
            let dynamodb = new AWS.DynamoDB.DocumentClient()
            queryResults = await dynamodb.scan(getParams).promise()
        } catch (getError) {
            console.log("c'è stato un errore nel prendere l'appuntamento per questa data")
            console.log(getError)
            return {
                statusCode: 500
            }
        }


        return {
            statusCode: 200,
            body: JSON.stringify(queryResults.Items.map(res => {
                return {
                    timestampAppuntamento: res.timestampAppuntamento,
                    paziente: res.paziente,
                    anno: res.anno,
                    mese: res.mese,
                    giorno: res.giorno,
                    ora: res.ora,
                    minuti: res.minuti,
                }
            }))
        }
    }
}
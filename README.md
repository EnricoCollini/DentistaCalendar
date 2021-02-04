# DentistaCalendar

Back-End per un gestionale di un calendario di un dentista.
Architettura serverless framework + AWS + DynamoDB

Use Case CRUD Appuntamenti.

 timestampAppuntamento | paziente(codicefiscale) | anno | mese | giorno | ora | minuti
 
 
 
### creaappuntamento
POST https://32oayv3d54.execute-api.us-east-1.amazonaws.com/dev/v1/creaAppuntamento

{
    "timestampAppuntamento": 140007,
    "paziente": "CLLNRC",
    "anno": 2021,
    "mese": 2,
    "giorno":8,
    "ora": 9,
    "minuti": 30
}


### updateAppuntamento {timestamp}
PUT  https://-----...us-east-1.amazonaws.com/dev/v1/updateAppuntamento/140007

{
    "timestampAppuntamento": 140006,
    "paziente": "CLLNRC1",
    "anno": 2021,
    "mese": 2,
    "giorno":8,
    "ora": 9,
    "minuti": 30
}

### getAllAppuntamenti
GET  https://-----...us-east-1.amazonaws.com/dev/v1/getAppuntamenti

### getappuntamento {timestamp}
GET  https://-----...us-east-1.amazonaws.com/dev/v1/getAppuntamento/140003

### getappuntamentioftheday {anno} {mese} {giorno}
GET   https://-----...us-east-1.amazonaws.com/dev/v1/getAppuntamentiOfTheDay/2021/2/4

### getAppuntamentiOfTheMonth {anno} {mese}
GET https://-----...us-east-1.amazonaws.com/dev/v1/getAppuntamentiOfTheMonth2021/2

### getappuntamentidelpaziente {codicefiscale}
GET https://-----...us-east-1.amazonaws.com/dev/v1/getappuntamentiDelPaziente/CLLNRC

### deleteAppuntamento {timestamp}
DELETE  https://-----...us-east-1.amazonaws.com/dev/v1/deleteAppuntamento/140002


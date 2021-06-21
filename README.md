# VENOM-API

### config/default.json
```json
{
    "api": {
        "port": 8000
    },
    "sessionName": "UUID-HASH or PhoneNumber or filename possible string",
    "phoneStrategy": {
        "phoneLibrary" : "brazil",
        "phoneOptions":{
            "DDD":"19"
        }
    },
    "webhook":{
        "messages":"Put your webhook here.",
        "qrcode":"Put your webhook here.",
        "ack":"Put your webhook here.",
        "states":"Put your webhook here."
    }
}
```
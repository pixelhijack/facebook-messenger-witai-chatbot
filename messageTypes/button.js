const button = {
    "attachment": {
        "type": "template",
        "payload":{
            "template_type": "button",
            "text": "What do you want to do next?",
            "buttons": [
                {
                    "type":"web_url",
                    "url":"https://www.messenger.com",
                    "title":"Visit Messenger"
                }, {
                    "type":"web_url",
                    "url":"https://www.google.com",
                    "title":"Visit Google"
                }, {
                    "type": "postback",
                    "title": "Nothing. Say this to Zuckerberg.",
                    "payload": "Payload for the third option yeeeah"
                }
            ]
        }
    }
};

module.exports = button;

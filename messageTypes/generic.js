const genericMessage = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "generic",
            "elements": [{
                "title": "First card",
                "subtitle": "Element #1 of an hscroll",
                "image_url": "http://lorempixel.com/400/200/people/",
                "buttons": [{
                    "type": "web_url",
                    "url": "https://www.messenger.com",
                    "title": "web url"
                }, {
                    "type": "postback",
                    "title": "Postback",
                    "payload": "Payload for first element in a generic bubble"
                }],
            }, {
                "title": "Second card",
                "subtitle": "Element #2 of an hscroll",
                "image_url": "http://lorempixel.com/400/200/nature/",
                "buttons": [{
                    "type": "postback",
                    "title": "Postback",
                    "payload": "Payload for second element in a generic bubble"
                }],
            }]
        }
    }
};

module.exports = genericMessage;

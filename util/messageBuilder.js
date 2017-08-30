const request = require('request');

const messageBuilder = (token) => {
    return (recipient, message) => {
        request({
    	    url: 'https://graph.facebook.com/v2.6/me/messages',
    	    qs: { access_token: token },
    	    method: 'POST',
    		json: {
    		    recipient: { id: recipient },
    			message: message,
    		}
    	}, (error, response, body) => {
    		if(error) {
    		    console.log('[MESSAGE BUILDER] Error sending messages: ', error)
    		} else if(response.body.error) {
    		    console.log('[MESSAGE BUILDER] Error: ', response.body.error)
    	    }
        });
    };
};

module.exports = messageBuilder;

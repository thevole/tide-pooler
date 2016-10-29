"use strict";

var Alexa = require('alexa-sdk');

require("dotenv").config();

var SKILL_NAME = "Tide Pooler";

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, callback);
    alexa.APP_ID = APP_ID
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'GetTideIntent': function () {
        var citySlot = this.event.request.intent.slots.City;
        var cityName;
        if (citySlot && citySlot.value) {
            cityName = citySlot.value;
            var cardTitle = SKILL_NAME + " High Tide For - " + cityName;
            var time = "5:00pm";
            var speechOutput = "I'm sorry I don't know when high tide is for that location";
            this.emit(':tell', speechOutput);
        }
    },
    'AMAZON.HelpIntent': function() {
         var speechOutput = "You can say when is high tide in city name, or, " +
             "you can say exit... What can I help you with?";
         var reprompt = "What can I help you with?";
         this.emit(':ask', speechOutput, reprompt)
    }
}

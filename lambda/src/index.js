/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const request = require('request');

let API_ENDPOINT = 'https://lab-x2.api.com/311/v1.0/alexa';

const GetAnalysisReport = (hashtag) => {
  return new Promise((resolve, reject) => {
    request(API_ENDPOINT, { 'hashtag': hashtag }, (err, res, response) => {
      if (err) {
        reject(err);
      } else {
        let json = JSON.parse(response);
        console.log('response ', json);
        resolve(`It is ${json.message}`);
      }
    });
  });
}


/* INTENT HANDLERS */
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(WELCOME_MESSAGE)
      .reprompt(WELCOME_REPROMPT)
      .getResponse();
  },
};

const GetSentimentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'SentimentIntent';
  },
  async handle(handlerInput) {
    const userSlot = handlerInput.requestEnvelope.request.intent.slots.Tag;
    let hashtag;
    if (userSlot && userSlot.value) {
      hashtag = userSlot.value.toLowerCase();
      console.log('hashtag2 ' + hashtag);
    }

    const analysisReport = await GetAnalysisReport(hashtag);
    console.log('analysisReport ' + analysisReport);
    const speechOutput = GET_SENTIMENT_MESSAGE + analysisReport;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, analysisReport)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

// const FallbackHandler = {
//   // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.
//   //              This handler will not be triggered except in that locale, so it can be
//   //              safely deployed for any locale.
//   canHandle(handlerInput) {
//     const request = handlerInput.requestEnvelope.request;
//     return request.type === 'IntentRequest'
//       && request.intent.name === 'AMAZON.FallbackIntent';
//   },
//   handle(handlerInput) {
//     return handlerInput.responseBuilder
//       .speak(FALLBACK_MESSAGE)
//       .reprompt(FALLBACK_REPROMPT)
//       .getResponse();
//   },
// };

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Twitter Sentiment Analysis';
const WELCOME_MESSAGE = 'Welcome to ' + SKILL_NAME + '. To start, you can say analyse amazon hashtag';
const WELCOME_REPROMPT = 'For instructions on what you can say, please say help me.';
const GET_SENTIMENT_MESSAGE = 'Analysis result is: ';
const HELP_MESSAGE = 'To start, you can say analyse jinglebells hashtag';
const HELP_REPROMPT = 'You can say things like, analyse jinglebells hashtag, or you can say exit...Now, what can I help you with?';
// const FALLBACK_MESSAGE = 'The Space Facts skill can\'t help you with that. It can help you discover facts about space if you say tell me a space fact. What can I help you with?';
// const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
  LaunchRequestHandler,
  GetSentimentHandler,
  HelpHandler,
  ExitHandler,
  // FallbackHandler,
  SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

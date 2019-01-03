const { promisify } = require('util');
const { dialogflow, SimpleResponse } = require('actions-on-google');
const functions = require('firebase-functions');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const { keyById, audioSsml } = require('./util');
const getToneResponse = require('./get-tone-response');

// CHANGEME need to shorten and adjust audio level of some files
// CHANGEME FINAL::need to upload audio to different server
// CHANGEME add title, icon, description etc for app
// CHANGEME come up with all the phrases that should trigger your action
// CHANGEME add french support
const app = dialogflow({ debug: true });

/** **** TONE ANALYSER ***** */
const toneAnalyzer = new ToneAnalyzerV3({
    iam_apikey: '***REMOVED***',
    version: '2019-01-02',
    // url: 'https://gateway.watsonplatform.net/tone-analyzer/api', //default
});

const analyzeTone = promisify(toneAnalyzer.tone.bind(toneAnalyzer));

/** **** DIALOGFLOW ***** */
const intentCancel = (conv) => {
    conv.close(`CHANGEME What a performance! Come back soon.`);
};

app.intent('Default Welcome Intent', (conv) => {
    // maybe open with crowd sounds (and curtain?) and end with crowd setling and curtain opening
    conv.ask(`
        <speak>
            CHANGEME Welcome to <emphasis>your</emphasis> live studio audience! Perform in front of a lively crowd ready to laugh, gasp, and shout! Just Make sure to give the audience time to react. Now get ready, cuz it's your time to shine!
        </speak>
    `);
});

app.intent('Default Fallback Intent', (conv) => {
    const { query, user: { locale } } = conv;

    const toneAnalyzerParams = {
        tone_input: { text: query },
        sentences: false,
        content_type: 'application/json',
        content_language: locale,
    };

    return analyzeTone(toneAnalyzerParams)
        .then((data) => {
            let { tones } = data.document_tone;

            tones = keyById(tones, 'tone_id');

            const { speech, text } = getToneResponse(tones);

            conv.ask(new SimpleResponse({ speech: audioSsml(speech), text }));
        })
        .catch((error) => {
            console.error(error);
            conv.close(`Hmm looks like we're having some technical difficulties on stage. Please try again later.`);
        });
});

app.intent('actions_intent_NO_INPUT', (conv) => {
    const repromptCount = +conv.arguments.get('REPROMPT_COUNT');

    if (repromptCount === 1) {
        intentCancel(conv);
    } else {
        conv.ask(audioSsml('good/crickets%20(a%20little%20too%20high).mp3'));
    }
});

app.intent('actions_intent_CANCEL', (conv) => {
    // include curtain closing?
    // is it in poor taste to even have a cancel command?
    intentCancel(conv);
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

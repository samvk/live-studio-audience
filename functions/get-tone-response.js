const { randomPop, audioSsml } = require('./util');

module.exports = ({
    anger, fear, joy, sadness, analytical, confident, tentative,
}) => {
    if (anger && confident) { // threatening
        return {
            speech: audioSsml('good/boooo.mp3'),
            text: randomPop(['Boooo! 👿', 'Boooooo! 🤬']),
        };
    }
    if (analytical && confident) {
        return {
            speech: audioSsml('final/clap%20-%20analytical.mp3'),
            text: '👏 👏 👏',
        };
    }
    if (joy && confident) { // threatening
        return {
            speech: audioSsml('final/claps/claps-cheers.mp3', 'final/claps/claps-cheers2.mp3', 'final/claps/claps-cheers3.mp3'),
            text: randomPop(['Wooo~ 😁', 'Whoooo! 😁', 'Whoooooo! 😆']),
        };
    }
    if ((joy || confident) && tentative) { // awkwardly happy/confident
        return {
            speech: audioSsml('final/laugh/awkward/less%20awkward.mp3', 'final/laugh/awkward/more%20awkward.mp3'),
            text: 'Heh.',
        };
    }
    if (anger) {
        return {
            speech: audioSsml('good/angry.mp3'),
            text: randomPop(['Ghrrrrrr! 😡', '*Rabble rabble!* 😠']),
        };
    }
    if (fear) {
        return {
            speech: audioSsml('gasp/less.mp3', 'gasp/more.mp3'),
            text: randomPop(['*Gasp!* 😲', '*Gasp!* 😨']),
        };
    }
    if (joy) {
        return {
            speech: audioSsml('final/laugh/soft.mp3', 'final/laugh/soft2.mp3', 'final/laugh/soft-medium.mp3', 'final/laugh/soft-medium-largish%20and%20a%20hint%20of%20clapping.mp3'),
            text: randomPop(['Hee hee 🙂', 'Hahaha 😊', 'Hahahahaha 😄']),
        };
    }
    if (sadness) {
        return {
            speech: audioSsml('good/awwwwwww%20sad.mp3'),
            text: randomPop(['Awww 😞', 'Awwwwww ☹️']),
        };
    }
    if (analytical) {
        return {
            speech: audioSsml('good/ahhhhhh%20I%20see.mp3', 'good/ahhhhhhhh%20I%20see.mp3', 'good/oooo%20dear!%20(need%20to%20trim%20opening)123.mp3'),
            text: randomPop(['Ahhhhhh.', 'Ohhhhhh']),
        };
    }
    if (confident) {
        return {
            speech: audioSsml('final/claps/claps2%20average-big.mp3', 'final/claps/claps2%20average-bigger.mp3'),
            text: randomPop(['👏 👏 👏', '👏 👏 👏 👏']),
        };
    }
    if (tentative) {
        return {
            speech: audioSsml('confused/shorter.mp3'),
            text: randomPop(['Wha!? 😟', 'Wha!? 😰']),
        };
    }
    // no tone
    return {
        speech: 'Cannot decide tone CHANGEME', // should be murmuring?
        text: 'Cannot decide tone here CHANGEME', // 🤨😐😕
    };
};

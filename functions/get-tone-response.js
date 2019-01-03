const popByScore = (arr, score) => {
    const relativeIndex = Math.min(Math.floor(((score - 0.5) * 2) * arr.length), arr.length - 1);
    return arr[relativeIndex];
};

module.exports = ({
    anger, fear, joy, sadness, analytical, confident, tentative,
}) => {
    if (anger && confident) { // threatening
        return {
            speech: popByScore(['good/boooo.mp3'], Math.max(anger.score, confident.score)),
            text: popByScore(['Boooo! 👿', 'Boooooo! 🤬'], Math.max(anger.score, confident.score)),
        };
    }
    if (joy && confident) {
        return {
            speech: popByScore(['final/claps/claps-cheers.mp3', 'final/claps/claps-cheers2.mp3', 'final/claps/claps-cheers3.mp3'], Math.max(joy.score, confident.score)),
            text: popByScore(['Wooo~ 😁', 'Whoooo! 😁', 'Whoooooo! 😆'], Math.max(joy.score, confident.score)),
        };
    }
    if ((joy || confident) && tentative) { // awkwardly happy/confident
        return {
            speech: popByScore(['final/laugh/awkward/less%20awkward.mp3', 'final/laugh/awkward/more%20awkward.mp3'], Math.max(joy && joy.score, confident && confident.score, tentative.score)),
            text: popByScore(['Heh.'], Math.max(joy && joy.score, confident && confident.score, tentative.score)),
        };
    }
    if (analytical && confident) {
        return {
            speech: popByScore(['final/clap%20-%20analytical.mp3'], Math.max(analytical.score, confident.score)),
            text: popByScore(['👏 👏 👏'], Math.max(analytical.score, confident.score)),
        };
    }
    if (anger) {
        return {
            speech: popByScore(['good/angry.mp3'], anger.score),
            text: popByScore(['Ghrrrrrr! 😡', '*Rabble rabble!* 😠'], anger.score),
        };
    }
    if (fear) {
        return {
            speech: popByScore(['gasp/less.mp3', 'gasp/more.mp3'], fear.score),
            text: popByScore(['*Gasp!* 😲', '*Gasp!* 😨'], fear.score),
        };
    }
    if (joy) {
        return {
            speech: popByScore(['final/laugh/soft.mp3', 'final/laugh/soft2.mp3', 'final/laugh/soft-medium.mp3', 'final/laugh/soft-medium-largish%20and%20a%20hint%20of%20clapping.mp3'], joy.score),
            text: popByScore(['Hee hee 🙂', 'Hahaha 😊', 'Hahahahaha 😄'], joy.score),
        };
    }
    if (sadness) {
        return {
            speech: popByScore(['good/awwwwwww%20sad.mp3'], sadness.score),
            text: popByScore(['Awww 😞', 'Awwwwww ☹️'], sadness.score),
        };
    }
    if (analytical) {
        return {
            speech: popByScore(['good/ahhhhhh%20I%20see.mp3', 'good/ahhhhhhhh%20I%20see.mp3', 'good/oooo%20dear!%20(need%20to%20trim%20opening)123.mp3'], analytical.score),
            text: popByScore(['Ahhhhhh.', 'Ohhhhhh'], analytical.score),
        };
    }
    if (confident) {
        return {
            speech: popByScore(['final/claps/claps2%20average-big.mp3', 'final/claps/claps2%20average-bigger.mp3'], confident.score),
            text: popByScore(['👏 👏 👏', '👏 👏 👏 👏'], confident.score),
        };
    }
    if (tentative) {
        return {
            speech: popByScore(['confused/shorter.mp3'], tentative.score),
            text: popByScore(['Wha!? 😟', 'Wha!? 😰'], tentative.score),
        };
    }
    // no tone
    return {
        speech: 'Cannot decide tone CHANGEME', // should be murmuring?
        text: 'Cannot decide tone here CHANGEME', // 🤨😐😕
    };
};

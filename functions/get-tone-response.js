const popByScore = (arr, score) => {
    const relativeIndex = Math.min(Math.floor(((score - 0.5) * 2) * arr.length), arr.length - 1);
    return arr[relativeIndex];
};

module.exports = ({
    anger, fear, joy, sadness, analytical, confident, tentative,
}) => {
    if (anger && confident) { // threatening
        return {
            speech: popByScore(['threatening/threatening-110.mp3'], Math.max(anger.score, confident.score)),
            text: popByScore(['Boooo! 👿', 'Boooooo! 🤬'], Math.max(anger.score, confident.score)),
        };
    }
    if ((joy || confident) && tentative) { // awkwardly happy/confident (can you get both condifent and tentative?)
        return {
            speech: popByScore(['awkward/awkward-110.mp3', 'awkward/awkward-120.mp3'], Math.max(joy && joy.score, confident && confident.score, tentative.score)),
            text: popByScore(['Heh.'], Math.max(joy && joy.score, confident && confident.score, tentative.score)),
        };
    }
    if (analytical && confident) { // clever
        return {
            speech: popByScore(['clever/clever-110.mp3'], Math.max(analytical.score, confident.score)),
            text: popByScore(['👏 👏 👏'], Math.max(analytical.score, confident.score)),
        };
    }
    if (analytical && joy) { // amused
        // ATM I'm just basing this score on "joy" (as the responses lead more towards that)
        return {
            speech: popByScore(['amused/amused-110.mp3'], joy.score),
            text: popByScore(['Ooooooh~ 🤭', 'Ooooooooh~ 🤭'], joy.score),
        };
    }
    if (fear) {
        return {
            speech: popByScore(['fear/fear-110.mp3', 'fear/fear-120.mp3'], fear.score),
            text: popByScore(['*Gasp!* 😲', '*Gasp!* 😨'], fear.score),
        };
    }
    if (anger) {
        return {
            speech: popByScore(['anger/anger-110.mp3'], anger.score),
            text: popByScore(['Ghrrrrrr! 😡', '*Rabble rabble!* 😠'], anger.score),
        };
    }
    if (sadness) {
        return {
            speech: popByScore(['sadness/sadness-110.mp3'], sadness.score),
            text: popByScore(['Awww 😞', 'Awwwwww ☹️'], sadness.score),
        };
    }
    if (analytical) {
        return {
            speech: popByScore(['analytical/analytical-110.mp3', 'analytical/analytical-120.mp3'], analytical.score),
            text: popByScore(['Ahhhhh.', 'Ahhhhhh.', 'Ohhhhhh'], analytical.score),
        };
    }
    if (tentative) {
        return {
            speech: popByScore(['tentative/tentative-110.mp3'], tentative.score),
            text: popByScore(['Wha!? 😟', 'Wha!? 😰'], tentative.score),
        };
    }
    // if (joy) {
    //     return {
    //         speech: popByScore(['final/laugh/soft.mp3', 'final/laugh/soft2.mp3', 'final/laugh/soft-medium.mp3', 'final/laugh/soft-medium-largish%20and%20a%20hint%20of%20clapping.mp3'], joy.score),
    //         text: popByScore(['Hee hee 🙂', 'Hahaha 😊', 'Hahahahaha 😄'], joy.score),
    //     };
    // }
    if (joy) {
        return {
            speech: popByScore(['joy/joy-110.mp3', 'joy/joy-120.mp3', 'joy/joy-130.mp3'], joy.score),
            text: popByScore(['Wooo~ 😁', 'Whoooo! 😁', 'Whoooooo! 😆'], joy.score),
        };
    }
    if (confident) {
        return {
            speech: popByScore(['confident/confident-110.mp3', 'confident/confident-120.mp3'], confident.score),
            text: popByScore(['👏 👏 👏', '👏 👏 👏 👏'], confident.score),
        };
    }
    // no tone
    return {
        // ??? 🤨😐😕 *mumble* 'mumble/mumble-short.mp3'
        speech: 'toneless/toneless-110.mp3', // should be murmuring?
        text: '*cough* 😐',
    };
};

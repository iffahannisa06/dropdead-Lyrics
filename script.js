
const music = document.getElementById("music");
const playBtn = document.getElementById("play");
const lyrics = document.getElementById("lyrics");
const seek = document.getElementById("seek");
const current = document.getElementById("current");
const duration = document.getElementById("duration");


const lyricLines = [
    { time: 0, text: "♡ drop dead ♡" },
    { time: 15, text: "I know that the bar closes at 11" },
    { time: 22, text: "I hope you never finish that beer" },
    { time: 30, text: "You know all the words to 'Just Like Heaven'" },
    { time: 35, text: "And I know why he wrote them" },
    { time: 38, text: "Now that you're standing right here" },
    { time: 44, text: "Ohh One night I was bored in bed" },
    { time: 48, text: "And stalked you on the internet" },
    { time: 51, text: "It's feminine intuition" },
    { time: 55, text: "'Cuz I always had a vision of us standing like this" },
    { time: 59, text: "All pressed up in the bathroom line" },
    { time: 63, text: "You're looking like an angel on the walls of Versailles" },
    { time: 67, text: "The most alive I've ever been" },
    { time: 70, text: "But kiss me and I might ♡drop dead♡" },
    { time: 81, text: "And I feel like I might throw up" },
    { time: 83, text: "Left hook, right punch to the gut" },
    { time: 85, text: "You're so so pretty boy" },
    { time: 87, text: "I'm paranoid I made you up" },
    { time: 89, text: "Yeah I'd love it if you walked me home" },
    { time: 91, text: "If you promised we could go real slow" },
    { time: 92, text: "'Cuz I got chewing gum" },
    { time: 94, text: "And a bunch of stuff I'd like to know" },
    { time: 96, text: "Like, have you ever been to Japan?" },
    { time: 98, text: "Or taken that Eurostar to France?" },
    { time: 100, text: "I've been dropping hints all night" },
    { time: 101, text: "That I'd love it if you held my hand, goddamn" },
    { time: 103, text: "And then maybe we could make-makeout" },
    { time: 105, text: "Clothes off and fall to the ground" },
    { time: 107, text: "Let's go steady" },
    { time: 108, text: "Let's go out" },
    { time: 109, text: "And tell the whole damn world ohh" },
    { time: 111, text: "One night I was bored in bed" },
    { time: 114, text: "And stalked you on the internet" },
    { time: 117, text: "It's feminine intuition" },
    { time: 121, text: "'Cuz I always had a vision of us standing like this" },
    { time: 125, text: "All pressed up in the bathroom line" },
    { time: 129, text: "You're looking like an angel on the walls of Versailles" },
    { time: 133, text: "The most alive I've ever been" },
    { time: 136, text: "But kiss me and I might" },
    { time: 140, text: "Pisces and a Gemini" },
    { time: 143, text: "But I think we might go really nice together" },
    { time: 147, text: "If you let me stay the night" },
    { time: 151, text: "Well I think I might just have to stay forever" },
    { time: 155, text: "Pisces and a Gemini" },
    { time: 158, text: "But I think we might go really nice together" },
    { time: 162, text: "If you let me stay the night" },
    { time: 166, text: "Well I think I might just have to stay forever" },
    { time: 170, text: "💗💗💗" },
    { time: 184, text: "Ohh One night I was bored in bed" },
    { time: 188, text: "And stalked you on the internet" },
    { time: 191, text: "It's feminine intuition" },
    { time: 195, text: "'Cuz I always had a vision of us standing like this" },
    { time: 199, text: "All pressed up in the bathroom line" },
    { time: 202, text: "You're looking like an angel on the walls of Versailles" },
    { time: 207, text: "The most alive I've ever been" },
    { time: 210, text: "But kiss me and I might" },
    { time: 214, text: "Kiss me and I might" },
    { time: 218, text: "Kiss me and I might ♡drop dead♡" },
];

function updateLyrics() {
    let activeLine = null;

    for (const line of lyricLines) {
        if (music.currentTime >= line.time) {
            activeLine = line;
        }
    }

    lyrics.textContent = activeLine
        ? activeLine.text
        : "Press play to start ▶";
}

function showTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);

    return `${min}:${String(sec).padStart(2, "0")}`;
}

playBtn.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
            playBtn.textContent = "Ⅱ";
        } catch (error) {
            alert("File musik tidak bisa diputar.");
        }
    } else {
        music.pause();
        playBtn.textContent = "▶";
    }
});

music.addEventListener("loadedmetadata", () => {
    duration.textContent = showTime(music.duration);
});

music.addEventListener("timeupdate", () => {
    current.textContent = showTime(music.currentTime);

    if (music.duration > 0) {
        seek.value = music.currentTime / music.duration * 100;
    }

    updateLyrics();
});

seek.addEventListener("input", () => {
    if (music.duration > 0) {
        music.currentTime = Number(seek.value) / 100 * music.duration;
        updateLyrics();
    }
});

document.getElementById("next").addEventListener("click", () => {
    const nextLine = lyricLines.find(
        line => line.time > music.currentTime + 0.5
    );

    if (nextLine) {
        music.currentTime = nextLine.time;
        updateLyrics();
    }
});

document.getElementById("prev").addEventListener("click", () => {
    const previousLines = lyricLines.filter(
        line => line.time < music.currentTime - 0.5
    );

    music.currentTime = previousLines.length
        ? previousLines[previousLines.length - 1].time
        : 0;

    updateLyrics();
});

music.addEventListener("ended", () => {
    playBtn.textContent = "▶";
    lyrics.textContent = "Thanks for listening ♡";
});

updateLyrics();

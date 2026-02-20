const toggle = document.querySelector("input");
const body = document.body;

const light = {
    yellowColor: {r: 224, g: 196, b: 11},
    complementaryColor: {r: 182, g: 163, b: 39}
}

const dark = {
    yellowColor: {r: 139, g: 128, b: 53},
    complementaryColor: {r: 97, g: 91, b: 53}
}

function interpolate(start, end, progress) {
    return Math.round(start + (end - start) * progress)
}

function animateGradient(from, to, duration = 800) {
    const startTime = performance.now();

    const fromYellow = from.yellowColor;
    const fromComplement = from.complementaryColor;
    const toYellow = to.yellowColor;
    const toComplement = to.complementaryColor;

    function frame(curretTime) {
        const elapsed = curretTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const r1 = interpolate(fromYellow.r, toYellow.r, progress);
        const g1 = interpolate(fromYellow.g, toYellow.g, progress);
        const b1 = interpolate(fromYellow.b, toYellow.b, progress);

        const r2 = interpolate(fromComplement.r, toComplement.r, progress);
        const g2 = interpolate(fromComplement.g, toComplement.g, progress);
        const b2 = interpolate(fromComplement.b, toComplement.b, progress);

        body.style.background = `radial-gradient(rgb(${r1}, ${g1}, ${b1}), rgb(${r2}, ${g2}, ${b2}))`;

        if(progress < 1) {
            requestAnimationFrame(frame);
        }
    }

    requestAnimationFrame(frame);
}

let isLight = false;

toggle.addEventListener("change", () => {
    if (isLight) {
        animateGradient(light, dark);
    } else {
        animateGradient(dark, light);
    }
    isLight = !isLight;
});
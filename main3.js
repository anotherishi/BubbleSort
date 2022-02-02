const inputField = document.getElementById("arr-input");
const sortBtn = document.getElementById("sort");
const sortArea = document.getElementById("area");
const info = document.getElementById("info");
let inners = [];

let maxNumLength = 1;
let arr = [];

let animDuration = 2;
document.documentElement.style.setProperty(
    "--anim-duration",
    animDuration + "s"
);

const sleep = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000));

sortBtn.onclick = () => {
    arr = inputField.value
        .replace(/[^0-9\.,]/g, "")
        .split(",")
        .filter((o) => o)
        .map((s) => +s);

    inputField.value = arr;

    arr.forEach((num, index) => {
        let numLength = num.toString().length;
        if (numLength > maxNumLength) maxNumLength = numLength;

        let el = classDiv("el");
        el.style.order = index + 1;
        el.innerText = num;
        sortArea.appendChild(el);
        inners.push({
            val: num,
            el: el
        });
    });
    document.documentElement.style.setProperty("--nw", maxNumLength + "ch");
    // bs();
};

function swap(j) {
    return new Promise((resolve) => {
        let e1 = inners[j].el;
        let e2 = inners[j + 1].el;
        let o1 = e1.style.order;
        let o2 = e2.style.order;
        e1.classList.add("mover", "move-up");
        e2.classList.add("mover", "move-down");
        e1.onanimationend = () => {
            e1.classList.remove("mover", "move-up");
            e2.classList.remove("mover", "move-down");
            e2.style.order = arr.indexOf(inners[j].val) + 1;
            e1.style.order = arr.indexOf(inners[j+1].val) + 1;
            resolve();
        };
    });
}

async function bs() {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        console.log("Bubble ", i + 1);
        for (let j = 0; j < n - i - 1; j++) {
            console.log("    step", j + 1);
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                await swap(j);
            } else await sleep(animDuration);
        }
    }
}

function classDiv(...cl) {
    const div = document.createElement("div");
    div.classList.add(...cl);
    return div;
}

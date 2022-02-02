const arrInput = document.getElementById("arr-input");
const sortButton = document.getElementById("sort");
const sortArea = document.getElementById("area");
const info = document.getElementById("info");

let maxLength = 1;
let arr = [];
const inners = [];
const outers = [];

let ant = 2;
document.documentElement.style.setProperty("--at", ant + "s");

console.log(
    "Hi!\nyou can input the list as comma separated numbers\n(without brackets)"
);

const swap = async (i, j) => {
    out1 = outers[j];
    out2 = outers[j + 1];
    out1.style.backgroundColor = out2.style.backgroundColor = "pink";
    if (arr[j] > arr[j + 1]) {
        console.log(arr[j], ">", arr[j + 1], "   swapping");
        info.innerHTML = `Bubble ${i + 1}, Step ${j + 1} <br>Swapping...`;
        return new Promise((resolve) => {
            in1 = inners[j];
            in2 = inners[j + 1];

            let m1 = classDiv("el", "mover", "move-up");
            let m2 = classDiv("el", "mover", "move-down");
            m1.innerText = in1.innerText;
            m2.innerText = in2.innerText;
            in1.hidden = in2.hidden = true;
            out1.appendChild(m1);
            out2.appendChild(m2);
            m1.onanimationend = () => {
                [in1.innerText, in2.innerText] = [in2.innerText, in1.innerText];
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                m1.remove();
                m2.remove();
                in1.hidden = in2.hidden = false;

                out1.style.backgroundColor = out2.style.backgroundColor =
                    "white";
                setTimeout(resolve, 600);
            };
        });
    } else {
        console.log(arr[j], "<", arr[j + 1], "   nothing");
        info.innerHTML = `Bubble ${i + 1}, Step ${
            j + 1
        } <br>already arranged...`;
        await sleep(ant);
    }
    out1.style.backgroundColor = out2.style.backgroundColor = "white";
};

function classDiv(...cl) {
    const div = document.createElement("div");
    div.classList.add(...cl);
    return div;
}

const sleep = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000));

sortButton.onclick = () => {
    try {
        arr = arrInput.value
            .replace(/[^0-9\.,]/g, "")
            .split(",")
            .filter((o) => o)
            .map((s) => +s);
        arrInput.value = arr;
        arr.forEach((num) => {
            let numLength = num.toString().length;
            if (numLength > maxLength) maxLength = numLength;

            let out = classDiv("out");
            let el = classDiv("el");
            el.innerText = num;
            out.appendChild(el);
            sortArea.appendChild(out);
            inners.push(el);
            outers.push(out);
        });
        document.documentElement.style.setProperty("--nw", maxLength + "ch");

        bs();
        sortButton.disabled = arrInput.disabled = true;
    } catch {
        info.innerHTML = "looks like something's wrong<br> please reset";
    }
};

let als = false;

async function bs() {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        console.log("bubble", i + 1);
        let j = 0;
        for (; j < n - i - 1; j++) {
            info.innerText = `Bubble ${i + 1}, Step ${j + 1}`;
            // if (arr[j] > arr[j + 1]) {
            //     console.log(arr[j], ">", arr[j + 1], "swapping");
            //     [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            //     await swap(j);
            // } else {
            //     console.log(arr[j], "<", arr[j + 1], "nothing");
            //     await sleep(ant);
            // }
            await swap(i, j);
        }
        inners[j].style.backgroundColor = "lightgreen";

        await sleep(1);
        if (!als) {
            alert(
                "green colored elements have occupied thier correct position!"
            );
            als = true;
        }
    }
    inners[0].style.backgroundColor = "lightgreen";
    info.innerHTML = "List is now sorted!!"
}

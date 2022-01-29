const loadButton = document.getElementById("load");
const sortButton = document.getElementById("sort");
const sortArea = document.getElementById("area");

const arr = [43, 31, 13, 9, 6, 3];

let maxLength = 1;
let inners = outers = []

loadButton.onclick = () => {
    arr.forEach((num) => {
        let numLength = num.toString().length;
        if (numLength > maxLength) maxLength = numLength;

        let out = classDiv('out')
        let el = classDiv('el')
        el.innerText = num;
        out.appendChild(el);
        sortArea.appendChild(out);
        inners.push(el)
        outers.push(out)
    });
    document.documentElement.style.setProperty("--nw", maxLength+ "ch");
    loadButton.disabled = true;
};

function swap(i,j) {
    m1 = classDiv('move-up')
    m2 = classDiv('move-down')

}

sortButton.onclick = () => {
    sortButton.disabled = true;
};


function classDiv(...cl) {
    const div = document.createElement('div')
    div.classList.add(...cl)
    return div
}
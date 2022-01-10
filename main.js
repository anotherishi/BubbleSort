const loadButton = document.getElementById("load");
const sortButton = document.getElementById("sort");
const sortArea = document.getElementById("area");

function bsp(array) {
    n = array.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
}

let arr = [43, 31, 14, 9, 6, 3];

function load() {
    arr.forEach((el) => {
        let out1 = document.createElement("div");
        out1.classList.add("outer");

        let cd = document.createElement("div");
        cd.setAttribute("hidden", "");
        cd.classList.add("caret");
        cd.classList.add("caret-down");

        let out2 = document.createElement("div");
        out2.classList.add("outer2");

        let e = document.createElement("div");
        e.classList.add("el");
        e.innerText = el;
        out2.appendChild(e);

        let cu = document.createElement("div");
        cu.setAttribute("hidden", "");
        cu.classList.add("caret");
        cu.classList.add("caret-up");

        out1.appendChild(cd);
        out1.appendChild(out2);
        out1.appendChild(cu);
        sortArea.appendChild(out1);
    });
}

function createmov(par) {
    let mov = document.createElement("div");
    mov.classList.add("el");
    mov.classList.add("mover");
    let el = par.firstElementChild;
    el.setAttribute("hidden", "");
    mov.innerText = el.innerText;
    par.appendChild(mov);
    return [el, mov];
}

function swap2(a, b) {
    m = createmov(f[a]);
    n = createmov(f[b]);

    m2 = m[1];
    n2 = n[1];
    m2.style.animation = "swap-up 2s ease-in-out forwards";
    n2.style.animation = "swap-down 2s ease-in-out forwards";

    m1 = m[0];
    n1 = n[0];

    // m1.parentElement.previousSibling.removeAttribute("hidden");
    // m1.parentElement.nextSibling.removeAttribute("hidden");
    // n1.parentElement.previousSibling.removeAttribute("hidden");
    // n1.parentElement.nextSibling.removeAttribute("hidden");


    setTimeout(() => {
        m2.remove();
        n2.remove();
        m1.removeAttribute("hidden");
        n1.removeAttribute("hidden");

        // m1.parentElement.previousSibling.setAttribute("hidden", "");
        // m1.parentElement.nextSibling.setAttribute("hidden", "");
        // n1.parentElement.previousSibling.setAttribute("hidden", "");
        // n1.parentElement.nextSibling.setAttribute("hidden", "");


        [m1.innerText, n1.innerText] = [n1.innerText, m1.innerText];
    }, 2050);
}

loadButton.onclick = () => {
    load();
    f = [];
    Array.from(sortArea.children).forEach((r) => {
        f.push(r.children[1]);
    });

    sortButton.onclick = () => {
        // swap2(3, 4);
        bs2(arr);
    };
};

p = console.log;

function bs2(array) {
    a = Array.from(sortArea.children);
    n = array.length;
    var et = 0;
    t = 0;

    for (let i = 0; i < a.length; i++) {
        // setTimeout(() => {
        for (let j = 0; j < n - i - 1; j++) {
            setTimeout(() => {
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    swap2(j, j + 1);
                }
            }, (et += 2300));
        }
        // }, (t += 2300 * (n - i) *i));
    }
}

//  function bs2(array) {
//     a = Array.from(sortArea.children);
//     n = array.length;
//     et = 0;
//     t = 0;
//     for (let i = 0; i < n; i++) {
//         // setTimeout(() => {
//             p("bubble", i);
//             for (let j = 0; j < n - i - 1; j++) {
//                 // setTimeout(() => {
//                     if (array[j] > array[j + 1]) {
//                         [array[j], array[j + 1]] = [array[j + 1], array[j]];
//                         swap2(j, j + 1);
//                     }
//                 // }, (2300*j));
//             }
//         // },  2300 *(n-i-1)*(n-i));
//     }
// }

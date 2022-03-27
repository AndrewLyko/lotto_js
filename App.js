// HTML Creation
const createTag = ({tagName = 'div', tagAttrs, tagText, tagID, tagEvt, tagClass} = {}) => {
    const node = document.createElement(tagName);

    if (tagAttrs !== undefined) {
        tagAttrs.forEach(({name, value}) => {
            node.setAttribute(name, value)
        });
    }

    if (tagClass !== undefined) {
        tagClass.forEach((name) => {
            node.classList.add(name);
        })
    }

    if (tagText !== undefined) {
        const nodeText = document.createTextNode(tagText)
        node.appendChild(nodeText)
    }

    if (tagID !== undefined) {
        node.id = tagID;
    }

    if (tagEvt !== undefined) {
        tagEvt.forEach(({type, cb}) => {
            node.addEventListener(type, cb);
        })
    }

    return node

}
// --------------------
// Btn service
const handleSave = (event, inputRef, h2Ref, h3Ref) => {
    if (inputRef.value === '') {
        return h2Ref.innerText = 'Input correct value!';
    } else {
        const data = parseInt(inputRef.value)
        switch (true) {
            case (data < 1):
                h2Ref.innerText = 'Type digit > 1!';
                inputRef.value = ''
                break;
            case (data > 50):
                h2Ref.innerText = 'Type digit < 50!';
                inputRef.value = ''
                break;
            case (loadFromLocalStorage().includes(data)):
                h2Ref.innerText = 'Digit was already used!';
                inputRef.value = ''
                break;
            case (loadFromLocalStorage().length < 6):
                saveToLocalStorage(data, h2Ref);
                inputRef.value = ''
                h2Ref.innerText = `Your digits: ${loadFromLocalStorage()}`
                digitsLeft()
                break;
        }

    }
};

const handleCheck = (event, h2Ref) => {
    if (loadFromLocalStorage().length < 6) {
        h2Ref.innerText = 'Type your number'
    } else {
        const userDigit = [...loadFromLocalStorage()];
        const winDigits = getShuffledDigits();
        const result = winDigits.filter((digit) => userDigit.indexOf(digit) >= 0)
        h2Ref.innerText = `You hits ${result.length}, Win numbers : ${result}`
        deleteFromLocalStorage()
    }
}
// --------------------
// Labels creation
const labelRef = createTag({
    tagName: 'label',
    tagAttrs: [{
        name: 'for',
        value: 'number'
    }
    ],
    tagText: 'Enter the number between 1-49 '
})

const h3Ref = createTag({
    tagName: 'h3',
    tagID: 'leftNumber'
})

const inputRef = createTag({
    tagName: 'input',
    tagAttrs: [
        {name: 'type', value: 'text'},
        {name: 'name', value: 'userDigit'}],
    tagID: 'number'
})

const h2Ref = createTag({
    tagName: 'h2',
    tagID: 'typedNumber'
})

const btnSaveRef = createTag({
    tagName: 'button',
    tagText: 'Save',
    tagEvt: [
        {
            type: 'click',
            cb: (evt) => {
                handleSave(evt, inputRef, h2Ref)
            }
        }
    ]
})

const btnCheckRef = createTag({
    tagName: 'button',
    tagText: 'Check Result',
    tagEvt: [
        {
            type: 'click',
            cb: (evt) => {
                handleCheck(evt, h2Ref)
            }
        }
    ]
})
// --------------------

// Calculation
function getRandomIntInclusive(min = 1, max = 49) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getShuffledDigits() {
    let winDigit = []

    while (winDigit.length < 6) {
        winDigit.push(getRandomIntInclusive())
        winDigit = [...new Set(winDigit)]
    }
    return winDigit
}

function digitsLeft() {
    h3Ref.innerText = ` You type: ${loadFromLocalStorage().length} of 6 digts.`
}

// --------------------
// Local storage
const loadFromLocalStorage = () => {
    const data = localStorage.getItem('digits');
    if (data !== null) {
        return JSON.parse(data);
    }
    return []
}

const saveToLocalStorage = (data) => {
    localStorage
        .setItem('digits', JSON.stringify([...loadFromLocalStorage(), parseInt(data)].filter(Number)))
}

const deleteFromLocalStorage = () => {
    return localStorage.removeItem('digits')
}
// --------------------

document.body.appendChild(labelRef)
document.body.appendChild(inputRef)
document.body.appendChild(btnSaveRef)
document.body.appendChild(h3Ref)
document.body.appendChild(btnCheckRef)
document.body.appendChild(h2Ref)

// --------------------

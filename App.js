const userInput = document.querySelector('input[name="userDigit"]')
const btnSave = document.querySelector('button:first-of-type')
const btnCheck = btnSave.nextElementSibling
const resRef = document.getElementById('typedNumber')


const loadFromLocalStorage = () => {
    const data = localStorage.getItem('digits');
    if (data !== null) {
        return JSON.parse(data);
    }
    return []
}


const saveToLocalStorage = (data) => {
    if (!loadFromLocalStorage().includes(parseInt(data)) && data > 0) {
        localStorage
            .setItem('digits', JSON.stringify([...loadFromLocalStorage(), parseInt(data)].filter(Number)));
    }
    return resRef.innerText = `${data} already used!`
}


btnSave.addEventListener('click', (event) => {
    if (userInput.value === '') {
        return  resRef.innerText = 'Input correct value!'
    } else if (parseInt(userInput.value) > 50){
        return  resRef.innerText = 'Type digit between 1-50!'
    } else if (loadFromLocalStorage().length < 6) {
        saveToLocalStorage(userInput.value);
        userInput.value = ''
        resRef.innerText = loadFromLocalStorage();
    } else {
        resRef.innerText = `${loadFromLocalStorage()} <- Its enough! Check the results!`
    }
})

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


btnCheck.addEventListener('click', (event) => {
    if (loadFromLocalStorage().length < 6) {
        resRef.innerText = 'Type your number'
    } else {
        const userDigit = [...loadFromLocalStorage()];
        const winDigits = getShuffledDigits();
        const result = winDigits.filter((digit) => userDigit.indexOf(digit) >= 0)
        resRef.innerText = `You hits ${result.length}, Win numbers : ${result}`
        localStorage.removeItem('digits')
    }
})

// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

// 2. Create object randomFunc
const randomFunc = {
        upper: getRandomUpper,
        lower: getRandomLower,
        number: getRandomNumber,
        symbol: getRandomSymbol
}

// 3. Generate events listner
generateEl.addEventListener('click', () => {
        // Include length, upper, lower, number and symbol in password
        const length = +lengthEl.value;
        const hasUpper = uppercaseEl.checked;
        const hasLower = lowercaseEl.checked;
        const hasNumber = numbersEl.checked;
        const hasSymbol = symbolsEl.checked;

        resultEl.innerHTML = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
});

// 4. Create generatePassword function
function generatePassword(length, upper, lower, number, symbol) {
        // 1. Init password variable
        // 2. Filter out uncheck types
        // 3. Loop over length and call generator function for each types
        // 4. Add a final psw to the psw var and return all

        let generatedPassword = '';

        const typesCount = upper + lower + number + symbol;

        const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(item => Object.values(item)[0]);

        if (typesCount === 0) {
                return '';
        }
        
        // Create Loop
        for (let i = 0; i < length; i += typesCount) {
                typesArr.forEach(type => {
                        const funcName = Object.keys(type)[0];
                        generatedPassword += randomFunc[funcName]();
                });
        }

        // Return final password
        const finalPassword = generatedPassword.slice(0, length);
        return finalPassword;
}

// 5. Copy the password
clipboard.addEventListener('click', () => {
        /* 
                Create textarea elem
                Check if u dont have psw
                Add textarea to the document
                Select textarea content
                Copy textarea content
                Remove textarea to the document
        */

        const textarea = document.createElement('textarea');
        const password = resultEl.innerHTML;

        if (!password) {
                return;
        }

        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        // Alert
        alert('Password copided !');
});

// 1. Generate function Letter number and symbol
function getRandomUpper() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
        return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
        const symbols = '!@#$%^&*(){}[]=<>/,.';
        return symbols[Math.floor(Math.random() * symbols.length)];
}


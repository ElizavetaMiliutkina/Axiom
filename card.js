window.addEventListener("load", () => {
    const cakeCards = document.querySelectorAll('.cake-card');

    cakeCards.forEach((card, index) => {
        const label = document.createElement('label');
        label.setAttribute('for', `quantity-cake${index + 1}`);
        label.innerHTML = "<b> Pack of</b>";

        const select = document.createElement('select');
        select.setAttribute('id', `quantity-cake${index + 1}`);
        select.setAttribute('name', `quantity-cake${index + 1}`);
        select.onchange = () => updatePrice(index + 1);

        const packs = [2, 4, 6, 8, 10];

        packs.forEach(pack => {
            const option = document.createElement('option');
            option.value = pack;
            option.textContent = pack;
            if (pack === 6) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        // Create elements for package counter
        const counterDiv = document.createElement('div');
        counterDiv.className = 'counter';

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.onclick = () => changeValue(-1, `number${index + 1}`, index + 1);

        // Create elements for cakes counter
        const numberInput = document.createElement('input');
        numberInput.setAttribute('id', `number${index + 1}`);
        numberInput.setAttribute('class', 'cake-count');
        numberInput.setAttribute('type', 'number');
        numberInput.value = 5;
        numberInput.oninput = () => updatePrice(index + 1);

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.onclick = () => changeValue(1, `number${index + 1}`, index + 1);

        // Create element for displaying price
        const priceDiv = document.createElement('div');
        priceDiv.setAttribute('id', `price${index + 1}`);
        priceDiv.className = 'price';
        priceDiv.innerHTML = `<b> $${calculatePrice(6, 5)}</b>`;

        counterDiv.appendChild(minusButton);
        counterDiv.appendChild(numberInput);
        counterDiv.appendChild(plusButton);

        const cakeCounterBlock = card.querySelector('.cake-counter-block');

        const cakeCountLeft = document.createElement('div');
        cakeCountLeft.className = 'cake-count-left';

        const cakePack = document.createElement('div');
        cakePack.className = 'cake-pack';
        cakePack.appendChild(label);
        cakePack.appendChild(select);

        const cakeCounter = document.createElement('div');
        cakeCounter.className = 'cake-counter';
        cakeCounter.appendChild(counterDiv);

        cakeCountLeft.appendChild(cakePack);
        cakeCountLeft.appendChild(cakeCounter);

        cakeCounterBlock.appendChild(cakeCountLeft);
        cakeCounterBlock.appendChild(priceDiv);
    });
});

// Function to change value in input
function changeValue(delta, elementId, index) {
    const input = document.getElementById(elementId);
    const currentValue = parseInt(input.value, 10);
    const newValue = currentValue + delta;
    if (newValue >= 0) {
        input.value = newValue;
        updatePrice(index);
    }
}

// Function to update price
function updatePrice(index) {
    const select = document.getElementById(`quantity-cake${index}`);
    const numberInput = document.getElementById(`number${index}`);
    const priceDiv = document.getElementById(`price${index}`);

    const quantity = parseInt(select.value, 10);
    const number = parseInt(numberInput.value, 10);

    const price = calculatePrice(quantity, number);
    priceDiv.innerHTML = `<b>$${price}</b>`;
}

// Function to calculate price
function calculatePrice(quantity, number) {
    return Math.floor(quantity * 0.5 + number * 25);
}
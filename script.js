let score = 0;
let passiveClicks = 0;

const scoreElement = document.getElementById('score');
const pizzaImage = document.getElementById('pizza');
const storeItems = document.querySelectorAll(".store-item");

function formatScore(score) {
    if (score < 1000) {
        return score;
    } else if (score < 1000000) {
        return `${(score / 1000).toFixed(2)}k`;
    } else {
        return `${(score / 1000000).toFixed(2)}m`;
    }
}

function updateScore() {
    scoreElement.innerText = `${formatScore(score)} пицц(ы)`;
}

function incrementScore(amount) {
    score += amount;
    updateScore();

    pizzaImage.style.transform = 'scale(0.9)';
    setTimeout(() => {
        pizzaImage.style.transform = 'scale(1)';
    }, 100);

    if (event) {
        x = event.clientX - 15;
        y = event.clientY - 15;
    } else {
        const pizzaRect = pizzaImage.getBoundingClientRect();
        x = pizzaRect.left + pizzaRect.width / 2 - 15;
        y = pizzaRect.top + pizzaRect.height / 2 - 15;
    }

    const label = document.createElement('div');
    label.classList.add('label');
    label.textContent = '+'+amount;
    label.style.top = y + 'px';
    label.style.left = x + 'px';
    document.body.appendChild(label);

    setTimeout(() => {
        label.style.transition = 'top 1s, opacity 1s'; // Add transition for top property
        label.style.top = y + 100 + 'px'; // Move the label downward by 50px
        label.style.opacity = '0';

        setTimeout(() => {
            label.remove();
        }, 1000); // Remove the label after 2 seconds
    }, 100); // Delay before fading out the label
}

setInterval(() => {
    if (passiveClicks > 0) {
        incrementScore(passiveClicks);
    };
}, 1000);

storeItems.forEach(function(item) {
    item.querySelector(".buy-item").addEventListener("click", function() {
        const itemPrice = parseInt(item.innerText.match(/(\d+) пицц/));
        if (score >= itemPrice) {
            score -= itemPrice;
            if (item.id === "item1") {
                passiveClicks++;
            } else if (item.id === "item2") {
                // Logic for buying item 2
            } else if (item.id === "item3") {
                // Logic for buying item 3
            }
            updateScore();
        } else {
            alert("Недостаточно пицц для покупки!");
           }
    });
});

function handleClick() {
    incrementScore(1);
}

pizzaImage.addEventListener('click', handleClick);

const buyPassiveClickButton = document.getElementById('buyPassiveClick');
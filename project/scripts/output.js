export function renderOptions(currentType) {
    const optionsArea = document.getElementById("dynamic-options");

    if (currentType === "character") {
        optionsArea.innerHTML = `
            <div class="slider-area">
                <label for="quantity">Amount to Generate:</label>
                <div class="input-row">
                    <input type="range" class="slider" id="quantity"  name="quantity" min="1" max="10" value="1" step="1">
                    <p class="slider-value">1</p>
                </div>
            </div>

            <div class="gender-area">
                <label for="gender-select">Gender:</label>
                <select id="gender-select">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="enby">Non-binary</option>
                    <option value="random">Random</option>
                </select>
            </div>

            <div class="nametypes-area">
                <div>
                    <label for="first-name-check">First Name:</label>
                    <input type="checkbox" id="first-name-check" name="first-name" value="yes" checked>
                </div>
                <div>
                    <label for="middle-name-check">Middle Name:</label>
                    <input type="checkbox" id="middle-name-check" name="middle-name" value="yes">
                </div>
                <div>
                    <label for="last-name-check">Last Name:</label>
                    <input type="checkbox" id="last-name-check" name="last-name" value="yes" checked>
                </div>
            </div>
            <div class="slider-area">
                <label for="locality">Local Name Chance:</label>
                <div class="input-row">
                    <input type="range" class="slider" id="localChance" name="localChance" min="0" max="100" value="50" step="5">
                    <p class="slider-value">50</p>
                    <p>%</p>
                </div>
            </div>
            <div class="generate-area">
                <button class="generate-button" name="generate">Generate!</button>
            </div>
        `;
        
        const sliders = optionsArea.querySelectorAll(".slider");

        sliders.forEach((slider) => {
            slider.addEventListener("input", updateSliderDisplay);
        });
    }
}

function updateSliderDisplay(event) {
    const slider = event.target;
    const display = slider
        .closest(".input-row")
        .querySelector(".slider-value");

    display.textContent = slider.value;
}

const outputRegion = document.querySelector(".output-region");
const nameDisplay = document.querySelector(".name-display");

export function renderCharacterOutput(results) {
    nameDisplay.innerHTML = "";

    results.forEach((character) => {
        const card = document.createElement("div");
        card.classList.add("result-card");
        let g = "";
        switch (character.gender){
            case "male": { g = "♂️"; break }
            case "female": { g = "♀️"; break }
            case "enby": { g = "Θ"; break }
        }

        card.innerHTML = `
            <h3>${character.fullName}</h3>
            <p>${g}</p>
            <p>${character.region.toUpperCase()}</p>

            <button class="extras-button" id="description" name="generate-description">Description</button>
            <button class="extras-button" id="backstory" name="generate-backstory">Backstory</button>
        `;

        nameDisplay.appendChild(card);
    });
}
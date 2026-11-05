// Script for handling current options and page state

const themeBySetting = {
  sol: "theme-scifi",
  redemption: "theme-fantasy",
};
const themeClasses = Object.values(themeBySetting);

let themeName;
const regionsBySetting = {
  sol: ["Random", "Earth", "Luna", "Mars", "Midpoint", "Belt", "Jupiter"],
  redemption: [
    "Random",
    "Auralir",
    "Tirakhana",
    "Dragonlands",
    "Nameless City",
  ],
};

const settingSelect = document.getElementById("setting-select");
const regionSelect = document.getElementById("region-select");

export function updateRegionOptions() {
  const selectedSetting = settingSelect.value;
  const regions = regionsBySetting[selectedSetting];

  // Switch for changing theme based on chosen setting

  regionSelect.innerHTML = "";

  const randomOption = document.createElement("option");
  randomOption.value = "random";
  randomOption.textContent = "Random";
  regionSelect.appendChild(randomOption);

  for (let i = 0; i < regions.length; i++) {
    const option = document.createElement("option");

    option.value = regions[i].toLowerCase().replaceAll(" ", "-");
    option.textContent = regions[i];

    regionSelect.appendChild(option);
  }

  setTheme(themeBySetting[selectedSetting]);
}

// Function to remove all current themes from the body classes and add the selected one
function setTheme(themeName) {
  document.body.classList.remove(...themeClasses);
  document.body.classList.add(themeName);
}

export const appState = {
  currentType: "character",
};
export function getCurrentCharacterOptions() {
  return {
    setting: document.getElementById("setting-select").value,
    region: document.getElementById("region-select").value,
    quantity: Number(document.getElementById("quantity").value),
    gender: document.getElementById("gender-select").value,
    includeFirstName: document.getElementById("first-name-check").checked,
    includeMiddleName: document.getElementById("middle-name-check").checked,
    includeLastName: document.getElementById("last-name-check").checked,
    localChance: Number(document.getElementById("localChance").value),
  };
}

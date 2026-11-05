// Okay, I need to map out the logic of how this site will work

// [ ] On the left will be the input options.
// [✓] The top will have a selector for the world setting you are generating a name for.
// [✓] The second section will be buttons to select if you want to generate a name(s) for a person, place, vehicle, or weapon.
// [✓] Then there will be an optional region selector with options based on the selected world.
// [✓] Then there will be checkboxes for specifics of the type of name generated (particularly for people: gender (m/f/nb) random age if desired, first/middle/last checkboxes, and sliders for each to determine the percentage chance that the name(s) generated are culturally local or universal).
// [✓] Then there will be a selector for the number of names you want to generate.
// [ ] Maybe there will also be a physical description generation option? Perhaps a stage two.
// [ ] TODO LATER PLACES: This functionality will be sparse, at least in the beginning. The idea here is that I can generate a location (building, town, asteroid, etc.) for missions, character origins, resource locations, etc.
// [ ] TODO LATER, VEHICLES: The initial idea here is to be able to generate ship names, though this could be expanded to names for any kind of vehicle.
// [ ] There will be selectors for Origin of the vehicle, type of vehicle (spacecraft/aircraft, satellite, drone, etc.), and optional inputs for size, quality, and manufacturer.
// [ ] There can also be potential vehicle history generation, like possible theft, refurbishment, resale, etc.
// [ ] There can also be an option to Generate Crew, based on ship size, which will generate names for individuals in positions based on the type of vehicle (starfighter: pilot, hauler: captain, navigator, engineer, crew, etc. etc.)
// [ ] TODO LATER, ITEMS: The idea here is to be able to quickly and easily generate loot and their stats. There will need to be options for types and manufacturers and quality and all sorts of shit, but this will definitely need to happen AFTER I have designed items in the game.

// [ ] Output region will have a box that displays the generated name(s), with vertical lines to split first/middle/last names.
// [ ] Some names have a unique origin or meaning (such as many off planet names), and this will be denoted by some sort of icon beside the name. If you click on a name with an icon, there will be a window to the side to give a brief description of the origin/meaning of the name.
// [ ] There will also be a box for physical description of the character.
// [ ] The name display will also be a display for vehicle names, and the description boxes can be repurposed here for vehicle specs and generated crew names.

// [ ] I think I can figure out how to make a generator for personal names. I have NOVA's name generator to reference, it shouldn't be too hard. The one thing I'm wondering is if I want to have name origin/meanings, I may need to change the way the names are stored. It may need to be an object instead of an array. Making the slider to manipulate the percentage chance of Local Name vs Universal Name generation may be tricky. I think I can figure out the math, but the actual slider? Idk.

import {
  updateRegionOptions,
  getCurrentCharacterOptions,
  appState,
} from "./state.js";
import { renderOptions, renderCharacterOutput } from "./output.js";
import { generateCharacter } from "./generators/characterGenerator.js";

const settingSelect = document.getElementById("setting-select");
const typeButtons = document.querySelectorAll(".type-button");

settingSelect.addEventListener("change", updateRegionOptions);
updateRegionOptions();

// Listeners for clicking the different type buttons. Calls renderOptions() from output.js to control what input options get displayed in the left panel. 
typeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appState.currentType = button.dataset.type;

    typeButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");

    renderOptions(appState.currentType);
  });
});

renderOptions("character");

// Section below is the functionality for the generate button. exports to different scripts based on the current selected type (character/place/vehicle/item.)
const dynamicOptions = document.getElementById("dynamic-options");

dynamicOptions.addEventListener("click", (event) => {
  const generateButton = event.target.closest(".generate-button");

  if (!generateButton) {
    return;
  }

  switch (appState.currentType) {
    case "character": {
      const options = getCurrentCharacterOptions();
      const results = generateCharacter(options);

      renderCharacterOutput(results);
      break;
    }

    case "place": {
      console.log("Generate place names later");
      break;
    }

    case "vehicle": {
      console.log("Generate vehicle names later");
      break;
    }

    case "item": {
      console.log("Generate item names later");
      break;
    }

    default: {
      console.log(`Unknown generation type: ${appState.currentType}`);
    }
  }
});

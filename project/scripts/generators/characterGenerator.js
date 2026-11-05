// Script for generating character names
import { namePools } from "../data/names/nameIndex.js";

export function generateCharacter({
  setting,
  region,
  quantity,
  gender,
  includeFirstName,
  includeMiddleName,
  includeLastName,
  localChance,
}) {
  const results = [];

  for (let i = 0; i < quantity; i++) {
    const selectedGender = getGender(gender);
    const selectedRegion = getRegion(setting, region);

    const character = {
      setting,
      region: selectedRegion,
      gender: selectedGender,
      first: null,
      middle: null,
      last: null,
      fullName: "",
    };

    if (includeFirstName) {
      character.first = generateNamePart({
        setting,
        region: selectedRegion,
        gender: selectedGender,
        part: "first",
        localChance,
      });
    }

    // I edited the below code to make middle names pull from the first name pool because I did not have middle names specifically defined. The option still exists in the name sheets so I can use it if I need to.
    if (includeMiddleName) {
      character.middle = generateNamePart({
        setting,
        region: selectedRegion,
        gender: selectedGender,
        part: "first",
        localChance,
      });
    }

    if (includeLastName) {
      character.last = generateNamePart({
        setting,
        region: selectedRegion,
        gender: selectedGender,
        part: "last",
        localChance,
      });
    }

    character.fullName = [
      character.first?.name,
      character.middle?.name,
      character.last?.name,
    ]
      .filter(Boolean)
      .join(" ");

    results.push(character);
  }

  console.log(results);
  return results;
}

// Helper function for controlling where the name part (first/middle/last) is picked based on the setting, region, and gender and whether or not the name rolled local or universal in the shouldPickLocal() function defined further down. 
function generateNamePart({ setting, region, gender, part, localChance }) {
  const shouldPickLocal = shouldUseLocalName(localChance);

  const primarySource = shouldPickLocal ? "local" : "universal";
  const fallbackSource = shouldPickLocal ? "universal" : "local";

  const pickedName =
    pickNameFromSource({
      setting,
      region,
      gender,
      part,
      source: primarySource,
    }) ||
    pickNameFromSource({
      setting,
      region,
      gender,
      part,
      source: fallbackSource,
    });

  if (!pickedName) {
    console.warn(`No ${part} names found for ${setting}/${region}/${gender}`);
    return null;
  }

  return pickedName;
}

// Helper function for actually picking from the name objects in the name sheet chosen by generateNamePart() defined above.
function pickNameFromSource({ setting, region, gender, part, source }) {
  const nameArray = getNameArray({
    setting,
    region,
    gender,
    part,
    source,
  });

  if (!nameArray || nameArray.length === 0) {
    return null;
  }

  const pickedName = pickRandom(nameArray);

  return {
    ...pickedName,
    source,
    part,
  };
}

function getNameArray({ setting, region, gender, part, source }) {
  const settingPools = namePools[setting];

  if (!settingPools) {
    return [];
  }

  const selectedPool =
    source === "local" ? settingPools[region] : settingPools.universal;

  if (!selectedPool) {
    return [];
  }

  if (part === "last") {
    return selectedPool.last;
  }

  return selectedPool[part]?.[gender] || [];
}

function shouldUseLocalName(localChance) {
  return Math.random() * 100 < localChance;
}

function pickRandom(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getRegion(setting, region) {
  if (region !== "random") {
    return region;
  }

  const availableRegions = Object.keys(namePools[setting]).filter(
    (regionName) => {
      return regionName !== "universal";
    },
  );

  return pickRandom(availableRegions);
}

function getGender(gender) {
  if (gender !== "random") {
    return gender;
  }

  const genders = ["male", "female", "enby"];
  return pickRandom(genders);
}

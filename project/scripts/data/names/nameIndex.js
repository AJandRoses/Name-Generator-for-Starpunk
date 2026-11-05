// scripts/data/names/nameIndex.js

import { solUniversalNames } from "./sol/universal.js";
import { earthNames } from "./sol/earth.js";
import { marsNames } from "./sol/mars.js";
import { lunaNames } from "./sol/luna.js";
import { midpointNames } from "./sol/midpoint.js";
import { jupiterNames } from "./sol/jupiter.js";
import { beltNames } from "./sol/belt.js";


import { redemptionUniversalNames } from "./redemption/universal.js";
//import { auralirNames } from "./redemption/auralir.js";
//import { tirakhanaNames } from "./redemption/tirakhana.js";

export const namePools = {
    sol: {
        universal: solUniversalNames,
        earth: earthNames,
        mars: marsNames,
        luna: lunaNames,
        midpoint: midpointNames,
        belt: beltNames,
        jupiter: jupiterNames,
    },

    redemption: {
        universal: redemptionUniversalNames,
        //auralir: auralirNames,
        //tirakhana: tirakhanaNames,
    },
};
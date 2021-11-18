//takes 2 start and final altitude in meters, startTemp in C
function predictTemp(startAltitude, startTemp, finalAltitude) { //taken from 1976 US Standard Atmosphere 
    if (finalAltitude > startAltitude) {
        if (finalAltitude < 11000) { //temp decreases 0.0065 C/m for the first 11000m
            finalTemp = startTemp - (0.0065 * (finalAltitude - startAltitude));
            return finalTemp;
        }else if (finalAltitude < 20000) { //from 11000 - 20000m there is no change
            finalTemp = startTemp - (0.0065 * (11000 - startAltitude));
            return finalTemp;
        }else if (finalAltitude < 32000) { //temp increases 0.001 C/m from 20000 - 32000m
            finalTemp = startTemp - (0.0065 * (11000 - startAltitude));
            finalTemp = finalTemp + (0.001 * (finalAltitude - 20000));
            return finalTemp;
        }else if (finalAltitude < 47000) { //temp increases 0.0028 C/m from 32000 - 47000m
            finalTemp = startTemp - (0.0065 * (11000 - startAltitude));
            finalTemp = finalTemp + (0.001 * 12000);
            finalTemp = finalTemp + (0.0028 * (finalAltitude - 32000))
            return finalTemp;
        }else { //another layer of no temp changes up to 51000m, planes would not exceed this height
            finalTemp = startTemp - (0.0065 * (11000 - startAltitude));
            finalTemp = finalTemp + (0.001 * 12000);
            finalTemp = finalTemp + (0.0028 * 15000);
            return finalTemp;
        }
    }else { 
        return startTemp;
    }
}

function predictHumidity(startAltitude, startHumidity, finalAltitude)
var data
var weaponData

async function setup() {
    try {
        const response = await fetch('data.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        data = await response.json();

    } catch (error) {
        console.error('Could not fetch products:', error);
    }
}
setup();



function getRandomItem() {
    const randomIndex = Math.floor(Math.random() * data.weapons.length);
    const item = data.weapons[randomIndex];
    return item;
}
function compareItems(item1, item2) {
    const compareValues = (val1, val2) => {
        if (val2 > val1) return ">";
        if (val2 < val1) return "<";
        return "=";
    };

    // Helper function for the 'obtained' array logic
    const compareObtainedArrays = (arr1, arr2) => {
        const set1 = new Set(arr1);
        const set2 = new Set(arr2);

        // Rule 2: Check for complete equality
        if (set1.size === set2.size && [...set1].every(val => set2.has(val))) {
            return 2;
        }

        // Rule 1: Check if they share at least one common element
        if ([...set1].some(val => set2.has(val))) {
            return 1;
        }

        // Rule 0: No common elements
        return 0;
    };

    const comparison = {
        "autoswing": item1.autoswing === item2.autoswing,
        "damage": compareValues(parseInt(item1.damage), parseInt(item2.damage)),
        "damageType": item1.damageType === item2.damageType,
        "knockback": compareValues(knockbackMap[item1.knockback], knockbackMap[item2.knockback]),
        "speed": compareValues(speedMap[item1.speed], speedMap[item2.speed]),
        "rarity": compareValues(parseInt(item1.rarity), parseInt(item2.rarity)),
        "obtained": compareObtainedArrays(item1.obtained, item2.obtained),
        "material": item1.material === item2.material
    };

    return comparison;
}
function getItemByPropety(prop,value){return data.weapons.find((item) => item[prop] = value);}
function start(){weaponData = getItemByPropety();}

function guess(name)
{
    var item = getItemByPropety("name",name)

}
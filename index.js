var data;
var weaponID;
var weaponData;

var guessed = []; //IDS

// This array is assumed to be correct
const IDS = [5114, 406, 481, 482, 3859, 3821, 3289, 3281, 3377, 739, 2424, 157, 3368, 3280, 5282, 5284, 3825, 3824, 3826, 162, 1324, 5097, 1801, 723, 1121, 1123, 3870, 4758, 190, 1827, 3211, 1931, 795, 4381, 4270, 1825, 986, 281, 163, 1166, 1313, 964, 2747, 2745, 3823, 426, 186, 2623, 881, 1909, 1782, 3282, 3546, 3930, 3012, 1929, 1325, 2882, 3283, 1226, 1228, 1227, 1229, 1928, 3351, 3014, 434, 537, 435, 483, 3262, 3284, 905, 4818, 4911, 3504, 3508, 3507, 1256, 3209, 518, 3051, 519, 672, 3029, 389, 4680, 274, 3007, 3008, 3543, 3249, 1327, 44, 272, 4607, 744, 4272, 4678, 655, 653, 2796, 1910, 742, 55, 989, 4953, 368, 3349, 3833, 3832, 3834, 2608, 3013, 4281, 4912, 2611, 119, 3819, 3818, 3820, 218, 506, 5012, 930, 95, 5069, 1259, 112, 1264, 3827, 3030, 5129, 3315, 726, 676, 1918, 2270, 3836, 4463, 3516, 3520, 3519, 1336, 1297, 3316, 4347, 758, 550, 4790, 578, 5096, 164, 160, 1295, 3290, 3019, 5294, 2364, 5119, 724, 670, 725, 496, 1306, 2365, 1445, 2880, 99, 4, 6, 1784, 4788, 1314, 4914, 2273, 671, 3291, 2795, 514, 3541, 3492, 3496, 3495, 1178, 4672, 3006, 561, 46, 3830, 3829, 3831, 3570, 3569, 5011, 517, 113, 494, 1266, 3279, 3772, 682, 3269, 533, 3063, 2750, 98, 120, 4679, 155, 756, 96, 390, 436, 484, 3107, 3476, 3542, 788, 273, 4952, 1244, 1947, 2331, 3788, 2535, 4348, 1193, 1194, 1192, 3350, 1513, 1186, 1187, 1185, 2515, 2517, 661, 659, 5117, 3540, 3854, 219, 1156, 2584, 3480, 3484, 3483, 1308, 1122, 760, 3106, 2223, 2330, 1157, 4703, 2366, 3571, 1260, 495, 3285, 1802, 2622, 1930, 1870, 3287, 5065, 2269, 658, 656, 759, 743, 486, 1553, 266, 4269, 741, 1571, 3018, 4760, 923, 921, 4789, 1444, 3052, 3053, 3054, 534, 4764, 3510, 3514, 3513, 3858, 3787, 3258, 3835, 1309, 4913, 1254, 1319, 1946, 3473, 127, 280, 1446, 2551, 5074, 3779, 1296, 1572, 1835, 197, 3065, 3474, 3531, 65, 4923, 4715, 4061, 3352, 1258, 220, 4060, 2332, 679, 2621, 796, 5094, 757, 4144, 5005, 3389, 2888, 3292, 1826, 801, 802, 800, 191, 4062, 3498, 3502, 3501, 1201, 1199, 1200, 3852, 740, 3105, 3210, 4707, 277, 5298, 674, 675, 2624, 3486, 3490, 3489, 946, 683, 1265, 3288, 3317, 4273, 1569, 2188, 1255, 64, 121, 3475, 5382, 5147, 3069, 1155, 165, 5118, 284, 39, 24, 3278, 2749, 2797, 3286, 4956, 1304];

const KNOCKBACK = [
    "No knockback", "Extremely weak", "Very weak", "Weak", "Average",
    "Strong", "Very strong", "Extremely strong", "Insane",
];

const SPEED = [
    "Insanely fast", "Very fast", "Fast", "Average",
    "Slow", "Very slow", "Extremely slow",
];

async function setup() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json();
        start();
    } catch (error) {
        console.error('Could not fetch data:', error);
        // Display an error message to the user on the page
        document.body.innerHTML = '<h1>Error: Could not load game data. Please check the console.</h1>';
    }
}
// Automatically start the setup process
alert("hi")
// setup();

function getRandomItemID() {
    const randomIndex = Math.floor(Math.random() * IDS.length);
    return IDS[randomIndex];
}

function compareItems(correctItem, guessedItem) {
    // Compares guessedItem's value (val1) to correctItem's value (val2)
    const compareValues = (val1, val2) => {
        if (val2 > val1) return ">"; // Correct answer is higher
        if (val2 < val1) return "<"; // Correct answer is lower
        return "="; // They are equal
    };

    const compareObtainedArrays = (arr1, arr2) => {
        const set1 = new Set(arr1);
        const set2 = new Set(arr2);
        
        if (set1.size === set2.size && [...set1].every(val => set2.has(val))) {
            return 2; // Exact match
        }
        if ([...set1].some(val => set2.has(val))) {
            return 1; // Partial match
        }
        return 0; // No match
    };

    const comparison = {
        "autoswing": correctItem.autoswing === guessedItem.autoswing,
        "damage": compareValues(parseInt(guessedItem.damage), parseInt(correctItem.damage)),
        "damageType": correctItem.damageType === guessedItem.damageType,
        "knockback": compareValues(guessedItem.knockback, correctItem.knockback),
        "speed": compareValues(guessedItem.speed, correctItem.speed),
        "rarity": compareValues(parseInt(guessedItem.rarity), parseInt(correctItem.rarity)),
        "obtained": compareObtainedArrays(guessedItem.obtained, correctItem.obtained),
        "material": correctItem.material === guessedItem.material
    };

    return comparison;
}

// Corrected spelling from 'Propety' to 'Property'
function getItemByProperty(prop, value) {
    // Use the comparison operator '===' instead of the assignment operator '='
    return data.weapons.find((item) => item[prop] === value);
}

function start() {
    // Corrected function call from 'getRandomItem' to 'getRandomItemID'
    weaponID = getRandomItemID();
    weaponData = getItemByProperty("id", weaponID);

    // Check if the weapon was found
    if (!weaponData) {
        console.error(`Could not find weapon with ID: ${weaponID}`);
        return; // Stop execution if data is invalid
    }
    
    console.log("Game started. The weapon to guess is:", weaponData.name);
    // You can make an initial guess for testing if you like
    guess("Anchor");
}

function guess(name) {
    const item = getItemByProperty("name", name);

    if (!item) {
        console.error(`Item named "${name}" not found!`);
        document.getElementById("log").innerText = `Error: Item named "${name}" not found!`;
        return;
    }

    const id = item.id;
    if (guessed.includes(id)) {
        console.warn(`You have already guessed "${name}"`);
        return;
    }
    
    guessed.push(id);
    const comped = compareItems(weaponData, item);
    document.getElementById("log").innerText = JSON.stringify(comped, null, 2); // Pretty print JSON

    // Check for a win
    if (id === weaponID) {
        console.log("Congratulations! You guessed correctly!");
        document.getElementById("log").innerText += "\n\nCongratulations! You win!";
    }
}

// Add this to the end of your index.js file
document.addEventListener('DOMContentLoaded', (event) => {
    const guessButton = document.getElementById('guessButton');
    const guessInput = document.getElementById('guessInput');

    guessButton.addEventListener('click', () => {
        alert("clicked")
        const guessName = guessInput.value.trim();
        if (guessName) {
            guess(guessName);
            guessInput.value = ''; // Clear the input box
        }
    });

    // Allow pressing Enter to submit a guess
    guessInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            guessButton.click();
        }
    });
});
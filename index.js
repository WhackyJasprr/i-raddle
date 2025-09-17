var data
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
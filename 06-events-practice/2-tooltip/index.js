class Tooltip {
    initialize() {
        
        const pointerAreas = document.querySelectorAll(`[data-tooltip]:not([data-tooltip=""])`);
        pointerAreas.forEach(area => {

            area.addEventListener('pointerover', (event) => {
                console.log('Pointer moved in');
            }); 

            area.addEventListener('pointerout', (event) => {
                console.log('Pointer moved in');
            }); 

        });

       
    }

    create() {
        
    }

    destroy() {

    }
}

const tooltip = new Tooltip();
Object.freeze(tooltip);

export default tooltip;

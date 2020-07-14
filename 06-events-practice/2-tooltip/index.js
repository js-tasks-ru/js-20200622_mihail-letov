class Tooltip {

    constructor() {
        this.element = this.create();
    }

    initialize() {
        
        const pointerAreas = document.querySelectorAll(`[data-tooltip]:not([data-tooltip=""])`);
        pointerAreas.forEach(area => {

            area.addEventListener('pointerover', (event) => {
                document.body.append(this.element);
            }); 

            area.addEventListener('pointerout', (event) => {
                this.destroy();
            }); 

            area.addEventListener('mousemove', (event) => {
                this.element.style.left = event.screenX + 'px';
                this.element.style.top = event.screenY + 'px';
            });

        });
    
    }

    create() {
        const tooltip = document.createElement("div");
        tooltip.setAttribute("classs", "tooltip");
        return tooltip;
    }

    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}

const tooltip = new Tooltip();
Object.freeze(tooltip);

export default tooltip;

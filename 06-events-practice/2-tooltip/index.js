class Tooltip {

    constructor() {
        
    }

    initialize() {
        
        const pointerAreas = document.querySelectorAll(`[data-tooltip]:not([data-tooltip=""])`);
        pointerAreas.forEach(area => {

            area.addEventListener('pointerover', (event) => {            
                this.render();
                const title = event.target.getAttribute("data-tooltip");
                this.setTitle(title);
            }); 

            area.addEventListener('pointerout', (event) => {
                this.destroy();
            }); 

            area.addEventListener('mousemove', (event) => {
                this.element.style.left = event.clientX + 'px';
                this.element.style.top = event.clientY + 'px';
            });

        });
    
    }

    get element() {
        return  (document.querySelector(".tooltip") || this.create());
    }

    render() {
        document.body.prepend(this.element);
    }

    setTitle(title) {
        this.element.innerHTML = title;
    }

    create() {
        const tooltip = document.createElement("div");
        tooltip.setAttribute("class", "tooltip");
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

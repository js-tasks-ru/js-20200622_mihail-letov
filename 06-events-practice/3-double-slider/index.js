export default class DoubleSlider {

    constructor(options = {}) {
        this.min = options.min || 100;
        this.max = options.max || 200;
        this.formatValue = options.formatValue || (value => { return value });

        this.element = this.createElement();

        window.addEventListener("mousedown", null, options);
    }

    createElement() {
        const wrapper = document.createElement("div")
        wrapper.setAttribute("class", "range-slider");
        wrapper.innerHTML = `<span>${this.formatValue(this.min)}</span>
            <div class="range-slider__inner">
                <span class="range-slider__progress"></span>
                <span class="range-slider__thumb-left"></span>
                <span class="range-slider__thumb-right"></span>
            </div>
            <span>${this.formatValue(this.max)}</span>`;
        return wrapper;
    }

}

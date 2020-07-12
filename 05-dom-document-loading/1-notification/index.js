export default class NotificationMessage {

    constructor(message = "", options = {}) {
        this.message = message;
        this.type = options.type || "success";
        this.duration = options.duration || 2000;

        this.clearAll();
        this.element = this.createElement();
    }

    createElement() {
        var wrapper = document.createElement(`div`);
        wrapper.setAttribute(`class`, `notification`);
        wrapper.setAttribute(`style`, `--value:${this.duration/1000}s`);
        if (this.type) {
            wrapper.classList.add(this.type);
        }
        wrapper.innerHTML = `<div class="timer"></div>
                            <div class="inner-wrapper">
                            <div class="notification-header">${this.type}</div>
                            <div class="notification-body">
                                ${this.message}
                            </div>`;
        return wrapper;
    }

    show(target) {
        target = target || document.body;
        target.appendChild(this.element);
        setTimeout(() => {
            this.remove();
        }, this.duration);
    }

    clearAll() {      
        const notification = document.querySelector(".notification");  
        if (notification) {
            notification.remove();
        }
    }

    remove() {
        if (this.element) {
            this.element.remove();
        }
    }

    destroy() {
        this.clearAll();
    }
}

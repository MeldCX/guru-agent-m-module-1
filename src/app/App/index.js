import home from './home.html';
import app from './app.html';
import cancelling from './cancelling.html';

const PAGES = {
    home,
    app,
    cancelling
};

export default class App {
    constructor(agent) {
        window.app = this;
        this.agent = agent;
        this.app = document.querySelector('#app');
        this.idle = 20 // Cannot be less than 15
        this.init();
        this.page = 'home';
        this.time = false; // Time for countdown in cancel screen
    }

    async init() {
        await this.render();
    }

    async setupIdle() {
        const idle = 15;
        await this.agent.Idle.setIdlePeriod(idle);
        this.agent.Idle.onIdle(this.showModal.bind(this), {once: true});
    }

    set page(v) {
        this._page = v;
        this.render();
    }
    get page() {
        return this._page;
    }

    renderPage(page = this.page) {
        const el = document.createElement('template');
        el.innerHTML = PAGES[page];
        // Replace {{time}} with time
        if (this.page == 'cancelling' && this.time) {
            el.innerHTML = el.innerHTML.replace('{{time}}', `${this.time}`)
        }
        if (!el.innerHTML) throw new Error('Invalid route');

        return document.importNode(el.content, true).firstChild;
        this.updated();
    }

    async render() {
        this.app.innerHTML = '';
        this.app.appendChild(this.renderPage());
        this.onUpdate();
    }


    showModal() {
        this.page = 'cancelling';
    }

    reset() {
        this.page = 'home';
        this.clearTick();
    }

    clearTick() {
        if (this.countdown) {
            window.clearInterval(this.countdown);
            delete this.countdown;
        }
    }


    onUpdate() {
        switch (this.page) {
            case 'home':
                this.app.querySelector('button').onclick = () => {
                    this.page = 'app';
                }
                this.clearTick();
                break;
            case 'app':
                this.setupIdle();
                this.clearTick();

                break;
            case 'cancelling':
                if (!this.countdown) {
                    this.time = 20;
                    this.tick();
                    this.render();
                }
                this.app.querySelector('#btn-resume').onclick = () => {
                    this.page = 'app';
                }
                this.app.querySelector('#btn-cancel').onclick = () => {
                    this.page = 'home';
                }
        }
    }

    tick() {
        this.countdown = setInterval(() => {
            this.time -= 1;
            if (!this.time) this.reset();
            this.render();
        }, 1000);
    }
}

import "styles/app";
import Agent from "@meldcx/agent"
import App from './App';


const init = async() => {
    const agent = new Agent();
    // Wait for the agent initialisation
    await agent.onReadyAsync();
    const app = new App(agent);
}


window.onload = () => init();

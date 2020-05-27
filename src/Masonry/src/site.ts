import { addScrollWheelBehavior } from "./scripts/scroller";

const imagesBox = document.querySelector<HTMLElement>(".images");

if (imagesBox !== null) {
    addScrollWheelBehavior(imagesBox);
}


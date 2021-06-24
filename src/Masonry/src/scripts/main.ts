import { addScrollWheelBehavior } from "./scroller";

const imagesBox = document.querySelector<HTMLElement>(".images");

if (imagesBox !== null) {
    addScrollWheelBehavior(imagesBox);
}


export const addScrollWheelBehavior = (element: HTMLElement) => {
    element.addEventListener("wheel", coolWheelFunction, { passive: true });
};

const coolWheelFunction = (event: WheelEvent) => {
    console.log(
        "X: " + event.deltaX + " Y: " + event.deltaY + " Z: " + event.deltaZ
    );

    if (event.type !== "wheel") {
        return;
    }

    if (event.altKey || event.shiftKey || event.ctrlKey) {
        return;
    }

    if (event.deltaY !== 0) {
        let newEvent = new WheelEvent("wheel", {
            shiftKey: true,
            clientX: event.clientX,
            clientY: event.clientY,
            deltaX: event.deltaY,
            deltaY: event.deltaY,
            deltaZ: event.deltaY,
            screenX: event.screenX,
            screenY: event.screenY,
            deltaMode: event.deltaMode,
            bubbles: false,
            cancelable: true,
        });

        let output = event.target?.dispatchEvent(newEvent);
        console.log(output);
        console.log(newEvent);
    } else {
        console.log("blubb");
    }
};

interface SafariTouchEvent extends TouchEvent {
    scale: number;
}

const isSafariTouchEvent = (e: TouchEvent): e is SafariTouchEvent => "scale" in e; 

interface WebKitStyle extends CSSStyleDeclaration {
    WebkitTransform: string;
}

function pinchZoom(imageElement: HTMLElement): void {
    let imageElementScale = 1;

    let start = {
        x: 0,
        y: 0,
        distance: 0
    };

    // Calculate distance between two fingers
    const distance = (event: TouchEvent) => {
        return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
    };

    imageElement.addEventListener('touchstart', (event: Event) => {
        let e = event as TouchEvent;
        if (e.touches.length === 2) {
            event.preventDefault(); // Prevent page scroll

            // Calculate where the fingers have started on the X and Y axis
            start.x = (e.touches[0].pageX + e.touches[1].pageX) / 2;
            start.y = (e.touches[0].pageY + e.touches[1].pageY) / 2;
            start.distance = distance(e);
            
            const articleElement = imageElement.closest('article');
            if (articleElement) {
                articleElement.classList.add('zooming');
            }
        }
    });

    imageElement.addEventListener('touchmove', (event: TouchEvent) => {
        if (event.touches.length === 2) {
            event.preventDefault(); // Prevent page scroll
            
            // Safari provides event.scale as two fingers move on the screen
            // For other browsers just calculate the scale manually
            const scale = isSafariTouchEvent(event) ?
                  event.scale : distance(event) / start.distance;

            imageElementScale = Math.min(Math.max(1, scale), 4);

            // Calculate how much the fingers have moved on the X and Y axis
            const [touch1, touch2] = event.touches;
            const deltaX = (((touch1.pageX + touch2.pageX) / 2) - start.x) * 2; // x2 for accelarated movement
            const deltaY = (((touch1.pageY + touch2.pageY) / 2) - start.y) * 2; // x2 for accelarated movement

            // Transform the image to make it grow and move with fingers
            imageElement.style.setProperty('--zoom-x', `${deltaX}px`);
            imageElement.style.setProperty('--zoom-y', `${deltaY}px`);
            imageElement.style.setProperty('--zoom-scale', `${imageElementScale}`);
        }
    });

    imageElement.addEventListener('touchend', (event) => {
        // Reset image to it's original format
        imageElement.removeAttribute('style');

        const articleElement = imageElement.closest('article');
        if (articleElement) {
            articleElement.classList.remove('zooming');
        }
    });
}

document.querySelectorAll("#content article img").forEach(element => {
    pinchZoom(element as HTMLElement);
});

import ScrollSnap from 'scroll-snap'

if ('scrollSnapType' in document.documentElement.style ||
      'webkitScrollSnapType' in document.documentElement.style ||
      'msScrollSnapType' in document.documentElement.style) {
    console.log('Browser does suport scroll snap.');
}
else {
    noSnapFallback();
}

function noSnapFallback(){
    console.log('Browser does NOT suport scroll snap.');

    const element = document.getElementById('content');
    element.classList.add("no-snap-fallback");
}
const imgsStore = [];

window.imgsStore = imgsStore

function handleImg(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const imgDOM = entry.target;
            const img = new Image();

            function onLoaded() {
                imgDOM.classList.remove('lazy-img');
                imgDOM.setAttribute('src', imgDOM.getAttribute('data-src'));
                observer.disconnect();
            }

            if (img.complete && img.src) {
                console.log('from cache.', img);
                onLoaded();
            }

            img.onload = function() {
                console.log('from network.');
                onLoaded();
                img.onload = null;
            };

            img.src = imgDOM.getAttribute('data-src');
        }
    });
}

function handleDOMChange(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(v => {
                if (v.nodeType === 1) {
                    const imgs = v.querySelectorAll('.lazy-img');

                    addIMGObserver(imgs);
                }
            });
        } else if (mutation.type === 'attributes') {
            // console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
}

function addIMGObserver(imgs) {
    imgs.forEach(img => {
        const observer = new IntersectionObserver(handleImg);

        imgsStore.push(img);
        observer.observe(img);
    });
}

function addObserver() {
    const DOMObserver = new MutationObserver(handleDOMChange);
    
    DOMObserver.observe(document.body, {
        attributes: false,
        childList: true,
        subtree: true
    });
}

addObserver();
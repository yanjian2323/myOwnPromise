exports.nextTick = (function () {
    let callbacks = [];
    let running = false;
    let counter = 1;
    let timeFun;
    function handle () {
        for (let cb of callbacks) {
            cb();
        }
        running = false;
        callbacks = [];
    }
    let mutationObserver = new MutationObserver(handle);
    let node = document.createTextNode(counter);
    mutationObserver.observe(node, {
        characterData: true
    });
    timeFun = function () {
        counter = (counter + 1) % 2;
        node.data = counter;
    }

    return function (fn) {
        callbacks.push(fn);
        if (running) return;
        timeFun();
        running = true;
    };
})();
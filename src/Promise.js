// let p = new Promise((resolve, reject) => {
//     resolve(1);
// })
// let p2 = p.then(() => {
//     return 2;
// }, () => {})

let { nextTick } = require('./nextTick');
const noop = function () {};
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
    this.PromiseState = PENDING;
    this.PromiseResult = undefined;
    this.PromiseFulfillReactions = [];
    this.PromiseRejectReactions = [];
    let resolvingFunctions  = CreateResolvingFunctions(this);
    try{
        executor(resolvingFunctions.resolve, resolvingFunctions.reject);
    } catch (ex) {
        resolvingFunctions.reject(ex);
    }
}
exports.Promise = Promise;

function CreateResolvingFunctions (promise) {
    let _resolve = function (value) {
        _resolve = _reject = noop;
        ResolvePromise(promise, value);
    };
    let _reject = function (value) {
        _resolve = _reject = noop;
        RejectPromise(promise, value);
    };
    return {
        resolve (value) {
            _resolve(value);
        },
        reject (value) {
            _reject (value);
        }
    };
}

function ResolvePromise (promise, value) {
    if (typeof value !== 'object') {
        FulfillPromise(promise, value);
        return;
    }
    let then = value.then;
    if (typeof then === 'function') {
        nextTick(() => {
            let resolvingFunctions  = CreateResolvingFunctions(promise);
            then.call(value, resolvingFunctions.resolve, resolvingFunctions.reject);
        });
    } else {
        FulfillPromise(promise, value);
    }
}

function FulfillPromise (promise, value) {
    promise.PromiseState = FULFILLED;
    promise.PromiseResult = value;
    TriggerPromiseReactions(promise.PromiseFulfillReactions, value);
}

function RejectPromise (promise, reason) {
    promise.PromiseState = REJECTED;
    promise.PromiseResult = reason;
    TriggerPromiseReactions(promise.PromiseRejectReactions, reason);
}

function TriggerPromiseReactions (reactions, argument ) {
    nextTick(() => {
        for (let reaction of reactions) {
            reaction(argument);
        }
    });
}

function NewPromiseCapability () {
    let promiseCapability = {};
    promiseCapability.promise = new Promise((resolve, reject) => {
        promiseCapability.resolve =  resolve;
        promiseCapability.reject =  reject;
    });

    return promiseCapability;
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    let promiseCapability = new NewPromiseCapability();
    let fulfillReactions = this.PromiseFulfillReactions;
    let rejectReactions = this.PromiseRejectReactions;
    if (typeof onFulfilled !== 'function') {
        onFulfilled = () => {
            promiseCapability.resolve(this.PromiseResult);
        }
    }
    if (typeof onRejected !== 'function') {
        onRejected = () => {
            promiseCapability.reject(this.PromiseResult);
        }
    }
    if (this.PromiseState === PENDING) {
        fulfillReactions.push(function (value) {
            settle(promiseCapability.resolve, promiseCapability.reject, onFulfilled, value);
        });
        rejectReactions.push(function (value) {
            settle(promiseCapability.resolve, promiseCapability.reject, onRejected, value);
        });
    } else if (this.PromiseState === FULFILLED) {
        nextTick(() => {
            settle(promiseCapability.resolve, promiseCapability.reject, onFulfilled, this.PromiseResult);
        });
    } else {
        nextTick(() => {
            settle(promiseCapability.resolve, promiseCapability.reject, onRejected, this.PromiseResult);
        });
    }
    


    return promiseCapability.promise;
};

function settle (resolve, reject, onFulfilled, value) {
    let ret ;
    try{
        ret = onFulfilled(value);
    } catch (ex) {
        reject(ex);
    }
    
    resolve(ret);
}
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
};

Promise.resolve = function (argument) {
    if (argument && argument.constructor === this) {
        return argument;
    }
    let promiseCapability = NewPromiseCapability();
    promiseCapability.resolve(argument);

    return promiseCapability.promise;
};
Promise.reject = function (argument) {
    if (argument && argument.constructor === this) {
        return argument;
    }
    let promiseCapability = NewPromiseCapability();
    promiseCapability.reject(argument);

    return promiseCapability.promise;
};
Promise.all = function (arr) {
    let len = arr.length;
    let count = 0;
    let values = [];
    let promiseCapability = NewPromiseCapability();
    arr.forEach((item, i) => {
        Promise.resolve(item).then((ret) => {
            count++;
            values[i] = ret;
            if (count === len) {
                promiseCapability.resolve(values);
            }
        },(err) => {
            promiseCapability.reject(err);
        });
    });

    return promiseCapability.promise;
};
// Promise.race = function (arr) {

// };




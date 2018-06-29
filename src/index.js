let { Promise } = require('./Promise');

// new Promise((resolve, reject) => {
//     resolve(1);
// }).then((arg) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(2);
//         }, 2000);
//     });
// })
// .then((arg) => {
//     console.log(arg);
// });

// new Promise((resolve, reject) => {
//     resolve(1);
// })
// .then(2)
// .then((arg) => {
//     console.log(arg);
// });

setTimeout(() => {
    console.log(1)
  }, 0)
new Promise((resolve, reject) => {
    console.log(2)
    for (let i = 0; i < 10000; i++) {
        i === 9999 && resolve()
    }
    console.log(3)
 })
.then(() => {
    console.log(4)
})
console.log(5)
// let p1 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve(1);
//     }, 1000);
// });

// let p2 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve(2);
//     }, 2000);
// });
// Promise.all([p1,p2]).then((arr) => {
//     console.log(arr);
// }, () => {

// });
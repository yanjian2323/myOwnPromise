// new Promise((resolve, reject) => {
//     resolve(1);
//     resolve(2);
// })
// .then((arg) => {
//     console.log(arg);
// });

// let p = new Promise((resolve, reject) => {
//     resolve(1);
// });
// setTimeout(() => {
//     p.then((arg) => {
//         console.log(arg);
//     });
// });


// new Promise((resolve, reject) => {
//     resolve(1);
// })
// .then(2)
// .then((arg) => {
//     console.log(arg);
// });

// new Promise((resolve, reject) => {
//     reject('error');
// })
// .catch((err) => {
//     console.log(err);
// })
// .then((arg) => {
//     console.log(arg);
// });


// new Promise((resolve, reject) => {
//     resolve(1);
// })
// .then(() => {
//     return new Error('error');
// })
// .then((err) => {
//     console.log(err);
// })
// .catch((err) => {
//     console.log(err);
// });


// new Promise((resolve, reject) => {
//     resolve(1);
// })
// .then(() => {
//     throw new Error();
// })
// .then((err) => {
//     console.log(err);
// })
// .catch((err) => {
//     console.log(err);
// });


// setTimeout(() => {
//     console.log(1)
//   }, 0)
// new Promise((resolve, reject) => {
//     console.log(2)
//     for (let i = 0; i < 10000; i++) {
//         i === 9999 && resolve()
//     }
//     console.log(3)
//  })
// .then(() => {
//     console.log(4)
// })
// console.log(5)
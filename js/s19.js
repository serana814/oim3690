// const add = (a,b) => a + b;

// let sum = add(3, 4);
// console.log(sum);
// console.log(typeof getGrade)
// console.log(typeof add)

const fruits = ['Apple', 'Banana', 'Orange'];

// Change an item
fruits[1] = 'Mango';
console.log(fruits); // ['Apple', 'Mango', 'Orange']

// Add to the end
fruits.push('Kiwi');
console.log(fruits); // ['Apple', 'Mango', 'Orange', 'Kiwi']

// Add to the beginning
fruits.unshift('Cherry');
console.log(fruits); // ['Cherry', 'Apple', 'Mango', 'Orange', 'Kiwi']
const array=['apple','oranges','','mango','','lemon'];

const newarr= array.map(fruit  =>{
  if(fruit==='')
  return 'empty string';
  else
  return fruit;
}) ;
console.log(newarr);
console.log(array);
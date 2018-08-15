class Person {
  constructor(name){
    this.name = name;
  }
  say(){
    console.log("我会说")
  }
}
let person = new Person("张三");
console.log(person[name])
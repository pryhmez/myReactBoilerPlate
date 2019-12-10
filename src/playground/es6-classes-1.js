class Person {
    constructor(name = "anonymous", age = 0){
        this.name = name,
        this. age = age
    }

    getGreeting() {
        return `
        Hi, I am ${this.name}`;
    }

    getDescription(){
        return `${this.name} is ${this.age} year(s) old`
    }
}

class Traveller extends Person {
    constructor(name, age, homeLocation) {
        super(name, age),
        this.homeLocation = homeLocation
    }

    getGreeting(){
        let greeting = super.getGreeting();

        if(this.homeLocation){
            return greeting += ` and I'm visiting from ${this.homeLocation}`
        }else{
            return greeting;
        }
    }
}

let newTraveller = new Traveller("isaac edmund", 24, "enugu");
console.log(newTraveller.getGreeting());

let someTraveller = new Traveller("isaac edmund");
console.log(someTraveller.getGreeting());
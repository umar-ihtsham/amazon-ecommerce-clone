class Car{
    #brand;
    #model;
    speed;
    isTrunkopen;

    constructor(car){
        this.#brand=car.brand,
        this.#model=car.model,
        this.speed=0,
        this.isTrunkopen=false
    }

    displayInfo(){
        return `Brand:${this.#brand}  Model :${this.#model}  Speed:${this.speed}`
    }
    go(){
        if (this.isTrunkopen){
            console.log("cannot go bcz trunk is open");
            return
        }else if(this.speed<200){
            this.speed+=5
        }else{
            console.log(`car reached its highest speed limit ${this.speed}`)
        }
    }
    brake(){
        if(this.speed>0){
            this.speed-=5
        }else{
            console.log(`Car is already stopped ${this.speed}`)
        }
    }
    openTrunk(){
        if (this.speed>0){
            console.log("trunk cannot be opened -- car is moving");
            return
        }
        this.isTrunkopen=true;
        return
    }
    closeTrunk(){
        this.isTrunkopen=false;
        return
    }

}

class Racecar extends Car{
    accelration;
    constructor(car){
        super(car),
        this.accelration=car.accelration
    }

        go(){
        if(this.speed<300){
            this.speed+=this.accelration;
        }else{
            console.log(`car reached its highest speed limit ${this.speed}`)
        }
    }
}
const raceCar=new Racecar( {brand:'McLaren',model:'f1', accelration:40})
raceCar.go();
console.log(raceCar.displayInfo())
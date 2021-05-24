class Timer{
    constructor(interval){
        this.value = 0;
        this.interval = interval;
    }

    execute(delta){
        this.value += delta;

        if(this.value > this.interval) {
            this.value = 0;
            return true;
        }
        
        return false;
    }
}


export {Timer}
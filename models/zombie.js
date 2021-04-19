import {FBX} from '../models/FBX.js'

class Zombie extends FBX{
    constructor(){
        super();
        this.forward = 0;
        this.yaw = 0;
        this.side = 0;
    }
}

export {Zombie}
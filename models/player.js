import {FBX} from '../models/FBX.js'

class Player extends FBX{
    constructor()
    {
        super();
        this.forward = 0;
        this.yaw = 0;
        this.side = 0;
    }

    controller01(keys){
        this.initializeValues();

        if (keys["V"]) {
            this.yaw = -5;

		} else if (keys["C"]) {
            this.yaw = 5;
		}
		if (keys["W"]) {
			this.forward = -5;
		} else if (keys["S"]) {
			this.forward = 5;
		}
        if (keys["A"]) {
			this.side = -5;
		} else if (keys["D"]) {
			this.side = 5;
		}

        //C For Shot

    }

    controller02(keys){
        this.initializeValues();

        if (keys["'"]) {
            this.yaw = -5;

		} else if (keys["%"]) {
            this.yaw = 5;
		}
		if (keys["I"]) {
			this.forward = -5;
		} else if (keys["K"]) {
			this.forward = 5;
		}
        if (keys["J"]) {
			this.side = -5;
		} else if (keys["L"]) {
			this.side = 5;
		}

        //\u0011 From Shot

    }

    initializeValues(){
        this.forward = 0
        this.yaw = 0;
        this.side = 0;
    }

}

export {Player}
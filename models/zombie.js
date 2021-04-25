import {FBX} from '../models/FBX.js'
import { Player } from './player.js';
import * as THREE from '../js/libs/threeJS/three.module.js';

class Zombie extends FBX{
    constructor(){
        super();
        this.forward = 0.3;
        this.yaw = 0;
        this.side = 0;
    }

    follow(player, delta){
        var vP = player.object.position;

        this.object.lookAt(vP);
        this.object.translateZ(this.forward * delta);

    }
}

export {Zombie}
import { FBX } from "http://localhost:8888/zOMG/models/FBX.js";
import * as THREE from 'http://localhost:8888/zOMG/js/libs/threeJS/three.module.js';

class Escenario extends FBX{
    constructor(){
        super();
        this.anim = 0;

    }
}

export {Escenario}
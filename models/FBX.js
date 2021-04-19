import {FBXLoader} from '../js/libs/threeJS/FBXLoader.js';
import * as THREE from '../js/libs/threeJS/three.module.js';

class FBX{
    constructor()
    {
        this.object;
        this.mixer;
        this.isLoaded = false;
    }

    /**
     * Reproduce una animacion a traves del mixer.
     * @param {Number} x Indice de la animacion a reproducir.
     */
    playAnimation(x){
        var action = this.mixer.clipAction(this.object.animations[ x ]);
        action.play();
    }
}

export {FBX}
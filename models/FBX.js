import {FBXLoader} from '../js/libs/threeJS/FBXLoader.js';
import * as THREE from '../js/libs/threeJS/three.module.js';

class FBX{
    constructor()
    {
        this.object;
        this.mixer;
        this.isLoaded = false;
        this.BBox;
    }

    /**
     * Reproduce una animacion a traves del mixer.
     * @param {Number} x Indice de la animacion a reproducir.
     */
    playAnimation(x){
        var action = this.mixer.clipAction(this.object.animations[ x ]);
        action.play();
    }

    updateBBox(velz, velx){
        var v = new THREE.Vector3(0,0,0);
        var vel = new THREE.Vector3(velx,0,velz);

        this.object.getWorldDirection(v);
        v.multiply(vel);

        this.BBox.translate(vel);
    }
}

export {FBX}
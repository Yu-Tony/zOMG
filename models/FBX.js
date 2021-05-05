import {FBXLoader} from 'http://localhost:8080/zOMG/js/libs/threeJS/FBXLoader.js';
import * as THREE from 'http://localhost:8080/zOMG/js/libs/threeJS/three.module.js';

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

        for(var i=0; i<this.object.animations.length; i++)
        {
           if(i==x)
           {
            var action = this.mixer.clipAction(this.object.animations[ i ]);
            action.play();
           }       
           else
           {
            var nonaction = this.mixer.clipAction(this.object.animations[ i ]);
            nonaction.stop();
           }    
      
        }
               

       
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
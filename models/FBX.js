import {FBXLoader} from '/zOMG/js/libs/threeJS/FBXLoader.js';
import * as THREE from '/zOMG/js/libs/threeJS/three.module.js';

class FBX{
    constructor()
    {
        this.object;
        this.mixer;
        this.isLoaded = false;
        //this.BBox;
        this.tagsCollision;
        this.objToCollision = [];
        this.collisions = false;
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

    updateBBox(){

        this.object.BBox.setFromObject(this.object);
    }

    noDisponible(){
        this.object.position.y = -5;
    }

    disponible(){
        this.object.position.y = 0;
    }
}

export {FBX}
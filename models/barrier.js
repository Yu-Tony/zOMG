import { FBX } from "/zOMG/models/FBX.js";

class Barrier extends FBX{
    constructor(){
        super();
    }

    main(){
        this.updateBBox();
    }

    initializeValues(scene){
        let barrier = this;
        this.object.life = 100;

        this.object.die = function(){
            scene.remove(this);
            barrier.noDisponible();
        }

        this.object.damage = function(dmg){
            if( this.life < 0 ) this.life = 0;

            if( this.life > 0 ) this.life -= dmg;

            if( this.life == 0 ) {this.die()};
            
            console.log(this.life);
        }
    }
}

export {Barrier}
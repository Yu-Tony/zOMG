import {FBX} from '/zOMG/models/FBX.js'
import { Player } from '/zOMG/models/player.js';
import { Particles } from '/zOMG/models/particles.js';
import { Timer } from "/zOMG/models/timer.js";
import * as THREE from '/zOMG/js/libs/threeJS/three.module.js';

class Zombie extends FBX{
    constructor(){
        super();
        this.forward = 0.0;
        this.yaw = 0;
        this.anim = 0
        this.tagsCollision = ["player", "barrier"];
        this.dmgToPlayer = 1;
        this.dmgToBarrier = 1;
        this.bloodParticles = new Particles(10, 0xFF0000, 0.1, 0.5);
        this.bloodTimer = new Timer(0.03);
    }

    main(players, delta){
        //debugger;
        if(this.mixer) this.mixer.update(delta);

        var mostNearPlayer = this.mostNearPlayer(players);
        this.follow(mostNearPlayer, delta);

        this.collision(
            this.objToCollision,
            delta
        );



        if(this.bloodParticles.playing)
        {
            if( this.bloodTimer.execute(delta) )
            {
                this.bloodParticles.playing = false;
                this.bloodParticles.reset();
                this.object.remove(this.bloodParticles.system);
            }
            else
            {
                this.bloodParticles.explode(delta);
            }
        }
    }

    /*updateBBox(){
        this.object.BBox.setFromCenterAndSize(this.object.position, new THREE.Vector3(0.5,0.5,0.5));
    }*/

    mostNearPlayer(players){
        var distance = [];
        var playerIndex = [];

        for (let i = 0; i < players.length; i++) {
            distance[i] = this.object.position.distanceTo(players[i].object.position);
            playerIndex[i] = distance[i];
        }

        var shorterDis = Math.min(...distance);

        for (let i = 0; i < playerIndex.length; i++) {
            if( playerIndex[i] == shorterDis )
            {
                return players[i];
            }
        }
    }

    follow(player, delta){
        if(player.object.life > 0 ){
            var vP = player.object.position;

            this.object.lookAt(vP);
            this.object.translateZ(this.forward * delta);
    
            this.updateBBox();
        }
        

        //this.collision(player);

        //console.log(this.object.position);
        //console.log(this.BBox.min);

    }

    collision(col, delta){

        for (let i = 0; i < col.length; i++) {
            if( this.object.BBox.intersectsBox(col[i].BBox) ){
                switch (col[i].name) {
                    case "barrier":
                        //console.log("Atacar barrera");
                        this.object.translateZ((-this.forward) * delta);
                        col[i].damage(this.dmgToBarrier);
                        //debugger;
                        break;

                    case "player":
                        //console.log("Atacar jugador");
                        this.object.translateZ((-this.forward) * delta);
                        col[i].damage(this.dmgToPlayer);
                        break;

                    case "zombie":
                    //console.log("Atacar jugador");
                    this.object.translateZ((-this.forward) * delta);
                    break;
                
                    default:
                        break;
                }
                break;
            }
        }
    }

    /**
     * Inicializa los valores en el object3D, se ejecuta despues de cargar el modelo.
     */
    initializeValues(scene){
        let scope = this;
        this.object.life = 100;
        //this.object.blood = new Particles(10, 0xFF0000, 0.2);

        //this.object.add(this.bloodParticles.system);
        this.bloodParticles.system.position.y = 1;

        this.object.die = function(){
            //debugger;
            scope.forward = 0;
            scene.remove(this);
            scope.noDisponible();
            this.alive = false;

            this.dispatchEvent({ type: "die"});

            
        }

        this.object.revive = function(){
            scope.forward = 0.5;
            scene.add(this);
            scope.disponible();
            this.alive = true;
            this.life = 100;
        }

        this.object.damage = function(dmg){
            if( this.life < 0 ) this.life = 0;

            if( this.life > 0 ) this.life -= dmg;

            if( this.life == 0 ) this.die();
            
            scope.bloodParticles.playing = true;
            this.add(scope.bloodParticles.system);
            /*scope.bloodParticles.reset();*/
            //console.log(this.life);
        }
    }

    
}

export {Zombie}
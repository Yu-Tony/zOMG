import {FBX} from '/zOMG/models/FBX.js'
import * as THREE from '/zOMG/js/libs/threeJS/three.module.js';

class Player extends FBX{
    constructor(playerNum)
    {
        super();
        this.playerNum = playerNum;
        this.forward = 0;
        this.yaw = 0;
        this.side = 0;
        this.raycast = new THREE.Raycaster();
        this.anim = 0;
        this.score = 0;
        //this.life = 100;
        this.tagsCollision = ["zombie", "barrier"];
        this.gunDmg = 10;
    }

    main(delta, keys, tarjets){
        if (this.mixer) this.mixer.update(delta);

        if(this.playerNum == 0) this.controller01(keys, tarjets)
        else if(this.playerNum == 1) this.controller02(keys, tarjets)

        this.object.translateZ(this.forward * delta)
        this.object.translateX(this.side * delta);
        this.object.rotation.y += this.yaw * delta;
        this.updateBBox();
        this.playAnimation(this.anim);
        this.detectCollisions(
            this.objToCollision,
            delta
        )
    }

    detectCollisions(col, delta){
        for (let i = 0; i < col.length; i++) {

            if( this.object.BBox.intersectsBox(col[i].BBox) ){
                switch (col[i].name) {
                    case "barrier":
                        console.log("barrera");
                        this.object.translateZ((-this.forward) * delta)
                        this.object.translateX((-this.side) * delta);
                        break;

                    case "zombie":
                        console.log("zombie");
                        this.object.translateZ((-this.forward) * delta)
                        this.object.translateX((-this.side) * delta);
                        break;
                
                    default:
                        break;
                }
                break;
            }
            
        }
    }

    controller01(keys, tarjets){
        this.initializeControllerValues();
        
        if (keys["V"]) {
            this.yaw = -5;
		} else if (keys["C"]) {
            this.yaw = 5;
		}
		if (keys["W"]) {
			this.forward = 5;
            this.anim = 1;
            //this.updateBBox(this.forward * delta, this.side * delta);
		} else if (keys["S"]) {
			this.forward = -5;
            this.anim = 1;
            //this.updateBBox(this.forward * delta, this.side * delta);
		}
        if (keys["A"]) {
			this.side = 5;
            this.anim = 1;
            //this.updateBBox(this.forward * delta, this.side * delta);
		} else if (keys["D"]) {
			this.side = -5;
            this.anim = 1;
            //this.updateBBox(this.forward * delta, this.side * delta);
		}



        if(keys["X"]){
            this.shot(tarjets);
            this.anim = 0;
        }

        if (keys["A"]&& keys["X"])
        {
            this.anim = 2;
        }
        if (keys["W"]&& keys["X"])
        {
            this.anim = 2;
        }
        if (keys["S"]&& keys["X"])
        {
            this.anim = 2;
        }
        if (keys["D"]&& keys["X"])
        {
            this.anim = 2;
        }

        //this.shot(tarjets);
        //C For Shot

        //console.log(this.BBox.min);

    }

    controller02(keys, tarjets){
        this.initializeControllerValues();

        if (keys["'"]) {
            this.yaw = -5;

		} else if (keys["%"]) {
            this.yaw = 5;
		}
		if (keys["I"]) {
            this.forward = 5;
            this.anim = 1;
		} else if (keys["K"]) {
			this.forward = -5;
            this.anim = 1;
		}
        if (keys["J"]) {
			this.side = 5;
            this.anim = 1;
		} else if (keys["L"]) {
			this.side = -5;
            this.anim = 1;
		}


        if(keys["M"]){
            this.shot(tarjets);
            this.anim = 0;
        }

        if (keys["J"]&& keys["M"])
        {
            this.anim = 2;
        }
        if (keys["I"]&& keys["M"])
        {
            this.anim = 2;
        }
        if (keys["K"]&& keys["M"])
        {
            this.anim = 2;
        }
        if (keys["L"]&& keys["M"])
        {
            this.anim = 2;
        }

        //\u0011 From Shot

    }

    initializeControllerValues(){
        this.forward = 0
        this.yaw = 0;
        this.side = 0;
        this.anim = 3;
    }

    initializeValues(scene){
        let scope = this;

        this.score= 50;
        this.object.life = 100;

        this.revive = function(){
            this.disponible();
            this.object.life = 100;
            scene.add(this.object);
        }

        this.object.die = function(){
            scene.remove(this);
            scope.noDisponible();
        }

        this.object.damage = function(dmg){
            if( this.life < 0 ) this.life = 0;

            if( this.life > 0 ) this.life -= dmg;

            if( this.life == 0 ) {this.die()};

            scope.updateLifeUI(this.life);
            
            //console.log(this.life);
        }


    }

    shot(tarjets){
        var dir = new THREE.Vector3(0,0,0);
        this.object.getWorldDirection(dir);

        var ofsetPos = new THREE.Vector3(
            this.object.position.x,
            this.object.position.y + 1,
            this.object.position.z 
            )

        this.raycast.set(
            ofsetPos,
            dir
            );

        //console.log(this.object.dir);
        var colision = this.raycast.intersectObjects(tarjets, true);

        if(colision.length > 0){
            //console.log("zombie shotted");
           // debugger;
            colision[0].object.parent.damage(this.gunDmg);
        }
    }

    showScore()
    {
      
        $("#scoreText").empty();
        $('.pantalla').css('visibility', 'hidden');
        $("#PJ").hide();
        $("#IncludeGameOver").show(); 
        $("#MPause").show(); 
        $("#scoreText").text( this.score);
    }

    updateLifeUI(life)
    {
        let health = document.getElementById("health");
        health.value = life;
    
    }

}

export {Player}
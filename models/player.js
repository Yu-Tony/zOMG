import {FBX} from 'http://localhost:8012/zOMG/models/FBX.js'
import * as THREE from 'http://localhost:8012/zOMG/js/libs/threeJS/three.module.js';

class Player extends FBX{
    constructor()
    {
        super();
        this.forward = 0;
        this.yaw = 0;
        this.side = 0;
        this.raycast = new THREE.Raycaster();
        this.anim = 0;
        this.score = 0;
        this.life = 100;
    }

    controller01(keys, tarjets){
        this.initializeValues();
        
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

    }

    controller02(keys, tarjets){
        this.initializeValues();

        if (keys["'"]) {
            this.yaw = -5;

		} else if (keys["%"]) {
            this.yaw = 5;
		}
		if (keys["I"]) {
			this.forward = -5;
            this.anim = 1;
		} else if (keys["K"]) {
			this.forward = 5;
            this.anim = 1;
		}
        if (keys["J"]) {
			this.side = -5;
            this.anim = 1;
		} else if (keys["L"]) {
			this.side = 5;
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

    initializeValues(){
        this.forward = 0
        this.yaw = 0;
        this.side = 0;
        this.anim = 3;
        this.score= 50;
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
        var colision = this.raycast.intersectObject(tarjets, true);

        if(colision.length > 0){
            console.log("zombie shotted");
        }
    }

    showScore()
    {
      
        $("#scoreText").empty();
        $('.pantalla').css('visibility', 'hidden');
        $("#PJ").hide();
        $("#IncludeGameOver").show(); 
        $("#MPause").show(); 
        $("#scoreText").append("Puntuación: " + this.score);
    }

    lowerHealth()
    {
        let health = document.getElementById("health")
        this.life -=10;
        health.value = this.life;
    
    }

}

export {Player}
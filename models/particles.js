import * as THREE from '/zOMG/js/libs/threeJS/three.module.js';

class Particles{
    constructor(count, color, size, vel){
        this.playing = false;
        this.count = count;
        this.material = new THREE.PointsMaterial({
			color: color,
			size: size
			});
        this.particles = new THREE.SphereGeometry(0.01, 8, 8);
        
        /*let posArray = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            posArray[i] = 0;        
        }

        this.particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));*/

        /*for (var p = 0; p < count; p++) {

            // create a particle with random
            // position values, -250 -> 250
            var pX = 0,//Math.random() * 10 - 5,
                pY = 0,//5,
                pZ = 0,//Math.random() * 10 - 5,
                particle = new THREE.Vector3(pX, pY, pZ);

            particle.velocity = new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            );	

            particle.velocity.multiplyScalar(vel);

            // add it to the geometry
            particles.vertices.push(particle);
        }*/

        this.system = new THREE.Points(
			this.particles,
			this.material);
    }


    reset(){
        this.system.scale.x = 1;
        this.system.scale.y = 1;
        this.system.scale.z = 1;
    }

    explode(delta){

        //this.particles.scale = new THREE.Vector3(1 + delta,1 + delta,1 + delta);
        this.system.scale.x += 1000 * delta;
        this.system.scale.y += 1000 * delta;
        this.system.scale.z += 1000 * delta;
    }
}

export {Particles}
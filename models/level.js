import * as THREE from '/zOMG/js/libs/threeJS/three.module.js';

class Level{
    constructor(number, spawns, zombies, cameraPos){
        this.number = number;
        this.spawns = spawns;
        this.zombies = zombies;
        this.batchs = 1;
        this.totalZ = zombies.length * this.batchs;
        this.lastZombieSpawned = 0;
        this.cameraPos = cameraPos;
        this.zombieKilled = 0;

        

        this.zombieDieEvent = function (){
            this.zombieKilled++;
        }

        for (let i = 0; i < this.zombies.length; i++) {
            this.zombies[i].addEventListener("die", this.zombieDieEvent.bind(this));
        }
    }

    isOver(){
        if( this.zombieKilled == this.totalZ ) return true;
        else return false;
    }

    spawnZombie(){
        if(this.lastZombieSpawned < this.totalZ)
        {
            var index = Math.floor(Math.random() * this.spawns.length);
            
            let toSpawn = this.lastZombieSpawned;
            if(toSpawn > this.zombies.length - 1 ) 
                toSpawn = (this.lastZombieSpawned % this.zombies.length) ;

            if(!this.zombies[ toSpawn ].alive)
            {
                this.zombies[ toSpawn ].position.set( 
                    this.spawns[ index ].x,
                    this.spawns[ index ].y,
                    this.spawns[ index ].z
                );
    
                this.zombies[ toSpawn ].revive();
        
                this.lastZombieSpawned++;
            }
            
        }
    }
}

export {Level}
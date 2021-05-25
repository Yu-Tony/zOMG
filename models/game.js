import { Timer } from "/zOMG/models/timer.js";

class Game{
    constructor(){
        this.actualLevel = 1;
        this.camVel = 0.2;
        this.spawnZTimer = new Timer(2);
    }

    startingLevel(level, camera, delta){

        this.moveCamera(camera, level.cameraPos, delta);

        if(this.spawnZTimer.execute(delta))
        level.spawnZombie();

    }

    moveCamera(camera, cameraPos, delta){
        camera.position.lerp(cameraPos, this.camVel * delta)
        camera.lookAt(0,cameraPos.y - 5, cameraPos.z + 3);
    }
}

export {Game}
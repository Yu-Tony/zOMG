import * as THREE from '/zOMG/js/libs/threeJS/three.module.js';
import { SkeletonUtils } from '/zOMG/js/libs/threeJS/SkeletonUtils.js';
import { Player } from '/zOMG/models/player.js';
import { Level } from '/zOMG/models/level.js';
import { Game } from '/zOMG/models/game.js';
import { Zombie } from '/zOMG/models/zombie.js';
import { Escenario } from '/zOMG/models/escenario.js';
import { Barrier } from '/zOMG/models/barrier.js';
import { OrbitControls } from '../js/libs/threeJS/OrbitControls.js';
import { FBXLoader } from '/zOMG/js/libs/threeJS/FBXLoader.js';
import { compressSync } from './libs/threeJS/fflate.module.min.js';

var scene, renderer, camera;
var loader;
const clock = new THREE.Clock();
var keys = {};
var raycaster;
var mouse;
var grid;
var player01;
var player02;
var players = [];
var zombies = [];
var spawns = [];
var levels = [];
var zombiesClass=[];
var barrier;
var escenario;
var game;
var globalLevel;


var zombiesInLevel = false;
var objectsLoaded = 0;
var numberOfObjects = 0;
var timer = 0;


var vecPlayerMouse;

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

    camera.aspect = (window.innerWidth/1.5) / (window.innerHeight/1.5);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.5);

}

$(document).ready(function () {
    var tamañoDelCanvas = {
        width: window.innerWidth/1.5,
        height: window.innerHeight/1.5
    }
    //Inicializamos el renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(tamañoDelCanvas.width, tamañoDelCanvas.height);
    renderer.setClearColor(new THREE.Color(0.7, 0.7, 1));

    //Inicializamos la camara
    var tarjet = new THREE.Vector3(0,-5,5);
    camera = new THREE.PerspectiveCamera(
        75, //Field Of View.
        tamañoDelCanvas.width / tamañoDelCanvas.height, //Relacion de aspecto.
        0.1, //Near - Que tan cerca debe estar un objeto para ser dibujado.
        1000 //Far - Que tan lejos puede estar un objeto para ser dibujado.
    );
    camera.position.x = 0;
    camera.position.y = 2;
    camera.position.z = -13;
    camera.lookAt(tarjet);

    //Inicializamos la escena
    scene = new THREE.Scene();

    // Load the Orbitcontroller
    /*var controls = new OrbitControls( camera, renderer.domElement ); 
    controls.target.set( 0, 10, 0 );
    controls.update();*/


    //------ILUMINACION------//
    var luzAmbiental = new THREE.AmbientLight(
        new THREE.Color(1, 1, 1),
        0.45 //Intensidad
    );
    luzAmbiental.name = "amb";

    var luzDireccional = new THREE.DirectionalLight(
        new THREE.Color(0.7, 0.5, 0.5),
        0.4 //Intensidad
    );
    luzDireccional.name = "dir";
    luzDireccional.position.set(1, 1, 0);

    var luzDireccional2 = new THREE.DirectionalLight(
        new THREE.Color(0.2, 0.2, 0.4),
        0.3 //Intensidad
    );
    luzDireccional2.name = "dir2";
    luzDireccional2.position.set(-1, 1, -1);

    scene.add(luzAmbiental);
    scene.add(luzDireccional);
    scene.add(luzDireccional2);

    grid = new THREE.GridHelper(50, 10, 0x000000, 0x000000);
    grid.position.y = -1;
    scene.add(grid);

    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();

    //Le indicamos a ThreeJS donde queremos el canvas.
    $("#scene-section").append(renderer.domElement);

    //Eventos del teclado.
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    //Evitar que la pagina haga scroll con la flechas.
    window.addEventListener("keydown", function (e) {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
    //document.addEventListener('mousemove', onDocumentMouseMove,false)

    loader = new FBXLoader()

    game = new Game();

    //----------------- SPAWNS LEVEL 01 -------------------------//
    
    spawns.push(new THREE.Vector3(0,0,20.3));
    spawns.push(new THREE.Vector3(-2.5,0,8.3));
    spawns.push(new THREE.Vector3(2.5,0,13.3));

    //----------------- ZOMBIES -------------------------//
    for (let i = 0; i < 5; i++) {
        numberOfObjects++;
        zombiesClass.push (new Zombie());
        load('/zOMG/Assets/Zombie/zombie.fbx', zombiesClass[i], zombiesClass[i].anim, () => {
            zombiesClass[i].object.position.z = 4;
            //zombie.updateBBox(5, 0);
            zombiesClass[i].object.name="zombie";
            zombiesClass[i].initializeValues(scene);
            zombiesClass[i].object.die()
            objectsLoaded++;

        });     
    }
    
    

    numberOfObjects++;
    player01 = new Player(0);
    numberOfObjects++;
    player02 = new Player(1);
    /* load('../Assets/Player/player.fbx', player01, null, (object)=> {

        var clone = object.clone();
        player02.object = clone;
        getMixer(player02);
        player02.isLoaded = true;
        scene.add(player02.object);
    });*/

    load('/zOMG/Assets/Player/playerAnim.fbx', player01, player01.anim, ()=>{
        player01.object.life = player01.life;
        player01.object.name = "player";
        player01.object.position.z = -3;
        players.push(player01.object);

        objectsLoaded++;
    });
    load('/zOMG/Assets/Player/playerAnim.fbx', player02, player02.anim, ()=>{
        player02.object.name = "player";
        player02.object.position.z = -5;
        players.push(player02.object);

        objectsLoaded++;
    });

    numberOfObjects++;
    barrier = new Barrier()
    load('/zOMG/Assets/Barrier/barrier.fbx', barrier, null, () => {
        barrier.object.position.z = 0;
        barrier.updateBBox(-5, 0);
        barrier.object.name = "barrier";
        barrier.initializeValues(scene);

        objectsLoaded++;
    })

    numberOfObjects++;
    escenario = new Escenario();
    load('/zOMG/Assets/Escenario/newStage.fbx', escenario, null, () => {
        
        escenario.object.scale.y=.004
        escenario.object.scale.z=.004
        escenario.object.scale.x=.004
        escenario.object.position.z = 40
        escenario.object.position.x = 1

        objectsLoaded++;

    })

    

    render();
})

function render() {

    if (keys["T"]) {
        scene.getObjectByName("amb").intensity += 0.01; 
    } else if (keys["G"]) {
        scene.getObjectByName("amb").intensity -= 0.01;
    }
    if (keys["Y"]) {
        //scene.getObjectByName("dir").intensity += 0.01; 
        scene.getObjectByName("dir2").intensity += 0.01; 
    } else if (keys["H"]) {
        //scene.getObjectByName("dir").intensity -= 0.01;
        scene.getObjectByName("dir2").intensity -= 0.01;
    }

    requestAnimationFrame(render);
    if ($('.pantalla').css('visibility') == 'visible') {
   
        if( objectsLoaded == numberOfObjects ){
            
            if(!zombiesInLevel){
                for (let i = 0; i < 5; i++) {
                    zombies.push(zombiesClass[i].object);
                    //scene.add(zombies[i]);    
                }

                globalLevel = new Level(game.actualLevel ,spawns, zombies, new THREE.Vector3(0,9,-7));
                /*levels.push(level01);

                var level02 = new Level(1,spawns, zombies, new THREE.Vector3(0,9,0));
                levels.push(level02);*/

                /*var level03 = new Level(3,spawns, zombies, new THREE.Vector3(0,9,-7));
                levels.push(level03);*/



                zombiesInLevel = true;
            }
            else
            {
                const delta = clock.getDelta();
                timer += delta;
            
                if(!player01.collisions) objectsToCollisionArray(player01);
                player01.main(
                    delta, 
                    keys, 
                    zombies //Objetivos a disparar con el arma
                );

                if(!player02.collisions) objectsToCollisionArray(player02);
                player02.main(
                    delta, 
                    keys, 
                    zombies //Objetivos a disparar con el arma
                );


                zombiesClass.forEach(zombie => {
                    if( !zombie.collisions ) objectsToCollisionArray(zombie);
                        zombie.main(
                        players, //Jugador a seguir.
                        delta
                    );
                });

                

                barrier.main();

                if(delta < 1){
                    if(!globalLevel.isOver())
                        game.startingLevel(globalLevel, camera, delta);
                    else{
                        game.actualLevel ++;
                        globalLevel = new Level(game.actualLevel ,spawns, zombies, new THREE.Vector3(0,9,0));

                    }
                }
                    

                renderer.render(scene, camera);
            }
            


            

        }   
        
    }

}


function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
}

function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

function keyboardEvents() {

}

function onDocumentMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 - 1;

    raycaster.setFromCamera(mouse.clone(), camera);

    var object = raycaster.intersectObject(zombie.object, true);


    if (object.length > 0) {
        console.log(object[0].point);

        /*vecPlayerMouse = new THREE.Vector3(
            (object[0].point.x - player01.object.position.x),
            (object[0].point.y - player01.object.position.y),
            (object[0].point.z - player01.object.position.z)
            )*/
    }
}



/**
 * Carga un archivo FBX y lo almacena en el objeto myObj. Y carga el mixer.
 * @param {String} path Ruta del archivo FBX
 * @param {*} buffer Objeto derivado de la clase FBX
 * @param {Number} anim Animacion a reproducir después de cargar el objeto, si es null no se reproduce.
 */
function load(path, buffer, anim, initializeObject) {
    loader.load(path, function (object) {

       
        object.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });


       buffer.mixer = new THREE.AnimationMixer(object);
 
        buffer.object = object;
        //buffer.object.vectorFront = new THREE.Vector3(0,0, /*buffer.object.position.z + */1);
        buffer.isLoaded = true;

        buffer.object.BBox = new THREE.Box3();
        buffer.object.BBox.expandByObject(buffer.object);
        //buffer.BBox.applyMatrix4(buffer.object.matrixWorld);

        scene.add(buffer.object);

        if (Number.isInteger(anim)) buffer.playAnimation(anim);

        if (initializeObject) initializeObject(object);

        //objectsLoaded++;
    });
}

function getMixer(object) {
    object.mixer = new THREE.AnimationMixer(object.object);
}

/**
 * 
 * @param {*} object1 
 * @param {*} object2 
 */
function detectCollision(object1, object2) {

    return object1.BBox.intersectsBox(object2.BBox);

}

function objectsToCollisionArray(object){

    scene.children.forEach(child => {
        for (let i = 0; i < object.tagsCollision.length; i++) {
            if(child.name == object.tagsCollision[i]){
                object.objToCollision.push(child)
            }
        }
        
    });

    object.collisions = true;
    
}


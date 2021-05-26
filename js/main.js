import * as THREE from '/zOMG/js/libs/threeJS/three.module.js';
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
var players = [];
var zombies = [];
var spawns;
var zombiesClass=[];
var barrier;
var barriers = [];
var barriersPos;
var escenario;
var game;
var globalLevel;
var camPosPerLevel = [];
var loading;

var indexBarrier = 0;


var zombiesInLevel = false;
var objectsLoaded = 0;
var numberOfObjects = 0;
var timer = 0;

var Iniciar = false;

var vecPlayerMouse;

var HPU=false;
var DPU=false;

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

    camera.aspect = (window.innerWidth/1.5) / (window.innerHeight/1.5);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.5);

}

function loadGame(){
    if ($('.pantalla').css('visibility') == 'visible')
    {
        if(Iniciar == false)
        {
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
    
            
    
            //----------------- POSICION DE LA CAMARA POR NIVEL -------------------------//
            
            camPosPerLevel.push(new THREE.Vector3(0,9,7));
            camPosPerLevel.push(new THREE.Vector3(0,9,42));
            camPosPerLevel.push(new THREE.Vector3(0,9,89));
    
    
            //----------------- SPAWNS LEVEL 01 -------------------------//
            
            spawns = [
                [
                    new THREE.Vector3(0,0,20.3),
                    new THREE.Vector3(-2.5,0,8.3),
                    new THREE.Vector3(2.5,0,13.3)
                ],
                [
                    new THREE.Vector3(4,0,67),
                    new THREE.Vector3(1.5,0,65),
                    new THREE.Vector3(-2.81,0,64)
                ],
                [
                    new THREE.Vector3(3.9,0,119),
                    new THREE.Vector3(1.7,0,116),
                    new THREE.Vector3(-3.4,0,113)
                ]
            ];
    
    
            barriersPos = [
                    new THREE.Vector3(2.8,0,0),
                    new THREE.Vector3(0,0,0),
                    new THREE.Vector3(-2.8,0,0),
                
                    new THREE.Vector3(-0.89,0,50.3),
                    new THREE.Vector3(4.1,0,50.3),
                    new THREE.Vector3(1.5,0,50.3),
    
                    new THREE.Vector3(4.2,0,95.6),
                    new THREE.Vector3(-1.09,0,95.6),
                    new THREE.Vector3(1.5,0,95.6)
            ];
    
            /*spawns.push(new THREE.Vector3(0,0,20.3));
            spawns.push(new THREE.Vector3(-2.5,0,8.3));
            spawns.push(new THREE.Vector3(2.5,0,13.3));*/
    
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
    
                    loading.attr('value', objectsLoaded);
    
                });     
            }
            
            
            //----------------- PLAYERS -------------------------//
            if( $('#scene-section').hasClass('Solo-Mode') ){
                let player = new Player(0);          
                numberOfObjects++;
                load('/zOMG/Assets/Player/playerAnim.fbx', player, player.anim, ()=>{
                    //player.object.life = player.life;
                    player.object.name = "player";
                    player.object.position.z = -3;
                    player.initializeValues(scene);
    
                    players.push(player);
            
                    objectsLoaded++;
    
                    loading.attr('value', objectsLoaded);
                });
    
                game = new Game(1);
            }
            else if( $('#scene-section').hasClass('Multi-Mode') ){
    
                for (let i = 0; i < 2; i++) {
                    let player = new Player(i);          
                    numberOfObjects++;
                    load('/zOMG/Assets/Player/playerAnim.fbx', player, player.anim, ()=>{
                        //player.object.life = player.life;
                        player.object.name = "player";
                        player.object.position.z = -3;
                        player.initializeValues(scene);
                        players.push(player);
                        
                
                        objectsLoaded++;
    
                        loading.attr('value', objectsLoaded);
                    });
                }
    
                game = new Game(2);
            }
    
            numberOfObjects++;
            barriers[0] = new Barrier();
            load('/zOMG/Assets/Barrier/newBarrier.fbx', barriers[0], null, () => {
                barriers[0].object.position.set(
                    barriersPos[0].x,
                    barriersPos[0].y,
                    barriersPos[0].z
                );  
                barriers[0].updateBBox();
                barriers[0].object.name = "barrier";
                barriers[0].initializeValues(scene);
                barriers[0].object.scale.x=.004
                barriers[0].object.scale.z=.004
                barriers[0].object.scale.y=.004
                barriers[0].object.rotation.y = 90 * Math.PI / 180;
    
    
                for (let i = 1; i < 9; i++) {
                    barriers[i] = new Barrier();
                    barriers[i].object = barriers[0].object.clone();
                    barriers[i].object.BBox = new THREE.Box3();
                    barriers[i].object.position.set(
                        barriersPos[i].x,
                        barriersPos[i].y,
                        barriersPos[i].z
                    );  
                    barriers[i].updateBBox();
                    barriers[i].initializeValues(scene);
                    scene.add(barriers[i].object); 
                }
    
    
    
    
                objectsLoaded++;
    
                loading.attr('value', objectsLoaded);
            });
    
            numberOfObjects++;
            escenario = new Escenario();
            load('/zOMG/Assets/Escenario/newStage2.fbx', escenario, null, () => {
                escenario.object.position.x = 1
                escenario.object.position.z = 40
                escenario.object.scale.x=.004
                escenario.object.scale.z=.004
                escenario.object.scale.y=.004
                objectsLoaded++;
    
                loading.attr('value', objectsLoaded);
            });
    
            
            loading.attr('max', numberOfObjects);
    
            Iniciar = true;
        }
        
      
        render();
 
        
    }

}

$(document).ready(function () {

    $('#scene-section').on('visible', loadGame);
    loading = $('#loading');

    $("#HealthPU").click(function()
    {
        HPU=true;
    })

    $("#DamagePU").click(function()
    {
        DPU=true;
    })
    


})

function reviveAllDeath(){
    players.forEach(player =>{
        if(player.object.life == 0){
            player.revive();
            player.object.dispatchEvent({ type: "revive"});
        }
        else{
            player.heal();
        }
    })
}

function removeBarriersOfLevel(level){
    barriers[(level *3)].noDisponible();
    barriers[(level*3) + 1].noDisponible();
    barriers[(level*3) + 2].noDisponible();
}

function render() {

    if (HPU) {
        if(players[0].useScore(700)){
            reviveAllDeath();
        }
        HPU = false;

    } else 
    if (DPU) {
        if(players[0].useScore(200))
        {
            players[0].incGunDmg();
        }

        DPU = false;
            
    }
    if (keys["Y"]) {
        removeBarriersOfLevel(1 - 1 );

    } else if (keys["H"]) {
        

    }

    if (keys["I"]) {
        barriers[indexBarrier].object.position.z += 0.1;
    } else if (keys["K"]) {
        barriers[indexBarrier].object.position.z -= 0.1;
    }

    if (keys["J"]) {
        barriers[indexBarrier].object.position.x += 0.1;
    } else if (keys["L"]) {
        barriers[indexBarrier].object.position.x -= 0.1;
    }

    if (keys["P"]) {
        console.log(barriers[indexBarrier].object.position);
        
    }

    

    requestAnimationFrame(render);
    if ($('.pantalla').css('visibility') == 'visible') {
   
        if( objectsLoaded == numberOfObjects ){
            //console.log(players[0].score);
            loading.hide();
            if(!zombiesInLevel){
                for (let i = 0; i < 5; i++) {
                    zombies.push(zombiesClass[i].object);
                    //scene.add(zombies[i]);    
                }

                globalLevel = new Level(game.actualLevel ,spawns[game.actualLevel - 1 ], zombies, new THREE.Vector3(0,9,-7));
                

                players.forEach(player => {
                    player.object.addEventListener('die', game.playerDieEvent.bind(game));
                    player.object.addEventListener('revive', game.playerReviveEvent.bind(game));
                });

                //players[0].object.add(camera);
                zombiesInLevel = true;
            }
            else
            {
                const delta = clock.getDelta();
                timer += delta;

                players.forEach(player =>{
                    if(!player.collisions) objectsToCollisionArray(player);
                    player.main(
                        delta, 
                        keys, 
                        zombies //Objetivos a disparar con el arma
                    );
                });


                zombiesClass.forEach(zombie => {
                    if( !zombie.collisions ) objectsToCollisionArray(zombie);
                        zombie.main(
                        players, //Jugador a seguir.
                        delta
                    );
                });

                
                barriers.forEach(barrier => {
                    barrier.main();
                });

                if(/*delta < 1*/true){
                    if(!globalLevel.isOver()){
                        if(!game.gameOver()){
                            game.startingLevel(globalLevel, camera, delta);
                        }
                        else{
                            alert("Perdiste");
                        }
                    }
                    else{
                        if( game.actualLevel < 3 ){
                            removeBarriersOfLevel(game.actualLevel - 1)
                            game.actualLevel ++;
                            globalLevel = new Level(game.actualLevel, 
                                spawns[game.actualLevel - 1 ], 
                                zombies, 
                                camPosPerLevel[game.actualLevel - 1]
                            );
                        }
                        else{
                            alert("Ganaste");
                            //Poner score;
                        }

                    }
                }

                if(players[0].object.position.x > 3)
                {
                    players[0].object.position.x = 3;
                }
                if(players[0].object.position.x < -3)
                {
                    players[0].object.position.x = -3;
                }

                renderer.render(scene, camera);
            }
            


            

        }
        else{
            
        } 
        
    }

    console.log(players[0].object.position.z)

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


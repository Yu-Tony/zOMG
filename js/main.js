import * as THREE from 'http://localhost:8080/zOMG/js/libs/threeJS/three.module.js';
import { Player } from 'http://localhost:8080/zOMG/models/player.js';
import { Escenario } from 'http://localhost:8080/zOMG/models/escenario.js';
import { Zombie } from 'http://localhost:8080/zOMG/models/zombie.js';
import { Barrier } from 'http://localhost:8080/zOMG/models/barrier.js';
import { OrbitControls } from '../js/libs/threeJS/OrbitControls.js';
import { FBXLoader } from '../js/libs/threeJS/FBXLoader.js';
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
var zombie;
var barrier;
var escenario;

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
    camera = new THREE.PerspectiveCamera(
        75, //Field Of View.
        tamañoDelCanvas.width / tamañoDelCanvas.height, //Relacion de aspecto.
        0.1, //Near - Que tan cerca debe estar un objeto para ser dibujado.
        1000 //Far - Que tan lejos puede estar un objeto para ser dibujado.
    );
    camera.position.x = 0;
    camera.position.y = 9;
    camera.position.z = -7;
    camera.lookAt(new THREE.Vector3(0, -5, 5));

    //Inicializamos la escena
    scene = new THREE.Scene();

    // Load the Orbitcontroller
    /*var controls = new OrbitControls( camera, renderer.domElement ); 
    controls.target.set( 0, 10, 0 );
    controls.update();*/


    //------ILUMINACION------//
    var luzAmbiental = new THREE.AmbientLight(
        new THREE.Color(1, 1, 1),
        1.0 //Intensidad
    );

    var luzDireccional = new THREE.DirectionalLight(
        new THREE.Color(1, 1, 1),
        0.4 //Intensidad
    );

    luzDireccional.position.set(0, 0, 1);

    scene.add(luzAmbiental);
    scene.add(luzDireccional);

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

    zombie = new Zombie();
    load('http://localhost:8080/zOMG/Assets/Zombie/zombie.fbx', zombie, zombie.anim, () => {
        zombie.object.position.z = 5;
    });

    player01 = new Player();

   player02 = new Player();
    /* load('../Assets/Player/player.fbx', player01, null, (object)=> {

        var clone = object.clone();
        player02.object = clone;
        getMixer(player02);
        player02.isLoaded = true;
        scene.add(player02.object);
    });*/

    load('http://localhost:8080/zOMG/Assets/Player/playerAnim.fbx', player01, player01.anim, null);
    load('http://localhost:8080/zOMG/Assets/Player/playerAnim.fbx', player02, player02.anim, null);

    barrier = new Barrier()
    load('http://localhost:8080/zOMG/Assets/Barrier/barrier.fbx', barrier, null, () => {
        barrier.object.position.z = -5;
        barrier.updateBBox(-5, 0);
    })

    escenario = new Escenario();
    load('http://localhost:8888/zOMG/Assets/Escenario/escenarioConvertido.fbx', escenario, null, () => {
        
        escenario.object.scale.y=.01
        escenario.object.scale.z=.01
        escenario.object.scale.x=.01
    })

    

    render();
})

function render() {

    
    requestAnimationFrame(render);
    if ($('.pantalla').css('visibility') == 'visible') {
   
    
        //player01.object.rotation.y += THREE.Math.degToRad(1);
        const delta = clock.getDelta();

        if (player01.mixer) player01.mixer.update(delta);
        if (player01.isLoaded) {
            player01.controller01(keys, zombie.object);



            player01.object.translateZ(player01.forward * delta)
            player01.object.translateX(player01.side * delta);
            player01.object.rotation.y += player01.yaw * delta;
            player01.updateBBox(player01.forward * delta, player01.side * delta);
            player01.playAnimation(player01.anim);
            //player01.shot(zombie.object);
            /*var vec = new THREE.Vector3(0,0,0);
            player01.object.getWorldDirection(vec);
            console.log(vec);*/

            if (player01.isLoaded && barrier.isLoaded) {
                if (detectCollision(player01, barrier)) {
                    console.log("colision")
                    player01.object.translateZ((-player01.forward) * delta)
                    player01.object.translateX((-player01.side) * delta);
                    player01.updateBBox((-player01.forward) * delta, (-player01.side) * delta);

                    //Prueba de quitar vida al colisionar con la barrera, utiliza funciones de player

                    if(player01.life > 0)
                    {
                        //lowerHealth(): toma la variable life del personaje, la decrementa en 10
                        //Luego pasa el valor a la barra de vida que esta en principal.html
                         player01.lowerHealth();
                    }
                    else
                    {
                        //showScore(): Muestra la ventana de showScore llamada PantallaGameOver.html
                        //toma la variable score del personaje y le hace un append al texto de su score
                        player01.showScore();
                    }
                   
                   
                }
            }


        }


        if (player02.mixer) player02.mixer.update(delta);
        if(player02.isLoaded)
        {
            player02.controller02(keys, zombie.object);
            player02.object.translateZ((-player02.forward) * delta);
            player02.object.translateX((-player02.side) * delta);
            player02.object.rotation.y += player02.yaw * delta;
            player02.playAnimation(player02.anim);
        }

        if(zombie.mixer) zombie.mixer.update(delta);
        if(zombie.isLoaded){
            zombie.follow(player01, delta);
        }
        renderer.render(scene, camera);
        
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

        buffer.BBox = new THREE.Box3();
        buffer.BBox.expandByObject(buffer.object);
        //buffer.BBox.applyMatrix4(buffer.object.matrixWorld);

        scene.add(buffer.object);

        if (Number.isInteger(anim)) buffer.playAnimation(anim);

        if (initializeObject)
            initializeObject(object);
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

    //object1.BBox.applyMatrix4(object1.object.matrixWorld);
    //object1.BBox.translate(object1.object.position);

    //object2.BBox.applyMatrix4(object2.object.matrixWorld);
    //object2.BBox.translate(object2.object.position);


    return object1.BBox.intersectsBox(object2.BBox);

}
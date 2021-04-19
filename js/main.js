import * as THREE from '../js/libs/threeJS/three.module.js';
import {Player} from '../models/player.js';
import {Zombie} from '../models/zombie.js';
import { OrbitControls } from '../js/libs/threeJS/OrbitControls.js';
import {FBXLoader} from '../js/libs/threeJS/FBXLoader.js';

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

var vecPlayerMouse;

$(document).ready( function () {
    var tamañoDelCanvas = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    //Inicializamos el renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(tamañoDelCanvas.width,tamañoDelCanvas.height);
    renderer.setClearColor(new THREE.Color(0.7,0.7,1));

    //Inicializamos la camara
    camera = new THREE.PerspectiveCamera(
        75, //Field Of View.
        tamañoDelCanvas.width/tamañoDelCanvas.height, //Relacion de aspecto.
        0.1, //Near - Que tan cerca debe estar un objeto para ser dibujado.
        1000 //Far - Que tan lejos puede estar un objeto para ser dibujado.
    );
    camera.position.x = 0;
    camera.position.y = 9;
    camera.position.z = 7;
    camera.lookAt(new THREE.Vector3(0,-5,-5));

    //Inicializamos la escena
    scene = new THREE.Scene();

    // Load the Orbitcontroller
    /*var controls = new OrbitControls( camera, renderer.domElement ); 
    controls.target.set( 0, 10, 0 );
    controls.update();*/


    //------ILUMINACION------//
    var luzAmbiental = new THREE.AmbientLight(
        new THREE.Color(1,1,1),
        1.0 //Intensidad
    );

    var luzDireccional = new THREE.DirectionalLight(
        new THREE.Color(1,1,1),
        0.4 //Intensidad
    );

    luzDireccional.position.set(0,0,1);

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
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
    //document.addEventListener('mousemove', onDocumentMouseMove,false)

    loader = new FBXLoader()

    player01 = new Player();
    player02 = new Player();
    /*load('../Assets/Player/player.fbx', player01, null, (object)=> {

        var clone = object.clone();
        player02.object = clone;
        //getMixer(player02);
        player02.isLoaded = true;
        scene.add(player02.object);
    });*/

    load('../Assets/Player/player.fbx', player01, 1, null);
    //load('../Assets/Player/player.fbx', player02, 0, null);

    
    zombie = new Zombie();
    load('../Assets/Zombie/zombie.fbx', zombie, 3, () =>{
        zombie.object.position.x = 5;
    });
    
    render();
} )

function render(){

    requestAnimationFrame(render);

    //player01.object.rotation.y += THREE.Math.degToRad(1);
    const delta = clock.getDelta();

    if(player01.mixer) player01.mixer.update( delta );

    if(player01.isLoaded)
    {
        player01.controller01(keys);
        player01.object.translateZ(player01.forward * delta)
        player01.object.translateX(player01.side * delta);
        player01.object.rotation.y += player01.yaw * delta;
    }

    if(player02.isLoaded)
    {
        player02.controller02(keys);
        player02.object.translateZ(player02.forward * delta);
        player02.object.translateX(player02.side * delta);
        player02.object.rotation.y += player02.yaw * delta;
    }

    if(zombie.mixer) zombie.mixer.update(delta);

    renderer.render(scene, camera);
}


function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
}

function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

function keyboardEvents(){

}

function onDocumentMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 - 1;

    raycaster.setFromCamera(mouse.clone(), camera);

    var object = raycaster.intersectObject(grid)

    if(object.length > 0){
        //console.log(object[0].point);

        vecPlayerMouse = new THREE.Vector3(
            (object[0].point.x - player01.object.position.x),
            (object[0].point.y - player01.object.position.y),
            (object[0].point.z - player01.object.position.z)
            )
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

        object.traverse( function ( child ) {
            if( child.isMesh ){
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );

        buffer.mixer = new THREE.AnimationMixer( object );
        buffer.object = object;
        //buffer.object.vectorFront = new THREE.Vector3(0,0, /*buffer.object.position.z + */1);
        buffer.isLoaded = true;
        scene.add(buffer.object);

        if(Number.isInteger(anim)) buffer.playAnimation(anim);

        if(initializeObject)
        initializeObject(object);
    });
}

function getMixer(object){
    object.mixer = new THREE.AnimationMixer( object.object );
}
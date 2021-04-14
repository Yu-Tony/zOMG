import * as THREE from '../js/libs/threeJS/three.module.js';
import {Player} from '../models/player.js';
import { OrbitControls } from '../js/libs/threeJS/OrbitControls.js';
import {FBXLoader} from '../js/libs/threeJS/FBXLoader.js';

var scene, renderer, camera;
var loader;
const clock = new THREE.Clock();

var player01;

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

    //Inicializamos la escena
    scene = new THREE.Scene();

    // Load the Orbitcontroller
    var controls = new OrbitControls( camera, renderer.domElement ); 
    controls.target.set( 0, 10, 0 );
    controls.update();

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

    //Le indicamos a ThreeJS donde queremos el canvas.
    $("#scene-section").append(renderer.domElement);

    loader = new FBXLoader()

    player01 = new Player();
    load('../Assets/Win1873.fbx', scene, player01, 1);

    
    render();
} )

function render(){

    requestAnimationFrame(render);

    //player01.object.rotation.y += THREE.Math.degToRad(1);
    const delta = clock.getDelta();

    if(player01.mixer) player01.mixer.update( delta );

    renderer.render(scene, camera);
}

/**
 * Carga un archivo FBX y lo almacena en el objeto myObj.
 * @param {String} path Ruta del archivo FBX
 * @param {*} scene Objeto scene de ThreeJS
 * @param {*} buffer Objeto derivado de la clase FBX
 * @param {Number} anim Animacion a reproducir después de cargar el objeto, si es nulo no se reproduce.
 */
function load(path, scene, buffer, anim) {
    loader.load(path, function (object) {

        object.traverse( function ( child ) {
            if( child.isMesh ){
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );

        buffer.mixer = new THREE.AnimationMixer( object );
        buffer.object = object;
        scene.add(buffer.object);

        if(Number.isInteger(anim)) buffer.playAnimation(anim);
    });
}
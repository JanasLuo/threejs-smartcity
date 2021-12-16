/*
 * @Author: janasluo
 * @Date: 2021-11-17 19:31:08
 * @LastEditTime: 2021-12-16 16:14:41
 * @LastEditors: janasluo
 * @Description: 
 * @FilePath: /test/Users/janas/work/project/threejs/threejs-smartcity/src/components/threejs/scene/index.js
 */
// 场景总文件
// 引入Three.js
import * as THREE from 'three';
import {
  model
} from './model.js';

// import {
//   model
// } from './loadGLTFModel.js';
import {
  flyGroup
} from './flyGroup.js';
import {
  lon2xy
} from './math.js';


/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
scene.add(model); //三维模型添加到场景中
scene.add(flyGroup); //gltf飞机模型添加到场景中
/**
 * 光源设置
 */
// 平行光1
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 400, 300);
scene.add(directionalLight);
// 平行光2
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-200, -400, 300);
scene.add(directionalLight2);
//环境光
var ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
var axesHelper = new THREE.AxesHelper(2500);
var E = 121.49526536464691; //东方明珠经纬度坐标
var N = 31.24189350905988;
var xy = lon2xy(E, N);
var x = xy.x;
var y = xy.y;
axesHelper.position.set(x, y, 0);
scene.add(axesHelper);


// var geometry = new THREE.BoxGeometry(500, 500, 500); //创建一个长方体几何对象Geometry
// var material = new THREE.MeshLambertMaterial({
//   color: 0x00ffff, //颜色
// }); //材质对象Material
// var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
// scene.add(mesh); //网格模型添加到model中
// mesh.position.set(x, y, 0);


export {
  scene
};
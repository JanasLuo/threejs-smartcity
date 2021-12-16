/*
 * @Author: janasluo
 * @Date: 2021-11-17 20:34:20
 * @LastEditTime: 2021-12-14 18:11:32
 * @LastEditors: janasluo
 * @Description: 
 * @FilePath: /test/Users/janas/work/study/three.js 郭隆邦/Three.js智慧城市Web3D可视化/9.方案科普课—城市或园区3D场景和大屏可视化图表结合/1.城市3D场景和大屏可视化图表结合/案例源码/city/src/components/threejs/scene/model.js
 */
// 引入Three.js
import * as THREE from 'three';
import {
  ShapeMesh
} from './ShapeMesh.js';
import {
  ExtrudeMesh
} from './ExtrudeMesh.js';
import {
  flyGroup
} from './flyGroup.js';



var model = new THREE.Group(); //声明一个组对象，用来添加城市三场场景的模型对象
var loader = new THREE.FileLoader();
loader.setResponseType('json')
//城市建筑数据解析
loader.load('./上海外滩.json', function (data) {
  var buildGroup = new THREE.Group(); //作为所有每栋楼Mesh的父对象
  data.features.forEach(build => {
    if (build.geometry) {
      // build.geometry.type === "Polygon"表示建筑物底部包含一个多边形轮廓
      //build.geometry.type === "MultiPolygon"表示建筑物底部包含多个多边形轮廓
      if (build.geometry.type === "Polygon") {
        // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
        build.geometry.coordinates = [build.geometry.coordinates];
      }
      //build.properties.Floor*3近似表示楼的高度  
      var height = build.properties.Floor * 3;
      buildGroup.add(ExtrudeMesh(build.geometry.coordinates, height));
    }
  });
  // model.add(buildGroup);
});
// 黄浦江
loader.load('./黄浦江.json', function (data) {
  var buildGroup = new THREE.Group(); //作为所有每栋楼Mesh的父对象
  data.features.forEach(build => {
    if (build.geometry) {
      // build.geometry.type === "Polygon"表示建筑物底部包含一个多边形轮廓
      //build.geometry.type === "MultiPolygon"表示建筑物底部包含多个多边形轮廓
      if (build.geometry.type === "Polygon") {
        // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
        build.geometry.coordinates = [build.geometry.coordinates];
      }
      buildGroup.add(ShapeMesh(build.geometry.coordinates));
    }
  });
  model.add(buildGroup);
});


model.add(flyGroup);






export {
  model
}
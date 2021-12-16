/*
 * @Author: janasluo
 * @Date: 2021-11-17 20:34:20
 * @LastEditTime: 2021-12-16 17:24:08
 * @LastEditors: janasluo
 * @Description: 
 * @FilePath: /test/Users/janas/work/project/threejs/threejs-smartcity/src/components/threejs/scene/model.js
 */
// 引入Three.js
import * as THREE from 'three';
import {
  ShapeMesh
} from './ShapeMesh.js';
import {
  ExtrudeMesh
} from './ExtrudeMesh.js';
import { radarGroup } from './radarGroup.js'
import {
  flyGroup
} from './flyGroup.js';
var model = new THREE.Group(); //声明一个组对象，用来添加城市三场场景的模型对象
var loader = new THREE.FileLoader();
loader.setResponseType('json')
//城市建筑数据解析
loader.load('./上海外滩.json', function (data) {
  var build = ExtrudeMesh(data);//楼房建筑模型，所有几何体已合并
  build.name = "楼房";//设置name属性，模型导出的时候，可以携带该信息
  model.add(build);
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
      var mesh = ShapeMesh(build.geometry.coordinates)
      mesh.name = "黄浦江";//设置name属性，模型导出的时候，可以携带该信息
      buildGroup.add(mesh);
    }
  });
  model.add(buildGroup);
});

console.log('radarGroup', radarGroup)
model.add(radarGroup);
// model.add(flyGroup);



export {
  model
}
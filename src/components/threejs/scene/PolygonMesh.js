
/*
 * @Author: janasluo
 * @Date: 2021-11-18 09:42:42
 * @LastEditTime: 2022-01-04 16:00:18
 * @LastEditors: janasluo
 * @Description: 根据geojson polygon数据绘制shape多边形
 */
// 引入three.js
import * as THREE from 'three';
import {
  lon2xy
} from './math.js';



// pointsArrs：多个多边形轮廓
function PolygonMesh(pointsArrs, color) {

  // MeshBasicMaterial:不受光照影响
  // MeshLambertMaterial：几何体表面和光线角度不同，明暗不同
  var material = new THREE.MeshLambertMaterial({
    color, //颜色
  });
  var shapeArr = []; //轮廓形状Shape集合
  pointsArrs.forEach(pointsArr => {
    var vector2Arr = [];
    // 转化为Vector2构成的顶点数组
    pointsArr[0].forEach(elem => {
      var xy = lon2xy(elem[0], elem[1]);//经纬度转墨卡托坐标
      vector2Arr.push(new THREE.Vector2(xy.x, xy.y));
    });
    var shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });
  var geometry = new THREE.ShapeGeometry( //填充多边形
    shapeArr,
  );
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象
  return mesh;
}
export {
  PolygonMesh
};
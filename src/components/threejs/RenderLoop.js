/*
 * @Author: janasluo
 * @Date: 2021-11-17 19:23:14
 * @LastEditTime: 2021-12-14 18:07:00
 * @LastEditors: janasluo
 * @Description: 
 * @FilePath: /test/Users/janas/work/study/three.js 郭隆邦/Three.js智慧城市Web3D可视化/9.方案科普课—城市或园区3D场景和大屏可视化图表结合/1.城市3D场景和大屏可视化图表结合/案例源码/city/src/components/threejs/RenderLoop.js
 */
import { scene } from './scene/index.js'//Three.js三维场景
import { renderer, camera } from './RendererCamera.js'//渲染器对象和相机对象
import { CSS2LabelRenderer } from './CSS2DRenderer.js';
import { CSS3LabelRenderer } from './CSS3DRenderer.js';
import { TilesRenderer } from '3d-tiles-renderer';
// 渲染循环

const tilesRenderer = new TilesRenderer('./sh-fbx/tileset.json');
tilesRenderer.setCamera(camera);
tilesRenderer.setResolutionFromRenderer(camera, renderer);
scene.add(tilesRenderer.group);
console.log('tilesRenderer.group', tilesRenderer.group)
function render() {
  CSS2LabelRenderer.render(scene, camera); //渲染HTML标签对象
  CSS3LabelRenderer.render(scene, camera);

  camera.updateMatrixWorld();
  tilesRenderer.update();

  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  // console.log(camera.position);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
render();

export { renderer }

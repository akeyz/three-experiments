/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45;
	var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
	var NEAR = 1;
	var FAR = 10000;
	
	var orbitControlsEnabled = false;
	
	var scene = void 0;
	var camera = void 0;
	var renderer = void 0;
	var axisHelper = void 0;
	var gridHelper = void 0;
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	var height = void 0;
	
	// const origin = new THREE.Vector3(0, 0, 0);
	
	function mid(v1, v2) {
	  return new THREE.Vector3(v1.x + (v2.x - v1.x) / 2, v1.y + (v2.y - v1.y) / 2, v1.z + (v2.z - v1.z) / 2);
	}
	
	var points = {
	  from: new THREE.Vector3(-200, -150, 0),
	  to: new THREE.Vector3(50, -80, 0)
	};
	
	points.mid = mid(points.from, points.to);
	
	function init() {
	  scene = new THREE.Scene();
	
	  gridHelper = new THREE.GridHelper(200, 20);
	  gridHelper.rotation.x = Math.PI / 2;
	  scene.add(gridHelper);
	
	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);
	
	  var pointGeometry = new THREE.CircleGeometry(2, 32);
	  var pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
	
	  var pointFrom = new THREE.Mesh(pointGeometry, pointMaterial);
	  pointFrom.position.set(points.from.x, points.from.y, points.from.z);
	
	  var pointTo = new THREE.Mesh(pointGeometry, pointMaterial);
	  pointTo.position.set(points.to.x, points.to.y, points.to.z);
	
	  var pointMid = new THREE.Mesh(pointGeometry, pointMaterial);
	  pointMid.position.set(points.mid.x, points.mid.y, points.mid.z);
	
	  scene.add(pointFrom);
	  scene.add(pointTo);
	  scene.add(pointMid);
	
	  var radius = points.from.distanceTo(points.to) / 2;
	  var regionGeometry = new THREE.CircleGeometry(radius, 32);
	  var regionMaterial = new THREE.MeshBasicMaterial({
	    color: 0xffff00,
	    wireframe: true,
	    transparent: true,
	    opacity: 0.5
	  });
	  var region = new THREE.Mesh(regionGeometry, regionMaterial);
	  region.position.set(points.mid.x, points.mid.y, points.mid.z);
	  scene.add(region);
	
	  height = radius / Math.tan(Math.PI / 8);
	
	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(points.mid.x, points.mid.y, height);
	  camera.lookAt(points.mid);
	
	  ambientLight = new THREE.AmbientLight(0x444444);
	  scene.add(ambientLight);
	
	  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 50, 50);
	  scene.add(pointLight);
	
	  renderer = new THREE.WebGLRenderer();
	  renderer.setSize(window.innerWidth, window.innerHeight);
	
	  controls = new THREE.OrbitControls(camera, renderer.domElement);
	  controls.target.set(points.mid.x, points.mid.y, points.mid.z);
	  controls.enabled = orbitControlsEnabled;
	
	  THREEx.WindowResize(renderer, camera);
	
	  document.body.appendChild(renderer.domElement);
	}
	
	// let count = 0;
	
	var difX = points.from.distanceTo(points.to);
	
	var xMin = -difX / 4;
	var xMax = difX / 4;
	
	var camDelta = 1;
	var camX = 0;
	var camDir = 1;
	
	console.log(xMin, xMax, camX);
	
	function update() {
	  controls.update();
	
	  camX += camDelta * camDir;
	  // console.log(camX);
	  if (camX < xMin) {
	    camDir = -camDir;
	    camX = xMin + camDir * camDelta;
	  } else if (camX > xMax) {
	    camDir = -camDir;
	    camX = xMax + camDir * camDelta;
	  }
	
	  // count += 0.005;
	  // const angle = Math.PI * (5 / 8) + Math.sin(count) * Math.PI * (1 / 8);
	
	  // if (angle > angleMax) {
	  //   angleDir = -angleDir;
	  //   angle += 2 * angleDelta * angleDir;
	  // } else if (angle < angleMin) {
	  //   angleDir = -angleDir;
	  //   angle += 2 * angleDelta * angleDir;
	  // }
	
	  // const x = 0; // height * Math.sin(angle);
	  // const y = height * Math.cos(angle);
	  // const z = height * Math.sin(angle);
	  camera.position.set(points.mid.x + camX, points.mid.y - camX, height);
	  camera.lookAt(points.mid);
	}
	
	function animate() {
	  requestAnimationFrame(animate);
	  update();
	  renderer.render(scene, camera);
	}
	
	init();
	animate();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDdhMjU4YWNiM2QzZjdhY2U5OWI/NTA1YyoqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwcy90d28tcG9pbnRzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlNDUkVFTl9XSURUSCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJTQ1JFRU5fSEVJR0hUIiwiaW5uZXJIZWlnaHQiLCJWSUVXX0FOR0xFIiwiQVNQRUNUIiwiTkVBUiIsIkZBUiIsIm9yYml0Q29udHJvbHNFbmFibGVkIiwic2NlbmUiLCJjYW1lcmEiLCJyZW5kZXJlciIsImF4aXNIZWxwZXIiLCJncmlkSGVscGVyIiwiY29udHJvbHMiLCJwb2ludExpZ2h0IiwiYW1iaWVudExpZ2h0IiwiaGVpZ2h0IiwibWlkIiwidjEiLCJ2MiIsIlRIUkVFIiwiVmVjdG9yMyIsIngiLCJ5IiwieiIsInBvaW50cyIsImZyb20iLCJ0byIsImluaXQiLCJTY2VuZSIsIkdyaWRIZWxwZXIiLCJyb3RhdGlvbiIsIk1hdGgiLCJQSSIsImFkZCIsIkF4aXNIZWxwZXIiLCJwb2ludEdlb21ldHJ5IiwiQ2lyY2xlR2VvbWV0cnkiLCJwb2ludE1hdGVyaWFsIiwiTWVzaEJhc2ljTWF0ZXJpYWwiLCJjb2xvciIsInBvaW50RnJvbSIsIk1lc2giLCJwb3NpdGlvbiIsInNldCIsInBvaW50VG8iLCJwb2ludE1pZCIsInJhZGl1cyIsImRpc3RhbmNlVG8iLCJyZWdpb25HZW9tZXRyeSIsInJlZ2lvbk1hdGVyaWFsIiwid2lyZWZyYW1lIiwidHJhbnNwYXJlbnQiLCJvcGFjaXR5IiwicmVnaW9uIiwidGFuIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJsb29rQXQiLCJBbWJpZW50TGlnaHQiLCJQb2ludExpZ2h0IiwiV2ViR0xSZW5kZXJlciIsInNldFNpemUiLCJPcmJpdENvbnRyb2xzIiwiZG9tRWxlbWVudCIsInRhcmdldCIsImVuYWJsZWQiLCJUSFJFRXgiLCJXaW5kb3dSZXNpemUiLCJkb2N1bWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImRpZlgiLCJ4TWluIiwieE1heCIsImNhbURlbHRhIiwiY2FtWCIsImNhbURpciIsImNvbnNvbGUiLCJsb2ciLCJ1cGRhdGUiLCJhbmltYXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLEtBQU1BLGVBQWVDLE9BQU9DLFVBQTVCO0FBQ0EsS0FBTUMsZ0JBQWdCRixPQUFPRyxXQUE3QjtBQUNBLEtBQU1DLGFBQWEsRUFBbkI7QUFDQSxLQUFNQyxTQUFTTixlQUFlRyxhQUE5QjtBQUNBLEtBQU1JLE9BQU8sQ0FBYjtBQUNBLEtBQU1DLE1BQU0sS0FBWjs7QUFFQSxLQUFNQyx1QkFBdUIsS0FBN0I7O0FBRUEsS0FBSUMsY0FBSjtBQUNBLEtBQUlDLGVBQUo7QUFDQSxLQUFJQyxpQkFBSjtBQUNBLEtBQUlDLG1CQUFKO0FBQ0EsS0FBSUMsbUJBQUo7QUFDQSxLQUFJQyxpQkFBSjtBQUNBLEtBQUlDLG1CQUFKO0FBQ0EsS0FBSUMscUJBQUo7QUFDQSxLQUFJQyxlQUFKOztBQUVBOztBQUVBLFVBQVNDLEdBQVQsQ0FBYUMsRUFBYixFQUFpQkMsRUFBakIsRUFBcUI7QUFDbkIsVUFBTyxJQUFJQyxNQUFNQyxPQUFWLENBQ0xILEdBQUdJLENBQUgsR0FBUSxDQUFDSCxHQUFHRyxDQUFILEdBQU9KLEdBQUdJLENBQVgsSUFBZ0IsQ0FEbkIsRUFFTEosR0FBR0ssQ0FBSCxHQUFRLENBQUNKLEdBQUdJLENBQUgsR0FBT0wsR0FBR0ssQ0FBWCxJQUFnQixDQUZuQixFQUdMTCxHQUFHTSxDQUFILEdBQVEs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QVQsR0FBbUI7QUFDakJDLHlCQUFzQkQsT0FBdEI7QUFDQUQ7QUFDQXJFLFlBQVN3RSxNQUFULENBQWdCMUUsS0FBaEIsRUFBdUJDLE1BQXZCO0FBQ0Q7O0FBRURtQjtBQUNBb0QsVyIsImZpbGUiOiJkaXN0L2FwcHMvdHdvLXBvaW50cy9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwN2EyNThhY2IzZDNmN2FjZTk5YiIsImNvbnN0IFNDUkVFTl9XSURUSCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY29uc3QgU0NSRUVOX0hFSUdIVCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmNvbnN0IFZJRVdfQU5HTEUgPSA0NTtcbmNvbnN0IEFTUEVDVCA9IFNDUkVFTl9XSURUSCAvIFNDUkVFTl9IRUlHSFQ7XG5jb25zdCBORUFSID0gMTtcbmNvbnN0IEZBUiA9IDEwMDAwO1xuXG5jb25zdCBvcmJpdENvbnRyb2xzRW5hYmxlZCA9IGZhbHNlO1xuXG5sZXQgc2NlbmU7XG5sZXQgY2FtZXJhO1xubGV0IHJlbmRlcmVyO1xubGV0IGF4aXNIZWxwZXI7XG5sZXQgZ3JpZEhlbHBlcjtcbmxldCBjb250cm9scztcbmxldCBwb2ludExpZ2h0O1xubGV0IGFtYmllbnRMaWdodDtcbmxldCBoZWlnaHQ7XG5cbi8vIGNvbnN0IG9yaWdpbiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApO1xuXG5mdW5jdGlvbiBtaWQodjEsIHYyKSB7XG4gIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyhcbiAgICB2MS54ICsgKCh2Mi54IC0gdjEueCkgLyAyKSxcbiAgICB2MS55ICsgKCh2Mi55IC0gdjEueSkgLyAyKSxcbiAgICB2MS56ICsgKCh2Mi56IC0gdjEueikgLyAyKSxcbiAgKTtcbn1cblxuY29uc3QgcG9pbnRzID0ge1xuICBmcm9tOiBuZXcgVEhSRUUuVmVjdG9yMygtMjAwLCAtMTUwLCAwKSxcbiAgdG86IG5ldyBUSFJFRS5WZWN0b3IzKDUwLCAtODAsIDApLFxufTtcblxucG9pbnRzLm1pZCA9IG1pZChwb2ludHMuZnJvbSwgcG9pbnRzLnRvKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICBncmlkSGVscGVyID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoMjAwLCAyMCk7XG4gIGdyaWRIZWxwZXIucm90YXRpb24ueCA9IE1hdGguUEkgLyAyO1xuICBzY2VuZS5hZGQoZ3JpZEhlbHBlcik7XG5cbiAgYXhpc0hlbHBlciA9IG5ldyBUSFJFRS5BeGlzSGVscGVyKDEwMCk7XG4gIHNjZW5lLmFkZChheGlzSGVscGVyKTtcblxuICBjb25zdCBwb2ludEdlb21ldHJ5ID0gbmV3IFRIUkVFLkNpcmNsZUdlb21ldHJ5KDIsIDMyKTtcbiAgY29uc3QgcG9pbnRNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcblxuICBjb25zdCBwb2ludEZyb20gPSBuZXcgVEhSRUUuTWVzaChwb2ludEdlb21ldHJ5LCBwb2ludE1hdGVyaWFsKTtcbiAgcG9pbnRGcm9tLnBvc2l0aW9uLnNldChwb2ludHMuZnJvbS54LCBwb2ludHMuZnJvbS55LCBwb2ludHMuZnJvbS56KTtcblxuICBjb25zdCBwb2ludFRvID0gbmV3IFRIUkVFLk1lc2gocG9pbnRHZW9tZXRyeSwgcG9pbnRNYXRlcmlhbCk7XG4gIHBvaW50VG8ucG9zaXRpb24uc2V0KHBvaW50cy50by54LCBwb2ludHMudG8ueSwgcG9pbnRzLnRvLnopO1xuXG4gIGNvbnN0IHBvaW50TWlkID0gbmV3IFRIUkVFLk1lc2gocG9pbnRHZW9tZXRyeSwgcG9pbnRNYXRlcmlhbCk7XG4gIHBvaW50TWlkLnBvc2l0aW9uLnNldChwb2ludHMubWlkLngsIHBvaW50cy5taWQueSwgcG9pbnRzLm1pZC56KTtcblxuICBzY2VuZS5hZGQocG9pbnRGcm9tKTtcbiAgc2NlbmUuYWRkKHBvaW50VG8pO1xuICBzY2VuZS5hZGQocG9pbnRNaWQpO1xuXG4gIGNvbnN0IHJhZGl1cyA9IHBvaW50cy5mcm9tLmRpc3RhbmNlVG8ocG9pbnRzLnRvKSAvIDI7XG4gIGNvbnN0IHJlZ2lvbkdlb21ldHJ5ID0gbmV3IFRIUkVFLkNpcmNsZUdlb21ldHJ5KHJhZGl1cywgMzIpO1xuICBjb25zdCByZWdpb25NYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZmZmZjAwLFxuICAgIHdpcmVmcmFtZTogdHJ1ZSxcbiAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICBvcGFjaXR5OiAwLjUsXG4gIH0pO1xuICBjb25zdCByZWdpb24gPSBuZXcgVEhSRUUuTWVzaChyZWdpb25HZW9tZXRyeSwgcmVnaW9uTWF0ZXJpYWwpO1xuICByZWdpb24ucG9zaXRpb24uc2V0KHBvaW50cy5taWQueCwgcG9pbnRzLm1pZC55LCBwb2ludHMubWlkLnopO1xuICBzY2VuZS5hZGQocmVnaW9uKTtcblxuICBoZWlnaHQgPSByYWRpdXMgLyBNYXRoLnRhbihNYXRoLlBJIC8gOCk7XG5cbiAgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKFZJRVdfQU5HTEUsIEFTUEVDVCwgTkVBUiwgRkFSKTtcbiAgY2FtZXJhLnBvc2l0aW9uLnNldChwb2ludHMubWlkLngsIHBvaW50cy5taWQueSwgaGVpZ2h0KTtcbiAgY2FtZXJhLmxvb2tBdChwb2ludHMubWlkKTtcblxuICBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4NDQ0NDQ0KTtcbiAgc2NlbmUuYWRkKGFtYmllbnRMaWdodCk7XG5cbiAgcG9pbnRMaWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4ZmZmZmZmLCAxLCAxMDAwKTtcbiAgcG9pbnRMaWdodC5wb3NpdGlvbi5zZXQoNTAsIDUwLCA1MCk7XG4gIHNjZW5lLmFkZChwb2ludExpZ2h0KTtcblxuICByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICBjb250cm9scy50YXJnZXQuc2V0KHBvaW50cy5taWQueCwgcG9pbnRzLm1pZC55LCBwb2ludHMubWlkLnopO1xuICBjb250cm9scy5lbmFibGVkID0gb3JiaXRDb250cm9sc0VuYWJsZWQ7XG5cbiAgVEhSRUV4LldpbmRvd1Jlc2l6ZShyZW5kZXJlciwgY2FtZXJhKTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xufVxuXG4vLyBsZXQgY291bnQgPSAwO1xuXG5jb25zdCBkaWZYID0gcG9pbnRzLmZyb20uZGlzdGFuY2VUbyhwb2ludHMudG8pO1xuXG5jb25zdCB4TWluID0gLWRpZlggLyA0O1xuY29uc3QgeE1heCA9IGRpZlggLyA0O1xuXG5jb25zdCBjYW1EZWx0YSA9IDE7XG5sZXQgY2FtWCA9IDA7XG5sZXQgY2FtRGlyID0gMTtcblxuY29uc29sZS5sb2coeE1pbiwgeE1heCwgY2FtWCk7XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgY29udHJvbHMudXBkYXRlKCk7XG5cbiAgY2FtWCArPSAoY2FtRGVsdGEgKiBjYW1EaXIpO1xuICAvLyBjb25zb2xlLmxvZyhjYW1YKTtcbiAgaWYgKGNhbVggPCB4TWluKSB7XG4gICAgY2FtRGlyID0gLWNhbURpcjtcbiAgICBjYW1YID0geE1pbiArIGNhbURpciAqIGNhbURlbHRhO1xuICB9IGVsc2UgaWYgKGNhbVggPiB4TWF4KSB7XG4gICAgY2FtRGlyID0gLWNhbURpcjtcbiAgICBjYW1YID0geE1heCArIGNhbURpciAqIGNhbURlbHRhO1xuICB9XG5cbiAgLy8gY291bnQgKz0gMC4wMDU7XG4gIC8vIGNvbnN0IGFuZ2xlID0gTWF0aC5QSSAqICg1IC8gOCkgKyBNYXRoLnNpbihjb3VudCkgKiBNYXRoLlBJICogKDEgLyA4KTtcblxuICAvLyBpZiAoYW5nbGUgPiBhbmdsZU1heCkge1xuICAvLyAgIGFuZ2xlRGlyID0gLWFuZ2xlRGlyO1xuICAvLyAgIGFuZ2xlICs9IDIgKiBhbmdsZURlbHRhICogYW5nbGVEaXI7XG4gIC8vIH0gZWxzZSBpZiAoYW5nbGUgPCBhbmdsZU1pbikge1xuICAvLyAgIGFuZ2xlRGlyID0gLWFuZ2xlRGlyO1xuICAvLyAgIGFuZ2xlICs9IDIgKiBhbmdsZURlbHRhICogYW5nbGVEaXI7XG4gIC8vIH1cblxuICAvLyBjb25zdCB4ID0gMDsgLy8gaGVpZ2h0ICogTWF0aC5zaW4oYW5nbGUpO1xuICAvLyBjb25zdCB5ID0gaGVpZ2h0ICogTWF0aC5jb3MoYW5nbGUpO1xuICAvLyBjb25zdCB6ID0gaGVpZ2h0ICogTWF0aC5zaW4oYW5nbGUpO1xuICBjYW1lcmEucG9zaXRpb24uc2V0KHBvaW50cy5taWQueCArIGNhbVgsIHBvaW50cy5taWQueSAtIGNhbVgsIGhlaWdodCk7XG4gIGNhbWVyYS5sb29rQXQocG9pbnRzLm1pZCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgdXBkYXRlKCk7XG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcbn1cblxuaW5pdCgpO1xuYW5pbWF0ZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcHMvdHdvLXBvaW50cy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=
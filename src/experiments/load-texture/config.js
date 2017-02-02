export default {
  title: 'Load Texture on other domain',
  description: 'Simple example to load a texture with CORS',
  tags: 'ImageLoader, Image, CORS',
  public: true,
  scripts: [
    // '../../libs/three/r84/three.js',
    'http://127.0.0.1:8080/build/three.js',
    '../../libs/three/r83/controls/OrbitControls.js',
    '../../libs/stats/r17/stats.min.js',
    '../../libs/threex/THREEx.WindowResize.js',
    '../../libs/dat.gui/0.6.2/dat.gui.min.js',
  ],
  styles: [
    '../../libs/dat.gui/0.6.2/dat.gui.css',
  ],
};

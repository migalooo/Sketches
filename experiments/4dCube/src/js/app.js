import '../scss/global.scss';
import debugPolyfill from './debugPolyfill'; // check window.gui loaded
import alfrid, { GL } from 'alfrid';
import SceneApp from './SceneApp';
import AssetsLoader from 'assets-loader';

import assets from './asset-list';
import Assets from './Assets';

if(document.body) {
	_init();
} else {
	window.addEventListener('DOMContentLoaded', _init);
}


window.params = {
	gamma:2.2,
	exposure:5, 
	light:{
		lightDir:[1, .8, .6]
	}
};

function _init() {

	//	LOADING ASSETS
  // note: loading assets form asset-list
	if(assets.length > 0) {
		document.body.classList.add('isLoading');

    // note: may use promise rewrite assetsLoader
		const loader = new AssetsLoader({
			assets:assets
		})
		.on('error', (error)=>{
			console.log('Error :', error);
		})
		.on('progress', (p) => {
			// console.log('Progress : ', p);
			const loader = document.body.querySelector('.Loading-Bar');
			if(loader) loader.style.width = `${(p * 100)}%`;
		})
		.on('complete', _onImageLoaded)
		.start();

	} else {
		_init3D();
	}
}


// not: if has image assets
function _onImageLoaded(o) {
	//	ASSETS
	console.log('Image Loaded : ', o);
	window.assets = o;
	const loader = document.body.querySelector('.Loading-Bar');
	console.log('Loader :', loader);
	loader.style.width = '100%';

	_init3D();

	setTimeout(()=> {
		document.body.classList.remove('isLoading');
	}, 250);
}


function _init3D() {
	//	CREATE CANVAS
	const canvas = document.createElement('canvas');
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);

	//	INIT 3D TOOL
  //	set gl context

  // note: init gl context use webgl api
	GL.init(canvas, {ignoreWebgl2:true});

	//	INIT ASSETS
  //	load assets
	Assets.init();

	//	CREATE SCENE
	const scene = new SceneApp();

	
}

let camera, scene, renderer, controls, ambient,
      light1, light2, light3, light4,
      light5, light6, light7,
      light8, light9, light10, light11,
      light12, light13, light14,
      logo;

      let lights = [];
      const clock = new THREE.Clock();
      const sphere = new THREE.SphereGeometry(0.5, 16, 8);
      const skyboxImage = '';
      const gltfFileName = 'spotify_logo.glb';
      
      init();
      animate();

      /**
       * Creates a spherical light, adds it to the scene
       * @param The color of light
       * @returns Light object 
       */
      function makeLight(color) {
        let light = new THREE.PointLight(color, 1.0, 50);
        light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial( { color: color } )));
        scene.add(light);
        return light;
      }

      function makeLights() {
          light1 = makeLight(randomColor());
          light2 = makeLight(randomColor());
          light3 = makeLight(randomColor());
          light4 = makeLight(randomColor());
          light5 = makeLight(randomColor());
          light6 = makeLight(randomColor());
          light7 = makeLight(randomColor());
          light8 = makeLight(randomColor());
          light9 = makeLight(randomColor());
          light10 = makeLight(randomColor());
          light11 = makeLight(randomColor());
          light12 = makeLight(randomColor());
          light13 = makeLight(randomColor());
          light14 = makeLight(randomColor());
      }

      function randomColor() {
        let maxVal = 0xFFFFFF; // 16777215
        let randomNumber = Math.random() * maxVal; 
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        let randColor = randomNumber.padStart(6, 0);   
        return `#${randColor.toUpperCase()}`    
      }

      function createPathStrings(filename) {
        const basePath = "./galaxy/";
        const baseFilename = basePath + filename;
        const fileType = ".png";
        const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
        const pathStings = sides.map(side => {
            let name = baseFilename.substring(2, baseFilename.length-1) + "_" + side + fileType;
            return baseFilename + name;
        });
        return pathStings;
      }

      /**
       * 
       * @param filename 
       * @returns the material array used in the skybox
       */
      function createMaterialArray(filename) {
        const skyboxImagepaths = createPathStrings(filename);
        const materialArray = skyboxImagepaths.map(image => {
          let texture = new THREE.TextureLoader().load(image);
          return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
        });
        return materialArray;
      }

      function addLogoObject() {
        {
        const gltfLoader = new THREE.GLTFLoader();
        gltfLoader.load(gltfFileName, (gltf) => {
            logo = gltf.scene;
            logo.scale.set(30.0, 30.0, 30.0);
            logo.position.set(0.0, 0.0, 0.0);
            scene.add( logo );
        });
        }
      }

      /**
       * Initializes the scene, camera, logo, lights, renderer
       */
      function init() {
        // Scene
        scene = new THREE.Scene();

        // Camera
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(100, 0, 100);

        // Renderer
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enabled = true;
        controls.minDistance = 120;
        controls.maxDistance = 200;

        // Add Objects
        addLogoObject();
        makeLights();
    

        
        window.addEventListener('resize', onWindowResize);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        requestAnimationFrame( animate );
        render();
      }

      function render() {
        const time = Date.now() * 0.0005;
        const delta = clock.getDelta();
        if ( logo ) logo.rotation.y -= 0.05 * delta;

        light1.position.x = Math.sin( time * 0.7 ) * 30;
        light1.position.y = Math.cos( time * 0.5 ) * 40;
        light1.position.z = Math.cos( time * 0.3 ) * 30;

        light2.position.x = Math.cos( time * 0.3 ) * 30;
        light2.position.y = Math.sin( time * 0.5 ) * 40;
        light2.position.z = Math.sin( time * 0.7 ) * 30;

        light3.position.x = Math.sin( time * 0.7 ) * 30;
        light3.position.y = Math.cos( time * 0.3 ) * 40;
        light3.position.z = Math.sin( time * 0.5 ) * 30;

        light4.position.x = Math.sin( -time * 0.3 ) * 30;
        light4.position.y = Math.cos( -time * 0.7 ) * 40;
        light4.position.z = Math.sin( -time * 0.5 ) * 30;

        light5.position.x = Math.sin( -time * 0.5 ) * 20;
        light5.position.y = Math.cos( -time * 0.5 ) * 40;
        light5.position.z = Math.cos( -time * 0.3 ) * 30;

        light6.position.x = Math.cos( -time * 0.6 ) * 30;
        light6.position.y = Math.sin( -time * 0.2 ) * 20;
        light6.position.z = Math.sin( -time * 0.4 ) * 30;

        light7.position.x = Math.sin( -time * 0.6 ) * 30;
        light7.position.y = Math.cos( -time * 0.5 ) * 20;
        light7.position.z = Math.sin( -time * 0.4 ) * 20;

        light8.position.x = Math.sin( -time * 0.5 ) * 30;
        light8.position.y = Math.cos( -time * 0.5 ) * 40;
        light8.position.z = Math.cos( -time * 0.4 ) * 30;

        light9.position.x = Math.cos( -time * 0.3 ) * 30;
        light9.position.y = Math.sin( -time * 0.6 ) * 40;
        light9.position.z = Math.sin( -time * 0.6 ) * 30;

        light10.position.x = Math.sin( -time * 0.8 ) * 30;
        light10.position.y = Math.cos( -time * 0.3 ) * 40;
        light10.position.z = Math.sin( -time * 0.2 ) * 30;

        light11.position.x = Math.sin( time * 0.3 ) * 30;
        light11.position.y = Math.cos( time * 0.7 ) * 40;
        light11.position.z = Math.sin( time * 0.5 ) * 30;

        light12.position.x = Math.sin( time * 0.2 ) * 20;
        light12.position.y = Math.cos( time * 0.3 ) * 40;
        light12.position.z = Math.cos( time * 0.5 ) * 30;

        light13.position.x = Math.cos( time * 0.6 ) * 30;
        light13.position.y = Math.sin( time * 0.2 ) * 20;
        light13.position.z = Math.sin( time * 0.4 ) * 30;

        light14.position.x = Math.sin( time * 0.6 ) * 30;
        light14.position.y = Math.cos( time * 0.5 ) * 20;
        light14.position.z = Math.sin( time * 0.4 ) * 20;
        
        renderer.render( scene, camera );

      }
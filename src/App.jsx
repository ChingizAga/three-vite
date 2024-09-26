import { useEffect, useState } from "react";
import SceneInit from "./library/SceneInit";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./App.css";

function App() {
  const [modelPart1, setModelPart1] = useState(null);
  const [modelPart2, setModelPart2] = useState(null);

  const [isVisible1, setIsVisible1] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);

  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initialize();
    test.animate();

    let loadedModel;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/assets/display/scene.gltf", (gltfScene) => {
      loadedModel = gltfScene;

      gltfScene.scene.traverse((child) => {
        console.log(child.name);
      });

      const part1 = gltfScene.scene.getObjectByName("Shelf_Three");
      const part2 = gltfScene.scene.getObjectByName("Shelf_Four");
      console.log("Model par 1:", part1);
      console.log("Model par 2:", part2);
      setModelPart1(part1);
      setModelPart2(part2);

      gltfScene.scene.rotation.y = Math.PI / 0.3;
      gltfScene.scene.rotation.x = Math.PI / 12;
      gltfScene.scene.scale.set(1, 1, 1);
      test.scene.add(gltfScene.scene);
    });

    const animate = () => {
      if (loadedModel) {
        // loadedModel.scene.rotation.x += 0.01;
        // loadedModel.scene.rotation.y += 0.01;
        // loadedModel.scene.rotation.z += 0.01;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  const toggleVisibility1 = () => {
    if (modelPart1) {
      modelPart1.visible = !modelPart1.visible;
      setIsVisible1((prevVisible) => !prevVisible);
      console.log("Part 1 visibility toggled:", modelPart1.visible);
    }
  };

  const toggleVisibility2 = () => {
    if (modelPart2) {
      modelPart2.visible = !modelPart2.visible;
      setIsVisible2((prevVisible) => !prevVisible);
      console.log("Part 2 visibility toggled:", modelPart2.visible);
    }
  };

  return (
    <>
      <canvas id="myThreeJsCanvas" />

      <button className="button" onClick={toggleVisibility1}>
        {isVisible1 ? "Hide" : "Show"} <br /> 3 Shelf
      </button>

      <button className="button" onClick={toggleVisibility2}>
        {isVisible2 ? "Hide" : "Show"} <br /> 4 Shelf
      </button>
    </>
  );
}

export default App;

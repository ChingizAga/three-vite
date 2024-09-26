export default function Button() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    if (modelPart) {
      modelPart.visible = !modelPart.visible;
      setIsVisible((prevVisible) => !prevVisible);
      console.log("Visiblity toggled:", modelPart.visible);
    }
  };

  <button className="button" onClick={toggleVisibility}>
    {isVisible ? "Hide" : "Show"} Shelf
  </button>;
}

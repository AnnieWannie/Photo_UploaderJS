import { useState } from "react";
import "./App.css";

function App() {

  const [fileArray, setFileArray] = useState();
  const [imageObj, setImageObj] = useState();
  const [imageArray, setImageArray] = useState();
  const [doggoImage, setDoggoImage] = useState();
  const [submitText, setSubmitText] = useState();

  const multiFileChangeHandler = (e) => {
    setDoggoImage(null)
    setFileArray(e.target.files)
    setSubmitText(e.target.files.length + " files preped for upload")
  };


const multiSubmitHandler = (e) =>{
e.preventDefault();
const data = new FormData()
data.append("multi_photos", doggoImage)
for (let i = 0; i < fileArray.length; i++){
data.append("multi_photos", fileArray[i]);
}
fetch("/multiple", {
  method: "POST",
  body: data,
})
  .then((result) => {
    console.log("File sent");
    setSubmitText("File Sent")
    console.log(result)
  })
  .catch((err) => {
    console.log(err.message);
    setSubmitText(err.message)
  })
}

  

const getImageArray = (e) => {
  setDoggoImage(null)
  fetch("/multiple")
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      console.log(response);
      setSubmitText("Image(s) obtained and displayed")
      setImageArray(response.map((imageItem, index) => <img src={"/images/"+imageItem} alt={`Array element ${index}`} key = {index} width="300" height="300"></img>))
      console.log("Image collection obtained")
      })
    .catch((err) => {
      console.log(err.message);
      setSubmitText("Could not get random image")
    })
}


const getRandomDog = () => {
    setImageArray(null)
    setImageObj(null)
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        console.log(json.status);
        setSubmitText("Doggy obtained")
        return fetch(json.message)
      })
      .then((result) => {
          return result.blob();     
        })
        .then((blob) => {
          console.log(blob);
          setSubmitText("Doggy blobby obtained")
          setDoggoImage(blob)
          setFileArray(blob)
        })
        .catch((err) => {
          console.log(err.message);
          setSubmitText("Could not get random image")
        })
  }

return (
  <div className="App">
    <header className = "App-header">
      <h1>AnnieWannie's Photo Uploader</h1>
      <form onSubmit={multiSubmitHandler}>
        <input type="file" multiple onChange={multiFileChangeHandler} />
        <br />
        <br />
        <button type="submit">Submit file to the Backend</button>
        <br />
        <br />
        <button type="button" onClick={getImageArray}>Get Images from Backend</button>
        <br />
        <button type="button" onClick={getRandomDog}>Like dogs? Click this.</button>
        <p>{submitText}</p>
        {imageObj}
        {imageArray}
        {doggoImage}
      </form>
    </header>
  </div>
);
}

export default App;

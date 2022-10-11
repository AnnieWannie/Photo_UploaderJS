import { useState } from "react";
import "./App.css";

function App() {

  const [fileArray, setFileArray] = useState();
  const [submitText, setSubmitText] = useState();
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [image5, setImage5] = useState();
  const [doggoImage, setDoggoImage] = useState();

  const multiFileChangeHandler = (e) => {
    setFileArray(e.target.files)
    // setImage(e.target.files[0])
    // setImage2(e.target.files[1])
    // setImage3(e.target.files[2])
    // setImage4(e.target.files[3])
    // setImage5(e.target.files[4])
    setSubmitText(e.target.files.length + " files preped for upload")
    setImage(null)
    setImage2(null)
    setImage3(null)
    setImage4(null)
    setImage5(null)
    setDoggoImage(null)
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
      setSubmitText("Images obtained and displayed")
      setImage(response[0])
      console.log("Image 1 obtained")
        setImage2(response[1])
        console.log("Image 2 obtained")
        setImage3(response[2])
        console.log("Image 3 obtained")
        setImage4(response[3])
        console.log("Image 4 obtained")
        setImage5(response[4])
        console.log("Image 5 obtained")
      })
    .catch((err) => {
      console.log(err.message);
      setSubmitText("Could not get random image")
    })
}


const getRandomDog = () => {
    setImage(null)
    setImage2(null)
    setImage3(null) 
    setImage4(null) 
    setImage5(null)
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
        {
        image != null &&
           <img alt="Preview" src={(image)} width="300" height="300" />
        }
        {
        image2 != null &&
           <img alt="Preview" src={(image2)} width="300" height="300" />
        }
         {
        image3 != null &&
           <img alt="Preview" src={(image3)} width="300" height="300" />
        }
          {
        image4 != null &&
           <img alt="Preview" src={(image4)} width="300" height="300" />
        }
        {
        image5 != null &&
           <img alt="Preview" src={(image5)} width="300" height="300" />
        }
            {    
        doggoImage != null &&
           <div>
           <img alt="Cutie" src={URL.createObjectURL(doggoImage)} width="300" height="300" />
           <br/>
           </div>
        }
      </form>
    </header>
  </div>
);
}

export default App;

import { useState } from "react";
import "./App.css";

function App() {

  const [fileArray, setFileArray] = useState();
  const [imageObj, setImageObj] = useState();
  const [imageArray, setImageArray] = useState();
  const [userTag, setUserTag] = useState();
  const [submitText, setSubmitText] = useState();
  // const [doggoImage, setDoggoImage] = useState();


  const multiFileChangeHandler = (e) => {
    setImageArray(null)
    setFileArray(e.target.files[0])
    setSubmitText(e.target.files.length + " files preped for upload")
    let tempImageArray = []
    for(let i = 0; i < e.target.files.length;i++){
      tempImageArray.push(<img src={URL.createObjectURL(e.target.files[i])} alt={"Target file " + [i+1]} key={i} width="200" height="200"></img>)
    }
    setImageObj(tempImageArray)
  };


const multiSubmitHandler = (e) =>{
e.preventDefault();

const data = new FormData()
data.append("user_tag", userTag)
// data.append("userName", userName)
data.append("user_image_upload", fileArray)
// for (let i = 0; i < fileArray.length; i++){
// data.append("multi_photos", fileArray[i]);
// }
fetch("/submission", {
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
  setImageObj(null)
  fetch("/submission")
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      console.log(response);
      console.log(response[0])
      setSubmitText("Image obtained and displayed")
      setImageArray(response.map((imageItem, index) => <img src={imageItem} alt={`Array element ${index}`} key = {index} width="200" height="200"></img>))
      console.log("Image collection obtained")
      })
    .catch((err) => {
      console.log(err.message);
      setSubmitText("Could not get random image")
    })
}


//Placeholder for testing feasibility of fetching and saving images via APIs/urls functional
// const getRandomDog = () => {
//     setImageArray(null)
//     setImageObj(null)
//     fetch("https://dog.ceo/api/breeds/image/random")
//       .then((result) => {
//         return result.json();
//       })
//       .then((json) => {
//         console.log(json.status);
//         setSubmitText("Doggy obtained")
//         return fetch(json.message)
//       })
//       .then((result) => {
//           return result.blob();     
//         })
//         .then((blob) => {
//           console.log(blob);
//           setSubmitText("Doggy blobby obtained")
//           setDoggoImage(<img src={URL.createObjectURL(blob)} alt={`Fetched dog blob`} key = {0} width="300" height="300"></img>)
//           setFileArray(blob)
//         })
//         .catch((err) => {
//           console.log(err.message);
//           setSubmitText("Could not get random image")
//         })
//   }

return (
  <div className="App">
    <header className = "App-header">
      <h1>AnnieWannie's Image Time Capsule</h1>
      <h4>Upload a single image to add to the collection!</h4>
      <form onSubmit={multiSubmitHandler}>
        <input type="file" onChange={multiFileChangeHandler} />
        <br />
        <br />
        <label>Leave your mark! <br/> Enter a tag for your submission <br/></label>
        <input type="text" name="tag" onChange={(event) => setUserTag(event.target.value)}/>
        <br />
        <br />
        <button type="submit">Upload Image</button>
        <br />
        <br />
        <button type="button" onClick={getImageArray}>Get all user images!</button>
        <br />
        <br />
        <p>{submitText}</p>
        {imageObj}
        {imageArray}
      </form>
    </header>
  </div>
);
}

export default App;

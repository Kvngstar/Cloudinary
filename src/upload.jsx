import React, { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [url, setUrl] = useState("");
  const [track, setTrack] = useState("");
  const[content,setContent] = useState("")

  //    function ConvertBase64(file) {
  //    return new Promise( (resolve,reject)=>{
  //     const fileReader =  new FileReader();
  //      fileReader.readAsDataURL(file);

  //     fileReader.onload = async (e) => {
  //       var { result } = e.target;
  //       setUrl(result);
  //       resolve(result)
  //     };
  //     console.log("outside file load")

  //     fileReader.onerror = (error) => {
  //       console.log(error);
  //     };}
  //     )
  //   }

  const UploadImage = async () => {
    const readSystem = new FileReader();
     readSystem.readAsDataURL(track);
   readSystem.onload = () => {
    setUrl(readSystem.result);
    sendImage(readSystem.result)
  };
  };
  async function sendImage(item){
    
    const response = await axios.post("http://localhost:5000/uploadImage", {
      image: item,
    });
    console.log(response.data);
    setContent(response.data)
  }
  function TrackImage(event) {
    const file = event.target.files[0];
    setTrack(file);
    console.log(file);
  }
  return (
    <div className="d-flex flex-column align-items-center text-light justify-content-center p-3 bg-dark">
      <div>Upload File</div>

      <input
        type="file"
        accept="image/*"
        className="d-block"
        onChange={TrackImage}
      />

      <div>
        <button className="btn btn-sm mb-4 mt-3 btn-primary" onClick={UploadImage}>
          Send
        </button>
      </div>
      <div className="p-3">
        <img src={url} alt="" width="auto" height="200px" />
      </div>
      <div> The Image is at {content}</div>
 <div className="mt-5">

      <p>The Image is </p>
      <img src={content} alt="" height="400px" width="auto" />
 </div>

    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import '../assets/dictionary.css';
function ImageSearch(){

    const [imageFile, setImageFile] = useState(null);
    const canvasRef = useRef(null);

    // Rectangle coordinates and label/score data
    const [rectangleData, setRectangleData] = useState({
      xmin: 0,
      xmax: 0,
      ymin: 0,
      ymax: 0,
      label: "",
      score: ""
    });
    
    const [rectangles, setRectangles] = useState([]);

    const hugface_token = "log in to hugging face to get the api key";
    const blip_url = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base";
    const dert_url = "https://api-inference.huggingface.co/models/facebook/detr-resnet-50";
    const [result, setResult] = React.useState();
    const [image2text, setImage2text] =React.useState([]);
    const [imageObject,setImageObject] = React.useState();
    const [imageDescription, setImageDescription] = useState('');



    useEffect( () => {
      if (imageFile) {

        if (image2text.length > 0) {
            setImageDescription(image2text[0].generated_text);
        }

        //let imgJsonObject = JSON.parse(JSON.stringify(imageObject));
        
        const ctx = canvasRef.current.getContext('2d');
        const img = new Image();
        img.onload = function () {
          // Adjust canvas size to the image size
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
          window.devicePixelRatio=2;      //Clear Text 
          // Draw the image
          ctx.drawImage(img, 0, 0, img.width, img.height);
  

          // Draw each rectangle
          if(rectangles.length === 0)
          {
            //if the service cannot recognize the objects in the img
          }
          else
          {
            rectangles.forEach((rectData) => {
                ctx.beginPath();
                ctx.rect(
                rectData.box.xmin,
                rectData.box.ymin,
                rectData.box.xmax - rectData.box.xmin,
                rectData.box.ymax - rectData.box.ymin
                );
                ctx.strokeStyle = 'red';
                ctx.stroke();

                // Draw the label and score
                const labelX = rectData.box.xmax - 20; // Adjust as needed
                const labelY = rectData.box.ymin + 20; // Adjust as needed
                ctx.font = '8px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText(`Label: ${rectData.label}`, labelX, labelY);
                ctx.fillText(`Score: ${rectData.score.toFixed(2)}`, labelX, labelY + 10);
            });
            }
        };
        img.src = URL.createObjectURL(imageFile);
      }
    }, [imageFile, rectangles]);
  
    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        const imageFile = event.target.files[0];

        console.log("After image upload")
        // var formData = new FormData();
        // formData.append('image', imageFile);
        fetch(blip_url, {
          method: "POST",
          headers: {"Authorization": `Bearer ${hugface_token}`},
          body: imageFile
          }).then(res => res.json()).then(json => setImage2text(json));

          //let jsonObject = JSON.parse(JSON.stringify(image2text));
              // Access the imageDescription property
          //setImageDescription(jsonObject.imageDescription);


        fetch(dert_url, {
            method: "POST",
            headers: {"Authorization": `Bearer ${hugface_token}`},
            body: imageFile
            }).then(res => res.json()).then(json => setRectangles(json));


        setImageFile(imageFile);
        setRectangles([]);// Clear previous rectangles
        console.log("end of image service");
      }
    };
    

    return (
    <div class="dict-wrapper">
    <div class="img-container">
        <div class="search-img">
            <input type="file" id="img-btn" style={{ display: 'none' }}  onChange={onImageChange} accept="image/*" />
            <label htmlFor="img-btn" className="custom-file-input">Upload Image</label>
        </div>
        {image2text && (
        <p className="word-meaning">
          {/* {JSON.stringify(image2text)} */}
          {imageDescription}
        </p>
        )}
        {/* <p className="word-meaning">
        {JSON.stringify(imageObject)}
        </p> */}
        <canvas ref={canvasRef} style={{ border: '1px solid black' }}></canvas> 
    </div>
    </div>
  );
}

export default ImageSearch;

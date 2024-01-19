import React, { useState, useRef, useEffect } from 'react';
import '../assets/dictionary.css';
// import firedb from '../context/FirestoreService';
import { doc, setDoc } from "firebase/firestore"; 
// add data to firestore method 
//import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase";
function BasicSearch(){
    const [wordInfo, setWordInfo] = useState(null);

    const [inpWord, setInpWord] = useState(null);

    const [result, setResult] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [error, setError] = useState('');
    const [saveMsg, setSaveMsg] = useState('Save');
    const nlp_url = "http://127.0.0.1:5000/nlp";

    // click the search button, get service json.
    const handleSearch = () => {
      // console.log(JSON.stringify(inpWord));
      fetch(nlp_url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(inpWord)
      }).then(res => res.json())
        .then((wordData) => {
          if (wordData) {
            // console.log(wordData);
            setWordInfo(wordData);
          } else {
            throw new Error('No results found');
          }})
        .catch(() => {
          setError("Couldn't Find The Word!");
          setResult('');
      });
    };

    const handleSave = async () => {
      if (wordInfo) {
        console.log(wordInfo);
        await setDoc(doc(db, "wordlist",wordInfo.word), wordInfo).then(() => {
          alert(`${wordInfo.word} is successfully added to the menu.`)
          //handleModalClose();
          //window.location.reload(false);
        }).catch((e) => {
            alert("Error occured: " + e.message);
            //setIsLoading(false);
        });

        setSaveMsg('Saved!');
        // setWord('');
        setResult('');
        //setWordInfo(null); //clean up the previous word info.
      }
    };


    
    const playSound = () => {
        new Audio(audioUrl).play();
      };

    return (
    <div class="dict-wrapper">
    <div class="container">
        <div class="search-box">
            <input type="text" placeholder="Type the word here..." id="inp-word" onChange={(e) => setInpWord({ "word":e.target.value})} />
            <button id="search-btn" onClick={handleSearch}>Search</button>
        </div >
        
        {error && <h3 className="error">{error}</h3>}
        {wordInfo && <div class="result">
          <h3>{wordInfo.word} 
              <button class="save-btn" onClick={handleSave}>{saveMsg}</button>
          </h3>
          {wordInfo.parts_of_speech.map((part, index) => (
            <div key={index}>
              <h4>{index} . {part.type}</h4>
              <p className='word-meaning'>{part.definitions.map((def, defIndex) => (
                <p key={defIndex}>{def.definition}</p>
              ))}</p>
              <div className=''>
                {part.synonyms.length > 0 &&<p><i>Synonyms:  </i> {part.synonyms.join(", ")}  </p>}
                {part.antonyms.length > 0 && <p><i>Antonyms:  </i> {part.antonyms.join(", ")} </p>}
                {part.hypernyms.length >0 && <p><i>Hypernyms:  </i>{part.hypernyms.join(", ")} </p>}
                {part.hyponyms.length > 0 && <p><i>Hyponyms:  </i>{part.hyponyms.join(", ")} </p>}
                {/* Add more fields as necessary  */}
              </div>
            </div>
          ))}
        </div>}
      </div>

    <ul>
    </ul>


    </div>
  );
}

export default BasicSearch;

import React, { useState, useEffect } from 'react';
import '../assets/wordlist.css'; // Make sure to create a WordList.css file for styling
import { collection,doc, getDocs,deleteDoc } from "firebase/firestore";
import { db } from "../firebase";


const WordList = () => {

  const [wordlist, setWordlist] = useState({});

  useEffect(() => {
    // Assuming fetchDocuments is a function that fetches your querySnapshot
    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, "wordlist"));
      const docsMap = {};
      querySnapshot.forEach(doc => {
        docsMap[doc.id] = doc.data();
      });
      setWordlist(docsMap);
    };

    fetchDocuments();
  }, []); // Empty dependency array to run only on component mount

  const [activeId, setActiveId] = useState(null);
  const [result, setResult] = useState('');
  const toggleDetails = (id) => {
    setActiveId(activeId === id ? null : id);
  };


  const handleSearch = () => {
    console.log("This is Story card");
    setResult("hello world !!! JYU rocks");
  }

  
  const handleDelWordInfo = async (wordid) => {
    if(wordid){
      await deleteDoc(doc(db, "wordlist", wordid));
      const fetchDocuments = async () => {
        const querySnapshot = await getDocs(collection(db, "wordlist"));
        const docsMap = {};
        querySnapshot.forEach(doc => {
          docsMap[doc.id] = doc.data();
        });
        setWordlist(docsMap);
      };
      fetchDocuments();
    }
   
  }

  return (
    <div className="word-list">
      { wordlist && Object.entries(wordlist).map( ([wordId, wordInfo])=>(
        <div key={wordId} className="word-entry">
          {wordInfo && <div className='word-info'>
            <div className="word-term" onClick={() => toggleDetails(wordId)}>
              {wordInfo.word} 
            </div>
            {activeId === wordId && (
              <div className="word-detail">
                <button class="del-btn" onClick={() => handleDelWordInfo(wordId)}>delete</button>
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
              </div>
            )} 
            </div>}
        </div>
      ))
      }
        <div class="create-box">
            <button id="create-btn" onClick={handleSearch}>Create Story</button>
        </div>

        <div id="result" className="result">
          <div className="details">
            <p>{result}</p>
        </div>

        </div>
    </div>
  );
};

export default WordList;

import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 

function getAllWord(){
    return new Promise((resolve, reject) => {
        db.collection("wordlist").get().then((allWordlist) => {
            resolve(allWordlist);
        }).catch((e) => {
            reject(e);
        })
    })
}
function delWord(wordId) {
    return new Promise((resolve, reject) => {
        db.collection("wordlist").doc(wordId).delete().then(() => {
            resolve()
        }).catch((e) => {
            reject(e)
        })
    })
}



function addNewWord(wordInfo) {
    return new Promise((resolve, reject) => {
        // const data = wordInfo
        // db.collection("wordlist").add(data).then((docRef) => {
        //     resolve(docRef);
        // }).catch((e) => {
        //     reject(e);
        // })
        setDoc(doc(db, "wordlist",wordInfo.word), wordInfo).then((docRef) => {
            resolve(docRef);
          }).catch((e) => {
            reject(e);
          });
    })
}

// function UpateMenuItem(menuItemID, itemName, itemCategory, itemPrice) {

//     return new Promise((resolve, reject) => {

//         const data = {
//             "itemName": itemName,
//             "itemCategory": itemCategory,
//             "itemPrice": parseFloat(itemPrice)
//         }

//         db.collection("MenuItems").doc(menuItemID).update(data).then(() => {
//             resolve()
//         }).catch((e) => {
//             reject(e)
//         })
//     })
// }



export default { getAllWord, delWord, addNewWord }
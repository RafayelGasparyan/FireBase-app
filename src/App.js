import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';

// const UseDebounc = (value,delay) => {
//   const [debounceValue,setDebounceValue] = useState(value)
//   useEffect(()=>{
//     const handler = setTimeout(() =>{
//       setDebounceValue(value)
//     },500);
//     return () => {
//       clearTimeout(handler)
//     }
//   },[value,delay])
//   return debounceValue
  
// }

// function App() {
//   const [text,setText] = useState('')
//   const debounceText = UseDebounc(text)
//   return (
//     <div className="App">
//       <form onSubmit={(e)=>{
//         e.preventDefault()
//       }}>
//         <input type='text'
//           value={text}
//           onChange={(e)=> setText(e.target.value)}
//         />
//         <button>ok</button>
//       </form>
//       <span>{debounceText}</span>
//     </div>
//   );
// }

// export default App;

// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';

// function App(){
//   const  clickMe = () => {
//     toast.success('🦄 Wow so easy!', {
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       });
      
      
//   }
//   return (
//     <>

//       <button onClick={clickMe}>click me</button>
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </>
//   )
// }

//  export default App;

import { Auth } from './components/Auth';
import { db,auth ,storage} from './config/firebase';
import { getDocs ,collection, addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore';
import { async } from '@firebase/util';
import { ref,uploadBytes } from 'firebase/storage';

function App(){
  const [movieList,setMovieList] = useState([]);
  const movieColectionRef = collection(db,"movies");
  const [newMovieTittle,setMovieTittle] = useState("");
  const [newReleaseData,setReleaseData] = useState(0);
  const [isNewMovieOscar,setIsNewMovieOscar] = useState(false);
  const [udateTittle,setUpdateTittle] = useState("");
  const [fileUpload,setFileUpload] = useState(null)

  
    const getMovieList = async () => {
      try{
      const data = await getDocs(movieColectionRef)
      const filteredData = data.docs.map((doc)=> ({
        ...doc.data(),
        id:doc.id
      }))
      setMovieList(filteredData)
      }catch(err){
        console.error(err)
      }
    }
   
  useEffect(()=>{
    getMovieList()
  },[])

  const onSubmitMovie = async () => {
  
    try {
      await addDoc(movieColectionRef,{
        tittle:newMovieTittle,
        realeaseDate:newReleaseData,
        receivedAnOscar:isNewMovieOscar,
      })
      getMovieList()
    } catch (error) {
      console.error(error)
    }
  
  }

  const onDeletedMovie =  async (id) => {
    const movieDoc = doc(db,"movies",id)
    await deleteDoc(movieDoc)
  }

  const updateTittle = async (id) => {
    const movieDoc = doc(db,"movies",id)
    await updateDoc(movieDoc,{tittle:udateTittle})
  }

  const UpLoadFile = async () => {
    if(!fileUpload) return;
    const filesRef =  ref(storage,`projectFiles/${fileUpload.name}`)
    try {
      await uploadBytes(filesRef,fileUpload)
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <>
    <div>
      <Auth/>
      <div>
        <input placeholder='Movie Tittle....' onChange={(e)=>setMovieTittle(e.target.value)}/>
        <input placeholder='Release Data...' type='number' onChange={(e)=> setReleaseData(Number(e.target.value))}/>
        <input type='checkbox' checked={isNewMovieOscar} onChange={(e)=> setIsNewMovieOscar(e.target.checked)}/>
        <label>Received in Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
        
      </div>
        <div>
            {movieList.map((movie)=> (
              <div key={movie.id}>
                <h1>{movie.tittle}</h1>
                <p>{movie.realeaseDate}</p>
                <button onClick={()=>onDeletedMovie(movie.id)}>DeletedMovie</button>
                <input placeholder='new tittle' onChange={(e)=>setUpdateTittle(e.target.value)}/>
                <button onClick={()=>updateTittle(movie.id)}>Update</button>
              </div>
            ))}
        </div>
        <div>
          <input type='file' onChange={(e)=>setFileUpload(e.target.files[0])}/>
          <button onClick={UpLoadFile}>addFile</button>
        </div>
      </div>
    </>
  )
}
export default App;
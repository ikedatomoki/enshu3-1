import {useEffect, useState} from "react";
import {fetchImages} from "./api";

function Header() {
    return (
      <header className="hero is-primary is-small">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Fantastic Amiibo Images</h1>
            <h2>日本大学文理学部情報科学科 Webプログラミングの演習課題</h2>
            <h3>5421021　池田知樹</h3>
          </div>
        </div>
      </header>
    );
  }
  
function Image(props){
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img src={props.src} alt="Amiibo!" />
          </figure>
        </div>
      </div>
    );
  }

  function Loading() {
    return <p>Loading...</p>;
  }
  
  function Gallery(props){
    const{urls}=props;
    if(urls==null){
        return <Loading />;
    }
    return (
      <div className="columns is-vcentered is-multiline">
        {urls.map((url) => {
            return (
             <div key={url.image} className="column is-3">
                <Image src={url.image} />
             </div>
            );
         })}
      </div>
    );
  }
  

    function Form(props) {
      function handleSubmit(event) {
        event.preventDefault();
        const { breed } = event.target.elements;
        props.onFormSubmit(breed.value);
      }
       return (
         <div>
          <form onSubmit={handleSubmit}>
             <div className="field has-addons">
               <div className="control is-expanded">
                 <div className="select is-fullwidth">
                   <select name="breed" defaultValue="mario">
                     <option value="mario">Mario</option>
                     <option value="zelda">Zelda</option>
                     <option value="link">Link</option>
                     <option value="luigi">Luigi</option>
                     <option value="captain falcon">Captain Falcon</option>
                     <option value="marth">Marth</option>
                     <option value="mewtwo">Mewtwo</option>
                     <option value="roy">Roy</option>
                     <option value="pit">Pit</option>
                     <option value="snake">Snake</option>
                   </select>
                 </div>
               </div>
               <div className="control">
                 <button type="submit" className="button is-success">
                   Search                 
                 </button>
               </div>
             </div>
           </form>
         </div>
       );
     }
    
     function Main() {
        const [urls, setUrls] = useState(null);
        useEffect(() => {
          fetchImages("mario").then((urls) => {
            setUrls(urls);
          });
        }, []);
       function reloadImages(breed) {
         fetchImages(breed).then((urls) => {
           setUrls(urls);
         });
       }
        return (
          <main>
            <section className="section">
              <div className="container">

              <Form onFormSubmit={reloadImages} />
              </div>
            </section>
            <section className="section">
              <div className="container">
                <Gallery urls={urls} />
              </div>
            </section>
          </main>
        );
      }
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Amiibo images are retrieved from Amiibo API</p>
          <p>
            <a href="https://amiiboapi.com/">Donate to Amiibo API</a>
          </p>
        </div>
      </footer>
    );
  }
  
  function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
  
  export default App;
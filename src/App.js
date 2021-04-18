import Header from './templates/Header';
import MenuBar from './templates/MenuBar'

function App(){
  return(
      <div>
        <Header />
        <div className="row">
          <MenuBar />
          <div>Hari</div>
        </div>
      </div>
  );
}

export default App;
import { GalleryProvider } from './context/GalleryContext';

import UploaderForm from './components/UploaderForm/UploaderForm';
import PhotoGallery from './components/PhotoGallery/PhotoGallery';

function App() {
  return (
      <div className="App">
          <GalleryProvider>
              <UploaderForm />
              <PhotoGallery />
          </GalleryProvider>
      </div>
  );
}

export default App;

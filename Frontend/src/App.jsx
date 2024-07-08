
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';
import { FiUpload, FiLink } from 'react-icons/fi';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        try {
          setUploading(true);
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);
          const response = await uploadFile(data);
          if (response && response.path) {
            setResult(response.path);
          } else {
            console.error('Error: Invalid response from server');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        } finally {
          setUploading(false);
        }
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="main-wrapper">
      <div className="overlay"></div>
      <div className="main-content">
        <div className="container bg-white bg-opacity-80 p-10 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-4xl font-bold mb-7 text-center">IIT Jammu File Sharing</h1>
          <h2 className="text-center mb-7">Upload and share files securely</h2>
          <div className="text-center">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && <p className="mt-2 text-sm">{file.name}</p>}
          </div>
          {result && (
            <div className="mt-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Download Link</h2>
              <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
                <a
                  href={result}
                  download
                  className="text-blue-500 hover:underline truncate flex-grow text-left"
                >
                  {result}
                </a>
                <FiLink className="text-gray-500 ml-2 flex-shrink-0" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

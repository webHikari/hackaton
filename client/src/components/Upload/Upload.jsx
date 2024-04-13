import { useState, useRef, useEffect } from 'react';
import CSVReader from 'react-csv-reader';

import styles from './Upload.module.css';

import URL from '../../config/URL.jsx'

export default function Upload() {
  // State variables
  const [uploading, setUploading] = useState(false); // State to track if uploading is in progress
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [uploadStatus, setUploadStatus] = useState(''); // State to hold upload status message

  // Ref for file input element
  const fileInputRef = useRef(null);

  // Function to handle file selection from input
  const handleFileChange = (data, fileInfo) => {
    // File data is available in 'data' variable
    console.log('Parsed CSV data:', data);
    console.log('File info:', fileInfo);
    handleUpload(data);
  };

  // Function to handle file upload
  const handleUpload = async (fileData) => {
    setUploading(true); // Set uploading to true

    try {
      // Perform file upload operation here, using 'fileData'
      // Replace '/upload' with the actual upload endpoint
      const response = await fetch('https://e21b-109-252-191-215.ngrok-free.app/predict/', {
        method: 'POST',
        body: JSON.stringify(fileData), // Send parsed CSV data as JSON
        headers: {
          'Content-Type': 'application/json'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });
      console.log(response);
      if (response.ok) {
        setUploadStatus('Upload success');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload failed', error);
      setUploadStatus('Upload failed');
    } finally {
      setUploading(false); // Reset uploading to false
    }
  };

  // Function to open file dialog on click
  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  // Render component
  return (
    <div
      onClick={openFileDialog}
      onDrop={(e) => {
        e.preventDefault();
        handleFileChange(e.dataTransfer.files[0]);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={styles.Upload}
    >
      <p>Click or Drag & Drop to Select File</p>
      {uploading && <p>Uploading... {uploadProgress}%</p>}
      {uploadStatus && <p>{uploadStatus}</p>}
      <CSVReader 

        onFileLoaded={handleFileChange}
        ref={fileInputRef}
        parserOptions={{
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
        }}
      />
    </div>
  );
}

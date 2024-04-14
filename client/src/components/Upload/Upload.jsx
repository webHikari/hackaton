import { useState, useRef } from 'react';

import styles from './Upload.module.css';

export default function Upload() {
  // State variables
  const [uploading, setUploading] = useState(false); // State to track if uploading is in progress
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [uploadStatus, setUploadStatus] = useState(''); // State to hold upload status message

  // Ref for file input element
  const fileInputRef = useRef(null);

  // Function to handle file selection from input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleUpload(file);
  };

  // Function to handle file upload
  const handleUpload = async (file) => {
    setUploading(true); // Set uploading to true

    try {
      const formData = new FormData();
      formData.append('file', file); // Append the file to FormData

      const response = await fetch("http://62.113.115.130:8000/predict/", {
        method: 'POST',
        body: formData, // Send FormData containing the file
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });

      if (response.ok) {
        setUploadStatus('Upload success');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.csv'; // Имя файла, который будет загружен
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
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
        handleFileChange(e);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={styles.Upload}
    >
      <p>Click or Drag & Drop to Select File</p>
      {uploading && <p>Uploading... {uploadProgress}%</p>}
      {uploadStatus && <p>{uploadStatus}</p>}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}

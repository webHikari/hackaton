import { useState, useRef, useEffect } from 'react';

import styles from './Upload.module.css';

export default function Upload() {
  // State variables
  const [file, setFile] = useState(null); // 1. File state to hold the selected file
  const [uploading, setUploading] = useState(false); // 2. State to track if uploading is in progress
  const [uploadProgress, setUploadProgress] = useState(0); // 3. State to track upload progress
  const [uploadStatus, setUploadStatus] = useState(''); // 4. State to hold upload status message

  // Ref for file input element
  const fileInputRef = useRef(null);

  // Effect to trigger upload when file state changes
  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  // Function to handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFile(droppedFiles[0]);
  };

  // Function to handle file selection from input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('No file selected');
      return;
    }

    setUploading(true); // Set uploading to true

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });

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
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={openFileDialog}
      className={styles.Upload}
    >
      <p>Drag & Drop or Click to Select File</p>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {uploading && <p>Uploading... {uploadProgress}%</p>}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

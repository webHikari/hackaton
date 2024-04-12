import {useState} from 'react'

export default function Upload() {
  // 1. Create states for store file and progress of upload
  const [files, setFiles] = useState([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('') 
  // 2. Put dropped files on state
  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(droppedFiles)
  } 
  
  const handleUpload = async () => {
    try {

      // 3. Send data to endpoint
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
          setUploadProgress(progress) 
        }, 
      });

      // 4. TODO Response checker 
      if (response.ok) setUploadStatus('Upload success')
      else throw new Error('Upload failed')

    } catch (error) {
      console.log('Upload failed', error)
      setUploadStatus('Upload fauled')
    }
  }

  // 5. TODO Upload cancel logic
  const handleCancelUpload = () => {
    //
    //
    //
  }

  return (
    <div 
    onDrop={handleDrop} 
    onDragOver={e => e.preventDefault()}
    style={{border: '2px dashed #ccc', padding: '20px', textAlign: 'center'}}
    >
      <h2>Drag & Drop</h2>
      <div>
        <p>Selected Files:</p>
        <ul>
          {files.map(file => (<li key={file.name}>{file.name}</li>))}
        </ul>
        <button onClick={handleUpload}>Upload</button>
        <button onClick={handleCancelUpload}>Cancel</button>
        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    
    </div>
  );
}

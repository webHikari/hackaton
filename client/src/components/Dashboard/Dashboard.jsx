import styles from './Dashboard.module.css';

import Upload from '../Upload/Upload.jsx'

export default function Dashboard(username) {
   return (
    <>
      <h1>Dashboard page</h1>
      <Upload/>
    </> 
  );
}

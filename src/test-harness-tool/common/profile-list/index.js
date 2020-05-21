import React from 'react';
import { useHistory } from 'react-router-dom'
import styles from './profile-list.scss'
	

function ProfileList() {
  const history = useHistory();
  
  function logout() {
	  localStorage.removeItem('logged');
	  localStorage.removeItem('date');
	  history.push({
		pathname: '/login',
	  })
  }
  
  return (
   <div className={styles.profileList}>
	<div><span>Welcome,</span> <i>Rob</i> <span className={styles.logout} href="#" onClick={logout}>(Logout)</span></div>
	<div><span>Logged in</span> <i>{localStorage.getItem('date')}</i></div>
   </div>
  );
}

export default ProfileList;

import React from 'react';

const UserCard = ({ user }) => {
  return(
    <div class="user-card">
      <div class="user-card-inner">

        <div class="user-card-front">
          <h2>{user.name}</h2>
          <p>Hover Over Me</p>
        </div>

        <div class="user-card-back">
          <p className="email">Email</p>
          <p>{user.email}</p> 
          <p className="password">Password</p>
          <p>{user.password}</p>
        </div>
        
      </div> 
    </div>
  );
}

export default UserCard;
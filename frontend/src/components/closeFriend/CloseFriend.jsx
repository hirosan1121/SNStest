import React from 'react'

export default function CloseFriend({user}) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
        <img src={PUBLIC_FOLDER + user.profilePicture} alt="" className="sidebarFriendimg" />
        <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}

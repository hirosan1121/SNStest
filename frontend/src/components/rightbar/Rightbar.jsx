import React from 'react'
import "./Rightbar.css"
import {Users} from "../../dummyData"
import Online from '../online/Online.jsx'

export default function Rightbar({user}) {
  
  const HomeRightbar = () => {
    
    return(
      <>
          <div className="eventContainer">
            <img src="assets/star.png" alt="" className='starImg'/>
            <span className="eventText">
              <b>フォロワー限定</b>イベント開催中！
            </span>
          </div>
          <img src="assets/event.jpeg" alt="" className='eventImg'/>
          <h4 className="rightbarTitle">オンラインの友達</h4>
          <ul className="rightbarFriendList">
            {Users.map((user) =>(
              <Online user={user} key={user.id}/>
            ))}
          </ul>
          <p className="promotionTitle">プロモーション広告</p>
          <img src="assets/promotion/promotion1.jpeg" alt="" className='rightbarPromotionImg'/>
          <p className='promotionName'>ショッピング</p>
          <img src="assets/promotion/promotion2.jpeg" alt="" className='rightbarPromotionImg'/>
          <p className='promotionName'>カーショップ</p>
          <img src="assets/promotion/promotion3.jpeg" alt="" className='rightbarPromotionImg'/>
          <p className='promotionName'>ShinCode株式会社</p>
      </>
    )
  }

  const ProfileRightbar = () =>{
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return(
      <>
        <h4 className="rightbarTitle">ユーザー情報</h4>
        <div className="rigtbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">出身：</span>
            <span className="rightbarInfoKey">福岡</span>
          </div>
          <h4 className="rightbarTitle">あなたの友達</h4>
          <div className="rightbarFollowings">
            <div className="rightbarFollowing">
              <img src={PUBLIC_FOLDER+"/person/1.jpeg"} alt="" className='rightbarFollowingImg'/>
              <span className="rihgtbarFollowingName">Shin Code</span>
            </div>
            <div className="rightbarFollowing">
              <img src={PUBLIC_FOLDER+"/person/2.jpeg"} alt="" className='rightbarFollowingImg'/>
              <span className="rihgtbarFollowingName">Yamaki</span>
            </div>
            <div className="rightbarFollowing">
              <img src={PUBLIC_FOLDER+"/person/3.jpeg"} alt="" className='rightbarFollowingImg'/>
              <span className="rihgtbarFollowingName">Koga</span>
            </div>
            <div className="rightbarFollowing">
              <img src={PUBLIC_FOLDER+"/person/4.jpeg"} alt="" className='rightbarFollowingImg'/>
              <span className="rihgtbarFollowingName">Matsukubo</span>
            </div>
            <div className="rightbarFollowing">
              <img src={PUBLIC_FOLDER+"/person/5.jpeg"} alt="" className='rightbarFollowingImg'/>
              <span className="rihgtbarFollowingName">Kikukawa</span>
            </div>
          </div>
        </div>
      </>
    )
  }
  return( 
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

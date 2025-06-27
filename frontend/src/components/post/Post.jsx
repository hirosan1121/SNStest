import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { MoreVert } from "@mui/icons-material";
//import {Users} from "../../dummyData"
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

export default function Post({ post }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [like, setLike] = useState(post.likes ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?userId=${post.userId}`);
      //console.log(response);
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);

  const handleLike = async () => {
    try {
      //いいねのAPIを叩いていく
      await axios.put(`/posts/${post.id}/like`, { userId: currentUser.id });
    } catch (err) {
      console.log(err);
    }

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-100% shadow-glow rounded-lg my-2">
      <div className="p-3">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={PUBLIC_FOLDER + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={PUBLIC_FOLDER + "/heart.png"}
              alt=""
              className="likeIcon"
              onClick={() => handleLike()}
            />
            <span className="postLikeCounter">
              {like}人がいいねを押しました
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postLikeCounter">{post.comment}:コメント</span>
          </div>
        </div>
      </div>
    </div>
  );
}

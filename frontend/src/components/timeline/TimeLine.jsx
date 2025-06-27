import React, { useContext, useEffect, useState } from "react";
import "./TimeLine.css";
import Share from "../share/Share";
import Post from "../post/Post";
// import {Posts} from "../../dummyData"
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

export default function TimeLine({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = username
          ? await axios.get(`/posts/profile/${username}`) //プロフィールの場合
          : await axios.get(`/posts/timeline/${user.id}`); // _id → id に修正
        //console.log(response);
        setPosts(
          Array.isArray(response.data)
            ? response.data.sort(
                (post1, post2) =>
                  new Date(post2.createdAt) - new Date(post1.createdAt)
              )
            : []
        );
      } catch (err) {
        setPosts([]); // エラー時は空配列
        console.error(err);
      }
    };
    fetchPosts();
  }, [username, user.id]); // _id → id に修正

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}

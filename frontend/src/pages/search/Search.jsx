import React, { useState } from "react";
import { Home } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [viewType, setViewType] = useState("posts");
  const [postResults, setPostResults] = useState([]);
  const [userResults, setUserResults] = useState([]);

  const handleChange = (e) => setQuery(e.target.value);

  useEffect(() => {
    if (!query) {
      setPostResults([]);
      setUserResults([]);
      return;
    }
    if (viewType === "posts") {
      axios
        .get(`/api/search/posts?query=${encodeURIComponent(query)}`)
        .then((res) => setPostResults(res.data))
        .catch(() => setPostResults([]));
    } else {
      axios
        .get(`/api/search/users?query=${encodeURIComponent(query)}`)
        .then((res) => setUserResults(res.data))
        .catch(() => setUserResults([]));
    }
  }, [query, viewType]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f2f5" }}>
      {/* サイドバー */}
      <div
        className="sidebar"
        style={{
          flex: 2.5,
          height: "100vh",
          background: "#fff",
          boxShadow: "0px 0px 14px -5px #4c4965",
        }}
      >
        <div className="sidebarWrpper" style={{ padding: 20 }}>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Home className="sidebarIcon" />
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <span className="sidebarListItemText">ホーム</span>
              </Link>
            </li>
            {/* 必要に応じて他の遷移ボタンも追加 */}
          </ul>
        </div>
      </div>
      {/* メインコンテンツ */}
      <div style={{ flex: 7.5, padding: "2rem" }}>
        <h2>検索</h2>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="ユーザー名や投稿内容で検索"
          style={{ width: "300px", padding: "8px" }}
        />
        <div style={{ margin: "1rem 0" }}>
          <button
            onClick={() => setViewType("posts")}
            style={{
              marginRight: "1rem",
              padding: "8px 16px",
              background: viewType === "posts" ? "#2c517c" : "#eee",
              color: viewType === "posts" ? "#fff" : "#333",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            投稿
          </button>
          <button
            onClick={() => setViewType("users")}
            style={{
              padding: "8px 16px",
              background: viewType === "users" ? "#2c517c" : "#eee",
              color: viewType === "users" ? "#fff" : "#333",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ユーザー
          </button>
        </div>
      </div>
    </div>
  );
}

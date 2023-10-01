import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import NewsPage from "./news";
import Home from "./home";
import AuthPage from "./auth";
import Users from "./users";
import GroupsPage from "./groups";
import GroupPage from "./group";
import UserAlbum from "./userAlbum";
import FriendsPage from "./friends";

const Routing: FC = () => {
  
  return (
    <Routes >
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<NewsPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/groups" element={<GroupsPage />} />
      <Route path="/groups/:groupName" element={<GroupPage />} />
      <Route path="/userAlbum/:userId" element={<UserAlbum />} />
      <Route path="/friends" element={<FriendsPage />} />
    </Routes>
  )
}

export default Routing;
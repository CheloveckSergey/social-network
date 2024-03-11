import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
// import NewsPage from "./news";
import Home from "./home";
import AuthPage from "./auth";
import Users from "./users";
import GroupsPage from "./groups";
import GroupPage from "./group";
// import UserAlbum from "./userAlbum";
import FriendsPage from "./friends";
import UserPage from "./user";
import { RoomPage } from "./room";
import { RoomsPage } from "./rooms";
import Album from "./userAlbum";
import { MusicPage } from "./myMusic/indes";
import { ArtistPage } from "./artist";

const Routing: FC = () => {
  
  return (
    <Routes >
      <Route path="/auth" element={<AuthPage />} />
      {/* <Route path="/" element={<NewsPage />} /> */}
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/groups" element={<GroupsPage />} />
      <Route path="/groups/:id" element={<GroupPage />} />
      <Route path="/album/:authorId" element={<Album />} />
      <Route path="/friends" element={<FriendsPage />} />
      <Route path="/user/:userId" element={<UserPage />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/music" element={<MusicPage />} />
      <Route path="/artist/:artistId" element={<ArtistPage />} />
    </Routes>
  )
}

export default Routing;
import { FC } from "react";
import { Link } from 'react-router-dom';
import { BiNews, BiSolidMessageSquare, BiSolidImageAlt } from 'react-icons/bi';
import { BsPersonFill, BsMusicNoteBeamed } from 'react-icons/bs';
import { FaUserFriends, FaUserSecret } from 'react-icons/fa';
import { CgCommunity } from 'react-icons/cg';
import "./styles.scss";
import { useAppSelector } from "../../app/store";

const LeftMenu: FC = () => {

  const { messages } = useAppSelector(state => state.messages);

  return (
    <div className="left-menu">
      <Link to="/home" >
        <BsPersonFill size={20}/>
        <h3 className="menu">Home</h3>
      </Link>
      <Link to="/" >
        <BiNews size={20}/>
        <h3 className="menu">Feed</h3>
      </Link>
      <Link to="/friends" >
        <FaUserFriends size={20}/>
        <h3 className="menu">Friends</h3>
      </Link>
      <Link to="/rooms" >
        <BiSolidMessageSquare size={20}/>
        <h3 className="menu">Messages</h3>
        <span className="number">{messages.length}</span>
      </Link>
      <Link to="/groups" >
        <CgCommunity size={20}/>
        <h3 className="menu">Communities</h3>
      </Link>
      <Link to="/images" >
        <BiSolidImageAlt size={20}/>
        <h3 className="menu">Images</h3>
      </Link>
      <Link to="/music" >
        <BsMusicNoteBeamed size={20}/>
        <h3 className="menu">Music</h3>
      </Link>
      <Link to="/users" >
        <FaUserSecret size={20}/>
        <h3 className="menu">Users</h3>
      </Link>
      {/* <Link to="/feed" >Feed</Link>
      <Link to="/messages" >Messages</Link>
      <Link to="/friends" >Friends</Link>
      <Link to="/communities" >Communities</Link>
      <Link to="/images" >Images</Link>
      <Link to="/music" >Music</Link> */}
    </div>
  )
}

export default LeftMenu;
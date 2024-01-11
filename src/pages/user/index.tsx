import { FC, useState } from "react";
import './styles.scss';
import Upbar from "../../widgets/upbar";
import LeftMenu from "../../widgets/leftMenu";
import { UserAvatar } from "./userAvatar";
import { Info } from "./userInfo";
import { UserImages } from "./userImages";
import { UserFeed } from "./userFeed";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { OneUser, UserApi } from "../../entities/user";

//Эта страница недоступна пока что
const UserPage: FC = () => {

  // const [user, setUser] = useState<OneUser>();

  // const { userId } = useParams();

  
  // const { data, isLoading, isError } = useQuery(
  //   ['loadOneUser', userId],
  //   () => {
  //     return UserApi.getOneUserById(Number(userId));
  //   },
  //   {
  //     onSuccess: data => {
  //       setUser(data);
  //     }
  //   }
  // );

  // function setIsFriend(isFriend: boolean) {
  //   if (user) {
  //     setUser({...user, isFriend})
  //   }
  // }

  // if (!user) {
  //   return (
  //     <div>
  //       Sorry, bro. No user.
  //     </div>
  //   )
  // }

  // return (
  //   <>
  //     <Upbar />
  //     <main>
  //       <LeftMenu />
  //       <div className="home">
  //         <div className="home-extra">
  //           <UserAvatar user={user} setIsFriend={setIsFriend} />
  //         </div>
  //         <div className="home-main">
  //           <Info user={user} />
  //           {/* <UserImages user={user} /> */}
  //           <UserFeed user={user} />
  //         </div>
  //       </div>
  //     </main>
  //   </>
  // )

  return (
    <>
      Временно недоступно, прикол с api getOneUser
    </>
  )
}

export default UserPage;
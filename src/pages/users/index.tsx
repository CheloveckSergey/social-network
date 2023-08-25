import { FC } from "react";
import Upbar from "../../widgets/upbar";
import LeftMenu from "../../widgets/leftMenu";
import './styles.scss';
import { UserApi } from "../../entities/user/api";
import { useQuery } from "react-query";

type OneUser = {
  login: string,
  avatar: string | undefined,
}

const users: OneUser[] = [
  {login: 'Katya', avatar: 'https://krot.info/uploads/posts/2022-01/1642676327_22-krot-info-p-katya-adushkina-art-53.jpg'},
  {login: 'Stew', avatar: 'https://i.ytimg.com/vi/G9o5gxx__J0/maxresdefault.jpg'},
  {login: 'Lois', avatar: 'https://c.wallhere.com/photos/01/a9/Lois_Griffin_Family_Guy_redhead_lingerie_barefoot_feet-112755.jpg!d'},
]

const UserPanel: FC<OneUser> = ({ login, avatar }) => {
  const userAvatar = avatar || 'https://img.myslo.ru/NewsImage/12/9d/129d8003-081f-4e01-84bd-9ef209ca2ce7_3.jpg';

  return (
    <div className="regular-panel one-user-panel">
      <img src={userAvatar} alt="IMG" />
      <h3>{login}</h3>
    </div>
  )
}

const Users: FC = () => {
  const {data, isLoading, isError} = useQuery('getAllUsers', () => UserApi.getAllUsers());
  
  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className="all-users">
          {data?.map((user, index) => (
            <UserPanel 
              key={index}
              login={user.login}
              avatar={user.avatar}
            />
          ))} 
        </div>
      </main>
    </>
  )
}

export default Users;

function reactQuery(arg0: string, arg1: () => Promise<import("axios").AxiosResponse<any, any>>): { data: any; isLoading: any; isError: any; } {
  throw new Error("Function not implemented.");
}

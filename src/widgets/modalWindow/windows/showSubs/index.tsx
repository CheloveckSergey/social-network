import { FC } from "react"
import './styles.scss';
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { Author, AuthorApi } from "../../../../entities/author";
import { OneUser } from "../../../../entities/user";
import { getImageSrc } from "../../../../shared/service/images";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { closeWindow } from "../../model/redux";

interface SIInterface {
  sub: OneUser,
}
const SubItem: FC<SIInterface> = ({ sub }) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div 
      className="sub-item"
      onClick={() => {
        dispatch(closeWindow({}));
        navigate('/user/' + sub.id);
      }}
    >
      <img 
        src={getImageSrc(sub.avatar)} 
        alt="IMG"
        className="sub-img"
      />
      <h4 className="sub-login">{sub.login}</h4>
    </div>
  )
}

interface SLInterface {
  author: Author,
}
const SubList: FC<SLInterface> = ({ author }) => {

  const { data, isLoading, isError } = useQuery(
    ['loadGroupSubs', author.id],
    () => {
      return AuthorApi.getSubsByAuthorId(author.id);
    }
  )

  return (
    <div className="sub-list">
      {data?.map((sub, index) => <SubItem key={index} sub={sub} />)}
    </div>
  )
}

const ShowSubsWindow: FC = () => {

  const { subAuthor } = useAppSelector(state => state.modalWindow);

  if (!subAuthor) {
    return (
      <div className="regular-panel show-subs-window">
        Гавно
      </div>
    )
  }

  return (
    <div className="regular-panel show-subs-window">
      <div className="section header-section">
        <h3>Subs</h3>
        <h3> / </h3>
        <h3 className="author-name">{subAuthor.name}</h3>
      </div>
      <hr/>
      <div className="section subs-section">
        <SubList author={subAuthor} />
      </div>
    </div>
  )
}

export default ShowSubsWindow;
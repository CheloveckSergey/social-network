import React, { FC, useState } from 'react';
import Upbar from '../../widgets/upbar';
import Feed from '../../widgets/feed';
import { Post, PostApi } from '../../entities/post';
import LeftMenu from '../../widgets/leftMenu';
import { useAppSelector } from '../../app/store';
import { useQuery } from 'react-query';
import './styles.scss';

const NewsPage: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const [feed, setFeed] = useState<Post[]>([]);

  const feedStatus = useQuery(
    ['getFeed', user?.id],
    () => {
      if (user) {
        return PostApi.getAllPostsByAuthorId(user.author.id);
      }
    }, {
      onSuccess: (data) => {
        if (data) {
          setFeed(data);
        }
      }
    }
  )
  
  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <div className='news-page'>
          <div className='main'>
            <Feed posts={feed} />
          </div>
        </div>
      </main>
    </>
  )
}

export default NewsPage;
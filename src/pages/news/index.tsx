import React, { FC } from 'react';
import Upbar from '../../widgets/upbar';
import Feed from '../../widgets/feed';
import { Post } from '../../entities/post';
import { Group } from '../../entities/group';
import LeftMenu from '../../widgets/leftMenu';

// const catGroup: Group = {
//   name: "We Love Cats",
//   avatar: "https://e7.pngegg.com/pngimages/470/959/png-clipart-golden-state-warriors-cat-whiskers-ashfur-cat-mammal-animals.png",
//   // subNumber: 123,
// }

// const fakePosts: Post[] = [
//   {
//     author: catGroup,
//     img: "https://i.pinimg.com/originals/1a/af/ba/1aafba692d6b853d6e0a86e9fae74e49.jpg",
//     likeNumber: 64,
//     repostNumber: 15,
//     commentNumber: 3,
//   },
//   {
//     author: catGroup,
//     img: "https://krot.info/uploads/posts/2021-03/1615040223_37-p-antropomorfnie-koshki-art-kartinki-44.png",
//     likeNumber: 34,
//     repostNumber: 5,
//     commentNumber: 10,
//   },
//   {
//     author: catGroup,
//     img: "https://cdnb.artstation.com/p/assets/images/images/018/730/879/large/josip-lovrinovic-190608-staypawsitive-web.jpg?1560485854",
//     likeNumber: 100,
//     repostNumber: 30,
//     commentNumber: 5,
//   },
// ]
const fakePosts: Post[] = [
  // {
  //   author: catGroup,
  //   description: 'Lalalalala',
  //   image: "https://i.pinimg.com/originals/1a/af/ba/1aafba692d6b853d6e0a86e9fae74e49.jpg",
  // },
  // {
  //   author: catGroup,
  //   description: 'Lalalalala',
  //   image: "https://krot.info/uploads/posts/2021-03/1615040223_37-p-antropomorfnie-koshki-art-kartinki-44.png",
  // },
  // {
  //   author: catGroup,
  //   description: 'Lalalalala',
  //   image: "https://cdnb.artstation.com/p/assets/images/images/018/730/879/large/josip-lovrinovic-190608-staypawsitive-web.jpg?1560485854",

  // },
]

const NewsPage: FC = () => {
  
  return (
    <>
      <Upbar />
      <main>
        <LeftMenu />
        <Feed posts={fakePosts} />
      </main>
    </>
  )
}

export default NewsPage;
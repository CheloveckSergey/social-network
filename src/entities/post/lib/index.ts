import { useInfiniteQuery, useQuery } from "react-query"
import { MeUser } from "../../user"
import { PostApi } from "../api"
import { OnePost } from "../model"
import { useState } from "react"
import { OneImage } from "../../image"

const feedKeys = {
  root: 'feed',
  slug: (authorId: number) => [feedKeys.root, authorId],
}

const useFeedByAuthor = (authorId: number, meUser: MeUser, query: { offset: number, limit: number }) => {

  const [feed, setFeed] = useState<OnePost[]>([]);

  const feedStatus = useInfiniteQuery({
    queryKey: feedKeys.slug(authorId),

    queryFn: async ({ pageParam = query.offset }) => {
      return PostApi.getFeedByAuthorId(authorId, { offset: pageParam, limit: query.limit });
    },

    onSuccess: (data) => {
      let newPosts: OnePost[];
      newPosts = [...feed, ...data.pages[data.pages.length - 1]];
      setFeed(newPosts);
    },

    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < query.limit) return null;
      const nextPageParam = lastPage.length ? pages.length * query.limit : null;
      return nextPageParam;
    }
  });

  return {
    feed,
    isLoading: feedStatus.isLoading,
    isError: feedStatus.isError,
    fetchNextPage: feedStatus.fetchNextPage,
    hasNextPage: feedStatus.hasNextPage,
    isFetchingNextPage: feedStatus.isFetchingNextPage,
  }
}

const usePostInterface = (inputPost: OnePost) => {
  const [post, setPost] = useState<OnePost>(inputPost);

  function setIsLiked(isLiked: boolean): void {
    setPost({
      ...post,
      creation: {
        ...post.creation,
        isLiked,
        likeNumber: isLiked ? post.creation.likeNumber + 1 : post.creation.likeNumber - 1,
      }
    });
  }

  function setImageLiked(postImageId: number, isLiked: boolean): void {
    const newPost: OnePost = {
      ...post,
      postImages: post.postImages.map(postImage => {
        if (postImage.id === postImageId) {
          const newPostImage: OneImage = {
            ...postImage,
            creation: {
              ...postImage.creation,
              isLiked,
              likeNumber: isLiked ? postImage.creation.likeNumber + 1 : postImage.creation.likeNumber - 1,
            }
          }
          return newPostImage;
        } else {
          return postImage;
        }
      }),
    }
    setPost(newPost);
  }

  function addComment() {
    const newPost: OnePost = {
      ...post,
      creation: {
        ...post.creation,
        commentNumber: post.creation.commentNumber + 1,
      },
    }
    setPost(newPost);
  }

  function deleteComment() {
    const newPost: OnePost = {
      ...post,
      creation: {
        ...post.creation,
        commentNumber: post.creation.commentNumber - 1,
      },
    }
    setPost(newPost);
  }

  return {
    post,
    setIsLiked,
    setImageLiked,
    addComment,
  }
}

export const PostsLib = {
  useFeedByAuthor,
  usePostInterface,
}

// export class PostsList {
//   posts: Post[] = [];
//   isLoading: boolean = false;
//   isError: boolean = false;
//   isFetchingNext: boolean = false;
//   hasNextPage: boolean = false;

//   loadMore(): Post[] {
//     return [];
//   }

//   add(post: Post): void {

//   }

//   delete(post: Post): void {

//   }
// }

// class Post {
//   id: number;
//   description: string | undefined;
//   images: string[];
//   likeNumber: number;

//   constructor(id: number, description: string | undefined, images: string[], likeNumber: number) {
//     this.id = id;
//     this.description = description;
//     this.images = images;
//     this.likeNumber = likeNumber;
//   }

//   like() {
//     this.likeNumber++;
//   }

//   unlike() {
//     this.likeNumber--;
//   }
// }
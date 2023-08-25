import { Post } from "../../post";

export type User = {
  name: string,
  description: string | undefined,
  avatar: string,
  date: string | undefined,
  city: string | undefined,
  familyStatus: FamilyStatus | undefined,
  work: string | undefined,
  telephone: string,
  images: string[] | undefined,
  posts: Post[],
}

type FamilyStatus = 'idle' | 'busy' | 'married';
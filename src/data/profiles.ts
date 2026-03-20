import type { FeedPost } from "@/types";
import { mockFeedPosts } from "./feedPosts";

export interface ProfileUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing: boolean;
}

const profileUsers: ProfileUser[] = [
  {
    id: "u1",
    username: "wrapsbyalex",
    displayName: "Alex Rivera",
    avatar: "https://i.pravatar.cc/150?u=wrapsbyalex",
    bio: "Wrap specialist based in LA. Satin & matte builds only. DM for collabs.",
    followersCount: 12400,
    followingCount: 342,
    postsCount: 87,
    isFollowing: false,
  },
  {
    id: "u6",
    username: "jdm.mike",
    displayName: "Mike Tanaka",
    avatar: "https://i.pravatar.cc/150?u=jdm.mike",
    bio: "JDM builds & widebody culture. Supra MK5 owner. Show > go.",
    followersCount: 34200,
    followingCount: 189,
    postsCount: 214,
    isFollowing: true,
  },
  {
    id: "u4",
    username: "porsche.daily",
    displayName: "Daniel Kim",
    avatar: "https://i.pravatar.cc/150?u=porsche.daily",
    bio: "Porsche enthusiast. GT3 RS next. PPF everything.",
    followersCount: 8900,
    followingCount: 410,
    postsCount: 53,
    isFollowing: false,
  },
];

export function getProfileByUsername(username: string): ProfileUser | undefined {
  return profileUsers.find((u) => u.username === username);
}

export function getPostsByUsername(username: string): FeedPost[] {
  return mockFeedPosts.filter((p) => p.user.username === username);
}

export { profileUsers };

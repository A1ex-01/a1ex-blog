export interface IPost {
  id: string;
  user_id: string;
  deletedAt: null;
  notion_page_id: string;
  userDetail: UserDetail;
  notion: Notion;
}

export interface IRes<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Notion {
  pageId: string;
  cover: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  category: Tag;
  content: string;
}
export interface Tag {
  id: string;
  name: string;
  color: string;
}
interface UserDetail {
  id: string;
  username: string;
  nickname: string;
  email: string;
  age: null;
  mobile: string;
  birthday: null;
  desc: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}
export interface IPostDetail {
  content_md: string;
  id: string;
  article_id: string;
}

export interface ITag {
  id: string;
  name: string;
  createdAt: string;
}

export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
}

export interface IPagination {
  page: number;
  count: number;
  pageSize: number;
}

export interface IRow<T> {
  rows: T;
  count: number;
}
export interface IParams {
  offset: number;
  limit: number;
}
export interface IFriendType {
  id: string;
  name: string;
  createdAt: string;
}
export interface IFriend {
  id: string;
  name: string;
  link: string;
  desc: string;
  type: string;
  createdAt: string;
}
export interface IUser {
  display_name: string;
  email: string;
  password: any;
  type: string;
  label: string;
  url: string;
  nickName: string;
  id: string;
  avatar: string;
  github: any;
  twitter: any;
  facebook: any;
  google: any;
  weibo: any;
  qq: any;
  "2fa": any;
  createdAt: string;
  updatedAt: string;
  objectId: number;
  mailMd5: string;
  token: string;
}
export interface IUserStatus {
  errno: number;
  errmsg: string;
  data: IUser;
}

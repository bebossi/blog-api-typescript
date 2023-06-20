import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Follow } from "./Follow";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity("Users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Follow, (follow) => follow.followerId)
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followingId)
  followings: Follow[];

  @OneToMany(() => Post, (post) => post.userId)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.userId)
  comments: Comment[];
}
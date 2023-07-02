import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Follow } from "./Follow";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { Search } from "./Searchhistory";

@Entity("Users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column("varchar", { nullable: true })
  imageUrl: string | Express.Multer.File;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Follow, (follow) => follow.followerId)
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followingId)
  followings: Follow[];

  @OneToMany(() => Post, (post) => post.userId)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.userId)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.userId)
  likes: Like[];

  @OneToMany(() => Search, (search) => search.userId, {
    onDelete: "CASCADE",
  })
  searches: Search[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity("Likes")
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn({ name: "postId" })
  postId: Post;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: "userId" })
  userId: User;
}

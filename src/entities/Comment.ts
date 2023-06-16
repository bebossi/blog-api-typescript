import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity("Comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "userId" })
  userId: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: "postId" })
  postId: Post;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity("Posts")
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  imageUrl: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "userId" })
  userId: User;

  @OneToMany(() => Comment, (comment) => comment.postId)
  comments: Comment[];
}

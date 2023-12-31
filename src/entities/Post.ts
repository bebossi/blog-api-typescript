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
import { Like } from "./Like";

@Entity("Posts")
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column("varchar", { nullable: true })
  imageUrl: string | Express.Multer.File;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "userId" })
  userId: User;

  @OneToMany(() => Comment, (comment) => comment.postId, {
    onDelete: "CASCADE",
  })
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.postId, {
    onDelete: "CASCADE",
  })
  likes: Like[];
}

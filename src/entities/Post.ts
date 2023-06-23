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

  @Column("varchar", { nullable: true })
  imageUrl: string | Express.Multer.File;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "userId" })
  userId: User;

  @OneToMany(() => Comment, (comment) => comment.postId, {
    onDelete: "CASCADE",
  })
  comments: Comment[];
}

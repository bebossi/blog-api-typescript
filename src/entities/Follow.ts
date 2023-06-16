import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("follow")
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: "followerId" })
  followerId: User;

  @ManyToOne(() => User, (user) => user.followings)
  @JoinColumn({ name: "followingId" })
  followingId: User;
}

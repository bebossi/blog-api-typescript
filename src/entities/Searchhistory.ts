import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@Entity("Search")
export class Search {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  search: string;

  @ManyToOne(() => User, (user) => user.searches)
  @JoinColumn({ name: "userId" })
  userId: User;
}

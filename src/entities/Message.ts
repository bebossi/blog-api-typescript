import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Chat } from "./Chat";

@Entity("Message")
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @JoinColumn({ name: "senderId" })
  senderId: User;

  @ManyToOne(() => User, (user) => user.recievedMessages)
  @JoinColumn({ name: "recipientId" })
  recipientId: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @JoinColumn({ name: "chatId" })
  chatId: Chat;

  @CreateDateColumn()
  createdAt: Date;
}

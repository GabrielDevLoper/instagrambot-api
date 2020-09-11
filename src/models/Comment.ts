import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { IsEmail, MaxLength } from "class-validator";
import bcrypt from "bcrypt";
import { User } from "./User";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emailOrUsername: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  facebook: Boolean;

  @Column()
  description: string;

  @Column()
  drawlink: string;

  @Column()
  comments: string;

  @ManyToOne((type) => User)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

import { IsEmail, MaxLength } from "class-validator";
import bcrypt from "bcrypt";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  @MaxLength(20, { message: "O username deve possuir no maximo 20 caracteres" })
  username: string;

  @Column({
    unique: true,
    nullable: true,
  })
  @IsEmail({}, { message: "Email inválido" })
  email: string;

  @Column()
  password: string;

  @Column({
    default: "COMUM",
  })
  role: string;

  //esta função e executada sempre antes de salvar os dados no
  //banco de dados e sempre quando houver update
  @BeforeInsert()
  @BeforeUpdate()
  passwordHash() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

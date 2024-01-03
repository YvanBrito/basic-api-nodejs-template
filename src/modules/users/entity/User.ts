import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IUser } from '../types'

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @Column()
  age!: number

  @Column({ type: 'timestamptz' })
  birthday!: Date

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @DeleteDateColumn()
  deleted_at!: Date
}

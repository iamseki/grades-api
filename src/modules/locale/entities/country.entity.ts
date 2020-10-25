import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { State } from './state.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @OneToMany(() => State, state => state.country)
  states: State[]
}

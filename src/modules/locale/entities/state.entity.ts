import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Country } from './country.entity';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  countryId: string;

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @ManyToOne(() => Country, country => country.states)
  country: Country;
}

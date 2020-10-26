import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Country } from 'src/modules/locale/entities/country.entity';

@Entity('colleges')
export class College {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  countryId: string;

  @ManyToOne(() => Country)
  country: Country;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @Column({ default: 'N/A' })
  gradesSystem: string;

  @Column()
  gradesAverage: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

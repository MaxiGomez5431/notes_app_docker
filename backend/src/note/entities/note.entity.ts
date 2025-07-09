import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Note {
  @ApiProperty({ example: 1, description: 'Unique identifier of the note' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Note title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Note content' })
  @Column()
  body: string;

  @ApiProperty({ example: ['tag1', 'tag2'], type: [String] })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty({ example: false })
  @Column({ default: false })
  is_archived: boolean;
}

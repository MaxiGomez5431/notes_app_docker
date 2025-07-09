import { ApiProperty } from '@nestjs/swagger';

export class NoteDto {
  @ApiProperty({ example: 'Buy milk', description: 'Note title' })
  title: string;

  @ApiProperty({
    example: 'Remember to buy milk before 5pm',
    description: 'Note content',
  })
  body: string;

  @ApiProperty({
    example: ['groceries', 'house'],
    description: 'Note tags',
  })
  tags: string[];

  @ApiProperty({
    example: false,
    description: 'Whether the note is archived',
  })
  is_archived: boolean;
}

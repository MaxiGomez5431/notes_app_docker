import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'Note title', description: 'Title of the note' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Note content',
    description: 'Body content of the note',
  })
  @IsString()
  body: string;

  @ApiProperty({
    example: ['personal', 'work'],
    description: 'Tags associated with the note',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    example: true,
    description: 'Whether the note is archived',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_archived?: boolean;
}

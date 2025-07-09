import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class UpdateNoteDto {
  @ApiProperty({
    example: 'Updated title',
    description: 'Updated note title',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Updated content',
    description: 'Updated body content',
    required: false,
  })
  @IsString()
  @IsOptional()
  body?: string;

  @ApiProperty({
    example: ['updated'],
    description: 'Updated tags',
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

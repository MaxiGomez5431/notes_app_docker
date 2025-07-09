import { ApiProperty } from '@nestjs/swagger';
import { NoteDto } from './note.dto';

export class NoteResponseDto {
  @ApiProperty({ type: [NoteDto], description: 'Note list' })
  data: NoteDto[];
}

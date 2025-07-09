import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoteDto } from './dto/note.dto';
import { NoteResponseDto } from './dto/note-response.dto';

@ApiTags('note')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  @ApiOperation({ summary: 'List all active notes' })
  @ApiResponse({
    status: 200,
    description: 'List of notes',
    type: NoteResponseDto,
  })
  findAll() {
    const notes = this.noteService.findAll();
    return notes;
  }

  @Get('archived')
  @ApiOperation({ summary: 'List archived notes' })
  @ApiResponse({
    status: 200,
    description: 'List of archived notes',
    type: NoteResponseDto,
  })
  findArchived() {
    const archived = this.noteService.findArchived();
    return archived;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a note by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Found note', type: NoteDto })
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({ status: 201, description: 'Note created', type: NoteDto })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing note' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Note updated', type: NoteDto })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // status 204
  @ApiOperation({ summary: 'Delete a note' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Note deleted' })
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }
}

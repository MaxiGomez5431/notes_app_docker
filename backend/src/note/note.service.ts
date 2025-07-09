import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async create(dto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create(dto);
    return await this.noteRepository.save(note);
  }

  async findAll() {
    const notes = await this.noteRepository.find({
      where: { is_archived: false },
    });
    return { data: notes };
  }

  async findArchived() {
    const archivedNotes = await this.noteRepository.find({
      where: { is_archived: true },
    });
    return { data: archivedNotes };
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async update(id: number, dto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(id);
    Object.assign(note, dto);
    return await this.noteRepository.save(note);
  }

  async remove(id: number): Promise<void> {
    const note = await this.findOne(id);
    await this.noteRepository.remove(note);
  }

  async toggleArchive(id: number): Promise<Note> {
    const note = await this.findOne(id);
    note.is_archived = !note.is_archived;
    return await this.noteRepository.save(note);
  }
}

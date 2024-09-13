import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateJournalPageDto } from '../dto/create-journal-page.dto';
import { UpdateJournalPageDto } from '../dto/update-journal-page.dto';
import { JournalPage } from '../entities/journal-page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journal } from 'src/journal/entities/journal.entity';

@Injectable()
export class JournalPageService {

  constructor(
    @InjectRepository(JournalPage)
    private readonly journalPageRepository:Repository<JournalPage>,
    @InjectRepository(Journal)
    private readonly journalRepository:Repository<Journal>
  ){}

  async findPagesByJournalId(userId:number,journalId:number):Promise<JournalPage[]> {
    try {
      if (
        !userId || userId<=0 || typeof userId !== "number" ||
        !journalId || journalId<=0 || typeof journalId !== "number"
        ) 
          throw new BadRequestException("Id value no permitted. They be a number, positive and greater than 0");

      const journal:Journal = await this.journalRepository.findOne({where:{userId,id:journalId}})
      if(!journal) throw new InternalServerErrorException('No journal founded.');

      const pages:JournalPage[] = await this.journalPageRepository.find({where:{journalId: journal.id}})
      if(!pages) throw new InternalServerErrorException('No pages founded.');
      
      return pages;

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) 
        throw error;
      throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
    }
  }

  async createPage(userId:number,journalId:number,createDto:CreateJournalPageDto):Promise<JournalPage> {
    try {
      if (
        !userId || userId<=0 || typeof userId !== "number" ||
        !journalId || journalId<=0 || typeof journalId !== "number"
        ) 
          throw new BadRequestException("Id value no permitted. They be a number, positive and greater than 0");

      const journal:Journal = await this.journalRepository.findOne({where:{userId,id:journalId}})
      if(!journal) throw new InternalServerErrorException('No journal founded.');

    const newPage:JournalPage = this.journalPageRepository.create({
      ...createDto,
      journalId:journal.id
    });

      return await this.journalPageRepository.save(newPage);

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) 
        throw error;
      throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} journalPage`;
  }

  update(id: number, updateJournalPageDto: UpdateJournalPageDto) {
    return `This action updates a #${id} journalPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} journalPage`;
  }
}

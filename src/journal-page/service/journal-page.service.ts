import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateJournalPageDto } from '../dto/create-journal-page.dto';
import { UpdateJournalPageDto } from '../dto/update-journal-page.dto';
import { JournalPage } from '../entities/journal-page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journal } from 'src/journal/entities/journal.entity';
import { validateID } from 'src/utils/utils';

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
      if(!validateID(userId) || !validateID(journalId))
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

  async findPageById(userId:number,journalId:number, pageId:number):Promise<JournalPage> {
    try {
      /* if (
        !userId || userId<=0 || typeof userId !== "number" ||
        !journalId || journalId<=0 || typeof journalId !== "number" ||
        !pageId || pageId<=0 || typeof pageId !== "number"
        )  */
       if(!validateID(userId) || !validateID(journalId) || !validateID(pageId))
          throw new BadRequestException("Id value no permitted. They be a number, positive and greater than 0");

      const journal:Journal = await this.journalRepository.findOne({where:{userId,id:journalId}})
      if(!journal) throw new InternalServerErrorException('No journal founded.');

      const page:JournalPage = await this.journalPageRepository.findOne({where:{journalId: journal.id, id:pageId}})
      if(!page) throw new InternalServerErrorException('No pages founded.');
      
      return page;

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

  

  async updatePageById(userId:number,journalId:number, pageId:number, updateDto: UpdateJournalPageDto):Promise<JournalPage> {

    try {
      const page:JournalPage = await this.findPageById(userId,journalId,pageId);


      page.text = updateDto.text; //non controlliamo se sia vuoto e/o campo mancante i nquanto gia la pipe del DTO fa questa cosa.

      return await this.journalPageRepository.save(page);

    } 
    catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) 
        throw error;
      throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
    }
    
    
  }

  async deletePageById(userId:number,journalId:number, pageId:number) {

    try {
      const page:JournalPage = await this.findPageById(userId,journalId,pageId);
    
      return await this.journalPageRepository.remove(page);
    } 
    
    catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) 
        throw error;
      throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
    }
    
    
  }
}

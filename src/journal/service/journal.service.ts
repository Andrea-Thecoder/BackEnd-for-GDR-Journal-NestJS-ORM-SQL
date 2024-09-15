import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateJournalDto } from '../dto/create-journal.dto';
import { UpdateJournalDto } from '../dto/update-journal.dto';
import { Journal } from '../entities/journal.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { capitalizeFirstLetter, validateID } from 'src/utils/utils';


@Injectable()
export class JournalService {

  constructor(
    @InjectRepository(Journal)
      private readonly journalRepository:Repository<Journal>
  ){}

  async findAllJournalByUserId(userId:number):Promise<Journal[]> {

    try {
      if(!validateID(userId))
        throw new BadRequestException("Id value no permitted. They be a number, positive and greater than 0");

      const allUserJournal = await this.journalRepository.find({where:{userId},relations:['pages']})
      if(!allUserJournal) throw new NotFoundException(`No journals exist for User having id: ${userId}`);
      return allUserJournal;
      
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) 
        throw error;
      throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
    }
  }

  async  createJournal(userId:number,createJournalDto: CreateJournalDto):Promise<Journal> {

    try {
      
      if (!userId || userId<=0 || typeof userId !== "number") throw new BadRequestException("Id value no permitted. They be a number, positive and greater than 0");

      createJournalDto.title = capitalizeFirstLetter(createJournalDto.title);
      createJournalDto.game = capitalizeFirstLetter(createJournalDto.game);

      const newJournal:Journal = this.journalRepository.create({
        ...createJournalDto,
        userId
      });
      return await this.journalRepository.save(newJournal);

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) 
        throw error;
      throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
    }
  }

  async findJournalById(id: number, userId:number):Promise<Journal> {
    try {
      if(!validateID(userId) || !validateID(id))
        throw new BadRequestException("Id value no permitted. They be a number, positive and greater than 0");
     
      const journal:Journal = await this.journalRepository.findOne({where:{id,userId},relations:['pages']});
      if(!journal) throw new InternalServerErrorException('No journal founded.')

      return journal;

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) 
        throw error;
      throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
    }
  }

  async updateJournalById(id: number, userId:number, updateJournalDto: UpdateJournalDto):Promise<Journal> {
    try {
      if(!validateID(userId) || !validateID(id))
        throw new BadRequestException("Id value no permitted. They be a number, positive and greater than 0");

      if(Object.keys(updateJournalDto).length === 0) 
        throw new BadRequestException('Update fields are empty or not provided');

      const journal:Journal = await this.journalRepository.findOne({where:{id,userId}});
      if(!journal) throw new InternalServerErrorException('No journal founded.')

      if(updateJournalDto.title) 
        journal.title = capitalizeFirstLetter(updateJournalDto.title);

      if(updateJournalDto.game)
        journal.game = capitalizeFirstLetter(updateJournalDto.game);

      if(updateJournalDto.gameUrl)
        journal.gameUrl = updateJournalDto.gameUrl;

      return await this.journalRepository.save(journal);

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) 
        throw error;
      throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
    }
  }

  async deleteJournal(id: number, userId:number):Promise<Journal> {
    try {
      if(!validateID(userId) || !validateID(id))
        throw new BadRequestException("Id value no permitted. They be a number, positive and greater than 0");

      const journal:Journal = await this.journalRepository.findOne({where:{id,userId}});
      if(!journal) throw new InternalServerErrorException('No journal founded.')

      return await this.journalRepository.remove(journal);

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) 
        throw error;
      throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
    }
  }
}

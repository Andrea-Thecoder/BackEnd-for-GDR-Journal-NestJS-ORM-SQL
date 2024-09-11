import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateJournalDto } from '../dto/create-journal.dto';
import { UpdateJournalDto } from '../dto/update-journal.dto';
import { Journal } from '../entities/journal.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JournalService {

  constructor(
    @InjectRepository(Journal)
      private readonly journalRepository:Repository<Journal>
  ){}


  createJournal(createJournalDto: CreateJournalDto) {
    return 'This action adds a new journal';
  }

  async findAllJournalByUserId(userId:number):Promise<Journal[]> {

    try {
      if (!userId || userId<=0 || typeof userId !== "number") throw new BadRequestException("Id value no permitted. They be a number, positive and greater than 0");

      const allUserJournal = await this.journalRepository.find({where:{userId}})
      console.log(allUserJournal)
      if(!allUserJournal || allUserJournal.length <= 0) throw new NotFoundException(`No journals exist for User having id: ${userId}`);
      return allUserJournal;
      
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
}
throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
    }
    return null;
  }

  findOne(id: number) {
    return `This action returns a #${id} journal`;
  }

  update(id: number, updateJournalDto: UpdateJournalDto) {
    return `This action updates a #${id} journal`;
  }

  remove(id: number) {
    return `This action removes a #${id} journal`;
  }
}

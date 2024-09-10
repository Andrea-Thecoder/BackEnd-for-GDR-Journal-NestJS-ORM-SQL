import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { UserProfile } from '../entities/user-profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { capitalizeFirstLetter } from 'src/utils/utils';

@Injectable()
export class UserProfileService {


  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository:Repository<UserProfile>
  ){}
  
  async FindUserProfileById(userId: number):Promise<UserProfile> {

    try {
      if (!userId || userId<=0 || typeof userId !== "number") throw new BadRequestException("Id value no permitted. They be a number, positive and greater than 0");

      const userProfile:UserProfile = await this.userProfileRepository.findOne({where:{ userId }});
      if(!userProfile) throw new NotFoundException(`Not exist user with id: ${userId}`);

      return userProfile;
    }
    catch (error) {
        if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
        }
        throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
    }
  }

  async updateUserProfile(userId: number, updateUserProfileDto: UpdateUserProfileDto):Promise<UserProfile> {
    try {

      if (!userId || userId<=0 ) throw new BadRequestException("Id value no permitted. They be a number, positive and greater than 0");

      if(Object.keys(updateUserProfileDto).length === 0) 
        throw new BadRequestException('Update fields are empty or not provided');

      const userProfile:UserProfile = await this.userProfileRepository.findOne({where:{ userId }});
      if(!userProfile) throw new NotFoundException(`Not exist user with id: ${userId}`);

      if(updateUserProfileDto.name)
        userProfile.name=capitalizeFirstLetter(updateUserProfileDto.name);

      if(updateUserProfileDto.lastname)
        userProfile.lastname=capitalizeFirstLetter(updateUserProfileDto.lastname);
      
      if(updateUserProfileDto.country)
        userProfile.country=capitalizeFirstLetter(updateUserProfileDto.country);

      if(updateUserProfileDto.birthDate)
        userProfile.birthDate=updateUserProfileDto.birthDate

      return await this.userProfileRepository.save(userProfile);
    }
    catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
    }
    
    
    return null;
  }
}

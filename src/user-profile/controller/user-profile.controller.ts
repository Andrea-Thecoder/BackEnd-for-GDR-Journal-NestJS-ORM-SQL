import { Controller, Get, Body, Param, Put, ParseIntPipe, UsePipes, UseGuards } from '@nestjs/common';
import { UserProfileService } from '../service/user-profile.service';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { UserProfile } from '../entities/user-profile.entity';
import { LocalAuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/common/decorator/user.decorator';

@UseGuards(LocalAuthGuard)
@Controller('user/profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}


  @Get("/find")
  findUserProfileById(@User("userId",ParseIntPipe) userId:number):Promise<UserProfile>
  {
    return this.userProfileService.FindUserProfileById(userId);
  }

  @Put('/update')
  @UsePipes(new ValidateDtoPipe(UpdateUserProfileDto))
  updateUserProfile(
    @User("userId",ParseIntPipe) userId:number, 
    @Body() updateUserProfileDto: UpdateUserProfileDto
  ):Promise<UserProfile> {
    return this.userProfileService.updateUserProfile(userId, updateUserProfileDto);
  }
}

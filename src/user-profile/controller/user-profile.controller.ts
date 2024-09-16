import { Controller, Get, Body, Param, Put, ParseIntPipe, UsePipes, UseGuards, HttpStatus } from '@nestjs/common';
import { UserProfileService } from '../service/user-profile.service';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { UserProfile } from '../entities/user-profile.entity';
import { LocalAuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/common/decorator/user.decorator';
import { SanitizeHtmlPipe } from 'src/common/pipes/sanificate-html.pipe';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GroupApiResponses } from 'src/common/decorator/api-response.decorator';
import { CreateUserProfileDto } from '../dto/create-user-profile.dto';
import { APIResponse } from 'src/common/interfaces/api-response.interface';

@ApiTags("User profile")
@UseGuards(LocalAuthGuard)
@ApiBearerAuth()
@Controller('user/profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}


  @Get("/find")
  @ApiOperation({summary:"Get the user Profile by the userId.",description:"Get the user profile details based on the userId extracted from the JWT token. No need to specify the userId manually as it is obtained automatically from the authenticated user."})
  @GroupApiResponses(CreateUserProfileDto)
  async findUserProfileById(@User("userId",ParseIntPipe) userId:number):Promise<APIResponse<UserProfile>>
  {
    const APIResponse:APIResponse<UserProfile> = {
      statusCode: HttpStatus.OK,
      data: await this.userProfileService.FindUserProfileById(userId)
    }
    return APIResponse;
  }

  @Put('/update')
  @UsePipes(new SanitizeHtmlPipe(),new ValidateDtoPipe(UpdateUserProfileDto))
  @ApiOperation({summary:"Update the user Profile by the userId.",description:"Update the user profile details based on the userId extracted from the JWT token. No need to specify the userId manually as it is obtained automatically from the authenticated user."})
  @ApiBody({
    description:"The data required to update the user profile. Ensure all fields are correctly formatted.",
    type: UpdateUserProfileDto
  })
  @GroupApiResponses(CreateUserProfileDto)
  async updateUserProfile(
    @User("userId",ParseIntPipe) userId:number, 
    @Body() updateUserProfileDto: UpdateUserProfileDto
  ):Promise<APIResponse<UserProfile>>
  {
    const APIResponse:APIResponse<UserProfile> = {
      statusCode: HttpStatus.OK,
      data: await this.userProfileService.updateUserProfile(userId, updateUserProfileDto)
    }
    return APIResponse;
  }
}

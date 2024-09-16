import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from '../service/users.service'; 
import { Users } from '../entities/users.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { updateUserPasswordDto } from '../dto/update-password-user.dto';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { LocalAuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/common/decorator/user.decorator';
import { SanitizeHtmlPipe } from 'src/common/pipes/sanificate-html.pipe';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import { GroupApiResponses } from 'src/common/decorator/api-response.decorator';
import { ApiResponseDto } from '../dto/api-response-user.dto';


@ApiTags("User")
@Controller('user')
export class UsersController {

    constructor(private readonly usersService:UsersService){}


    //valuta se tenere questa rotta operativa o meno i nquanto pottrebbe esserci una possibile violazione della privacy collegata ad essa returnando l'intero DB.
    @Get()
    @UseGuards(LocalAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:"Get all User present in the db"})
    @GroupApiResponses(ApiResponseDto)
    async getAll():Promise<APIResponse<Omit<Users,"password">[]>>
    {
        const APIResponse:APIResponse<Omit<Users,"password">[]> = {
            statusCode: HttpStatus.OK,
            data: await this.usersService.findAll()
          }
        return APIResponse
    }

    @Get("/findby-email")
    @UseGuards(LocalAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:"Get the user by email address"})
    @ApiQuery({name:"email", type: String, description: "The email address of the user to find", required:true})
    @GroupApiResponses(ApiResponseDto)
    async getUserByEmail(@Query("email") email:string):Promise<APIResponse<Omit<Users,"password">>>
    {
        const APIResponse:APIResponse<Omit<Users,"password">> = {
            statusCode: HttpStatus.OK,
            data: await this.usersService.findUserByEmail(email)
          }
        return APIResponse;
        
    }

    @Get("/find")
    @UseGuards(LocalAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:"Get the user by the userId.",description:"Get the user details based on the userId extracted from the JWT token. No need to specify the userId manually as it is obtained automatically from the authenticated user."})
    @GroupApiResponses(ApiResponseDto)
    async getUserId(@User("userId",ParseIntPipe) userId:number):Promise<APIResponse<Omit<Users,"password">>>
    {
        const APIResponse:APIResponse<Omit<Users,"password">> = {
            statusCode: HttpStatus.OK,
            data: await this.usersService.findUserById(userId)
          }
        return APIResponse
    }

    //inviamo una promise in modo che il front possa manipolare il promise in caso di successo o fallimento!
    @Post("/create")
    @UsePipes(new SanitizeHtmlPipe(),new ValidateDtoPipe(CreateUserDto))
    @ApiOperation({summary:"Post for create new User."})
    @ApiBody({
        description:"The data required to create a new user. Ensure all fields are correctly formatted.",
        type: CreateUserDto
    })
    @GroupApiResponses(CreateUserDto)
    async createUser(@Body() createUserDto:CreateUserDto):Promise<APIResponse<Omit<Users,"password">>>
    {
        const APIResponse:APIResponse<Omit<Users,"password">> = {
            statusCode: HttpStatus.OK,
            data: await this.usersService.createUser(createUserDto)
          }
        return APIResponse;
    }

    @Put("/update")
    @UseGuards(LocalAuthGuard)
    @UsePipes(new SanitizeHtmlPipe(),new ValidateDtoPipe(UpdateUserDto))
    @ApiBearerAuth()
    @ApiOperation({summary:"Put for update user's nickname.",description:"Put the update for the user who is authenticated. The details are based on the userId extracted from the JWT token. No need to specify the userId manually as it is obtained automatically from the authenticated user."})
    @ApiBody({
        description:"The data required to update user's nickname. Ensure all fields are correctly formatted.",
        type: UpdateUserDto
    })
    @GroupApiResponses(CreateUserDto)
    async updateUser(
        @User("userId",ParseIntPipe) userId:number,
        @Body() updateUser:UpdateUserDto
    ):Promise<APIResponse<Omit<Users,"password">>>
    {
        const APIResponse:APIResponse<Omit<Users,"password">> = {
            statusCode: HttpStatus.OK,
            data: await this.usersService.updateUser(userId,updateUser)
          }
        return APIResponse;
    }

    @Put("/update/password")
    @UseGuards(LocalAuthGuard)
    @UsePipes(new SanitizeHtmlPipe(),new ValidateDtoPipe(updateUserPasswordDto))
    @ApiBearerAuth()
    @ApiOperation({summary:"Put for update user's password.",description:"Put the update for the user who is authenticated. The details are based on the userId extracted from the JWT token. No need to specify the userId manually as it is obtained automatically from the authenticated user."})
    @ApiBody({
        description:"The data required to update user's password. Ensure all fields are correctly formatted.",
        type: updateUserPasswordDto
    })
    @GroupApiResponses(CreateUserDto)
    async updateUserPassword(
        @User("userId",ParseIntPipe) userId:number,
        @Body() updatePassword:updateUserPasswordDto
    ):Promise<APIResponse<Omit<Users,"password">>>
    {
        const APIResponse:APIResponse<Omit<Users,"password">> = {
            statusCode: HttpStatus.OK,
            data: await this.usersService.updateUserPassword(userId,updatePassword)
            }
        return APIResponse;
    }
    
    @Delete("/remove")
    @UseGuards(LocalAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Delete all database records for the user account.",
        description: "Deletes the account for the authenticated user. The details are based on the userId extracted from the JWT token. There is no need to specify the userId manually as it is automatically obtained from the authenticated user."})
    @GroupApiResponses(CreateUserDto)
    async deleteUser(@User("userId",ParseIntPipe) userId:number):Promise<APIResponse<Omit<Users,"password">>>
    {
        const APIResponse:APIResponse<Omit<Users,"password">> = {
            statusCode: HttpStatus.OK,
            data: await this.usersService.deleteUser(userId)
          }
        return APIResponse;
    }
}

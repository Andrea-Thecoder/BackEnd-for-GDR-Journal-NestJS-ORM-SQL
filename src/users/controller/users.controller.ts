import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from '../service/users.service'; 
import { Users } from '../entities/users.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { updateUserPasswordDto } from '../dto/update-password-user.dto';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { LocalAuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/common/decorator/user.decorator';



@Controller('user')
export class UsersController {

    constructor(private readonly usersService:UsersService){}


    //valuta se tenere questa rotta operativa o meno i nquanto pottrebbe esserci una possibile violazione della privacy collegata ad essa returnando l'intero DB.
    @Get()
    @UseGuards(LocalAuthGuard)
    async getAll():Promise<Omit<Users,"password">[]>{
        return this.usersService.findAll();
    }

    @Get("/findby-email")
    @UseGuards(LocalAuthGuard)
    async getUserByEmail(@Query("email") email:string):Promise<Omit<Users,"password">>{
        return this.usersService.findUserByEmail(email);
    }

    @Get("/find")
    @UseGuards(LocalAuthGuard)
    async getUserId(@User("userId",ParseIntPipe) userId:number):Promise<Omit<Users,"password">>{
        return this.usersService.findUserById(userId);
    }

    //inviamo una promise in modo che il front possa manipolare il promise in caso di successo o fallimento!
    @Post("/create")
    @UsePipes(new ValidateDtoPipe(CreateUserDto))
    async createUser(@Body() createUserDto:CreateUserDto):Promise<Omit<Users,"password">>{
        return this.usersService.createUser(createUserDto);
    }

    @Put("/update")
    @UseGuards(LocalAuthGuard)
    @UsePipes(new ValidateDtoPipe(UpdateUserDto))
    async updateUser(
        @User("userId",ParseIntPipe) userId:number,
        @Body() updateUser:UpdateUserDto
    ):Promise<Omit<Users,"password">>
    {
        return this.usersService.updateUser(userId,updateUser);
    }

    @Put("/update/password")
    @UseGuards(LocalAuthGuard)
    @UsePipes(new ValidateDtoPipe(updateUserPasswordDto))
    async updateUserPassword(
        @User("userId",ParseIntPipe) userId:number,
        @Body() updatePassword:updateUserPasswordDto
    ):Promise<Omit<Users,"password">>
    {
        return this.usersService.updateUserPassword(userId,updatePassword);
    }
    
    @Delete("/remove")
    @UseGuards(LocalAuthGuard)
    async deleteUser(@User("userId",ParseIntPipe) userId:number):Promise<Omit<Users,"password">>{
        return this.usersService.deleteUser(userId);
    }
}

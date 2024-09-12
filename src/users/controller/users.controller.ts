import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from '../service/users.service'; 
import { Users } from '../entities/users.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { updateUserPasswordDto } from '../dto/update-password-user.dto';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { LocalAuthGuard } from 'src/guard/auth.guard';



@Controller('user')
export class UsersController {

    constructor(private readonly usersService:UsersService){}


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

    @Get("/:id")
    @UseGuards(LocalAuthGuard)
    async getUserId(@Param('id',ParseIntPipe) id:number):Promise<Omit<Users,"password">>{
        return this.usersService.findUserById(id);
    }

    //inviamo una promise in modo che il front possa manipolare il promise in caso di successo o fallimento!
    @Post("/create")
    @UsePipes(new ValidateDtoPipe(CreateUserDto))
    async createUser(@Body() createUserDto:CreateUserDto):Promise<Omit<Users,"password">>{
        return this.usersService.createUser(createUserDto);
    }

    @Put("/update/:id")
    @UseGuards(LocalAuthGuard)
    @UsePipes(new ValidateDtoPipe(UpdateUserDto))
    async updateUser(
        @Param("id",ParseIntPipe) id:number,
        @Body() updateUser:UpdateUserDto
    ):Promise<Omit<Users,"password">>
    {
        return this.usersService.updateUser(id,updateUser);
    }

    @Put("/update/password/:id")
    @UseGuards(LocalAuthGuard)
    @UsePipes(new ValidateDtoPipe(updateUserPasswordDto))
    async updateUserPassword(
        @Param("id",ParseIntPipe) id:number,
        @Body() updatePassword:updateUserPasswordDto
    ):Promise<Omit<Users,"password">>
    {
        return this.usersService.updateUserPassword(id,updatePassword);
    }
    
    @Delete("/delete/:id")
    @UseGuards(LocalAuthGuard)
    async deleteUser(@Param("id",ParseIntPipe) id:number):Promise<Omit<Users,"password">>{
        return this.usersService.deleteUser(id);
    }
}

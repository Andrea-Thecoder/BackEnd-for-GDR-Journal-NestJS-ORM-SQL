import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from '../service/users.service'; 
import { Users } from '../entities/users.entity'; 
import { finderIdDto } from 'src/dto/find-id-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { updateUserPasswordDto } from '../dto/update-password-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService:UsersService){}


    @Get()
    async getAll():Promise<Users[]>{
        return this.usersService.findAll();
    }

    @Get("/:id")
    async getUserId(@Param('id') id:number):Promise<Users>{
        return this.usersService.findUserById(id);
    }

    //inviamo una promise in modo che il front possa manipolare il promise in caso di successo o fallimento!
    @Post("/create")
    async createUser(@Body() createUserDto:CreateUserDto):Promise<Users>{
        return this.usersService.createUser(createUserDto);
    }

    @Delete("/delete/:id")
    async deleteUser(@Param("id") id:number):Promise<Users>{
        return this.usersService.deleteUser(id);
    }

    @Put("/update/:id")
    async updateUser(
        @Param("id") id:number,
        @Body() updateUser:UpdateUserDto
    ){
        return this.usersService.updateUser(id,updateUser);
    }

    @Put("/update/password/:id")
    async updateUserPassword(
        @Param("id") id:number,
        @Body() updatePassword:updateUserPasswordDto
    ){
        return this.usersService.updateUserPassword(id,updatePassword);
    }


}

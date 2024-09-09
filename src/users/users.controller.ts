import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { ValidationPipe } from '@nestjs/common';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }


    @Post()
    createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        const { fullName, email, password } = createUserDto;
        return this.usersService.createUser(fullName, email, password);
    }


    @Patch(':id')
    updateUser(
        @Param('id') id: number,
        @Body('fullName') fullName: string,
        @Body('email') email: string,
    ) {
        return this.usersService.updateUser(id, fullName, email);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id);
    }

    @Get()
    findAllUsers() {
        return this.usersService.findAllUsers();
    }
}

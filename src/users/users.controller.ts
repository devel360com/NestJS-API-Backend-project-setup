import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return {
        message: 'Usuario creado exitosamente',
        data: user
      };
    } catch (error) {
      throw new HttpException('Error al crear usuario', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return {
        message: 'Usuarios encontrados',
        data: users
      };
    } catch (error) {
      throw new HttpException('Error al obtener usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Usuario encontrado',
        data: user
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al obtener usuario',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(+id, updateUserDto);
      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Usuario actualizado exitosamente',
        data: user
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al actualizar usuario',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.usersService.remove(+id);
      return {
        message: 'Usuario eliminado exitosamente',
        data: user
      };
    } catch (error) {
      throw new HttpException(
        'Error al eliminar usuario',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

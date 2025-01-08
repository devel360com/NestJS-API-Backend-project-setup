import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  async create(@Body() createImageDto: CreateImageDto) {
    try {
      const image = await this.imagesService.create(createImageDto);
      return {
        message: 'Imagen creada exitosamente',
        data: image,
      };
    } catch (error) {
      throw new HttpException(
        'Error al crear la imagen',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(@Query('category') category?: string) {
    try {
      const images = category
        ? await this.imagesService.findByCategory(category)
        : await this.imagesService.findAll();
      return {
        message: 'Imágenes encontradas',
        data: images,
      };
    } catch (error) {
      throw new HttpException(
        'Error al obtener las imágenes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const image = await this.imagesService.findOne(+id);
      return {
        message: 'Imagen encontrada',
        data: image,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al obtener la imagen',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    try {
      const image = await this.imagesService.update(+id, updateImageDto);
      return {
        message: 'Imagen actualizada exitosamente',
        data: image,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al actualizar la imagen',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.imagesService.remove(+id);
      return {
        message: 'Imagen eliminada exitosamente',
      };
    } catch (error) {
      throw new HttpException(
        'Error al eliminar la imagen',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

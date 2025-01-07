import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(createImageDto: CreateImageDto) {
    const image = this.imageRepository.create(createImageDto);
    return await this.imageRepository.save(image);
  }

  async findAll() {
    return await this.imageRepository.find();
  }

  async findOne(id: number) {
    const image = await this.imageRepository.findOne({ where: { id } });
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return image;
  }

  async findByCategory(category: string) {
    return await this.imageRepository.find({ where: { category } });
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    const image = await this.findOne(id);
    Object.assign(image, updateImageDto);
    return await this.imageRepository.save(image);
  }

  async remove(id: number) {
    const image = await this.findOne(id);
    return await this.imageRepository.remove(image);
  }
}

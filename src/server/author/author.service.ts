import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PublishArticleDto } from '@server/author/dto/publish-article.dto';
import { PrismaService } from '../prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Role } from '@shared/enums/role.enum';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const { username, email, password } = createAuthorDto;

    if (password.length < 4 || password.length > 100) {
      throw new BadRequestException('Validation failed');
    }

    return this.prisma.author.create({
      data: {
        id: uuidv4(),
        username,
        email,
        password,
        roles: [Role.Author],
        followersReaders: {
          create: [],
        },
        articleLists: {
          create: [],
        },
        comments: {
          create: [],
        },
        articles: {
          create: [],
        },
      },
    });
  }

  findAll() {
    return this.prisma.author.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }

  async publishArticle(publishArticleDto: PublishArticleDto) {
    const { title, description, imageUrl, authorId, tags } = publishArticleDto;
    return this.prisma.article.create({
      data: {
        id: uuidv4(),
        title,
        description,
        imageUrl,
        authorId,
        tags,
        reactions: {},
      },
    });
  }
}

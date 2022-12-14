import { Query } from '@nestjs/common';
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { CatsDto } from './cats.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('list')
  async listCats() {
    const [rows] = await db.execute(
      'SELECT suly , szem_szin FROM macskak ORDER BY suly ASC',
    );
    return {
      macskak: rows,
    };
  }
}

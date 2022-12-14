import { Query } from '@nestjs/common';
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { CatsDto } from './cats.dto';
import { Post } from '@nestjs/common';
import { Redirect } from '@nestjs/common';
import { Body } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('list')
  async listCats(@Query('color') color = '') {
    if (color != '') {
      const [rows] = await db.execute(
        'SELECT suly , szem_szin FROM macskak WHERE szem_szin = ? ORDER BY suly DESC',
        [color],
      );
      return {
        macskak: rows,
      };
    } else {
      const [rows] = await db.execute(
        'SELECT suly , szem_szin FROM macskak ORDER BY suly DESC',
      );
      return {
        macskak: rows,
      };
    }
  }

  @Get('cats/new')
  @Render('form')
  newMacskakForm() {
    return {};
  }
  @Post('cats/new')
  @Redirect()
  async newMacska(@Body() macska: CatsDto) {
    if (macska.suly == 0 || macska.szem_szin == null) {
      return { url: '/' };
    } else {
      const [result]: any = await db.execute(
        'INSERT INTO macskak (suly , szem_szin) VALUES (? , ?)',
        [macska.suly, macska.szem_szin],
      );
      return { url: '/' };
    }
  }
}

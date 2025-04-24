import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('chat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async pesquisar(
    @Body('prompt') prompt: string,
  ): Promise<{ response: string }> {
    return { response: await this.appService.pesquisar(prompt) };
  }
}

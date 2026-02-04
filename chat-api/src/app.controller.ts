import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('chat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async pesquisar(@Body('prompt') prompt: string): Promise<{
    response: string;
    urls: Record<string, { imageUrl: string; lojaUrl: string }>;
  }> {
    return await this.appService.pesquisar(prompt);
  }
}

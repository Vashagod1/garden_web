import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome(): string {
    return 'Hello World!';
  }

  @Get('tips')
  getTips() {
    return [
      { id: 1, title: 'Совет 1', text: 'Не забывай поливать.' },
      { id: 2, title: 'Совет 2', text: 'Сажай в плодородную почву.' },
    ];
  }
}

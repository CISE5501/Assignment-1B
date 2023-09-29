import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <u><b>Hierarchy:</b></u>
      <br/>
      <b>GET:</b>
      <ul>
        <li>/analyst</li>
        <li>/analyst/:id</li>
        <li>/analyst/index</li>
        <li>/articles</li>
        <li>/articles/:id</li>
        <li>/articles/includes/:id</li>
        <li>/moderator</li>
        <li>/moderator/:id</li>
        <li>/moderator/index</li>
      </ul>
    `;
  }
}

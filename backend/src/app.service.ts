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
        <li>/analyst/id/:id</li>
        <li>/analyst/index</li>
        <li>/articles</li>
        <li>/articles/id/:id</li>
        <li>/articles/includes/id/:id</li>
        <li>/articles/rejected</li>
        <li>/moderator</li>
        <li>/moderator/id/:id</li>
        <li>/moderator/index</li>
      </ul>
    `;
  }
}

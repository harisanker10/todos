import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect([]);
  });

  it('/ (POST) and /:id (GET)', async () => {
    const newTodo = { title: 'New Todo', description: 'New Todo Description' };
    const res = await request(app.getHttpServer()).post('/').send(newTodo);
    return request(app.getHttpServer())
      .get(`/${res.body.id}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.id).toBe(res.body.id);
        expect(response.body.title).toBe('New Todo');
        expect(response.body.description).toBe('New Todo Description');
        expect(response.body.isCompleted).toBe(false);
      });
  });
  it('/ (POST) and /:id (PATCH) and /:id (GET)', async () => {
    const newTodo = { title: 'New Todo', description: 'New Todo Description' };
    const postRes = await request(app.getHttpServer()).post('/').send(newTodo);
    await request(app.getHttpServer()).patch(`/${postRes.body.id}`);
    return request(app.getHttpServer())
      .get(`/${postRes.body.id}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.id).toBe(postRes.body.id);
        expect(response.body.title).toBe('New Todo');
        expect(response.body.description).toBe('New Todo Description');
        expect(response.body.isCompleted).toBe(true);
      });
  });
});

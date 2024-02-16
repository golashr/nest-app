// import { Test } from '@nestjs/testing';
// import { INestApplication, Logger } from '@nestjs/common';
// import { ChatGateway } from './chat.gateway';
// import { Socket, io } from 'socket.io-client';

// async function createNestApp(...gateways: any): Promise<INestApplication> {
//   const testingModule = await Test.createTestingModule({
//     providers: gateways,
//   }).compile();
//   return testingModule.createNestApplication();
// }

// describe('ChatGateway', () => {
//   let gateway: ChatGateway;
//   let app: INestApplication;
//   let ioClient: Socket;
//   const logger = new Logger('ChatGateway spec');

//   beforeAll(async () => {
//     // Instantiate the app
//     app = await createNestApp(ChatGateway);
//     app.listen(3010);

//     // Get the gateway instance from the app instance
//     gateway = app.get<ChatGateway>(ChatGateway);
//     // Create a new client that will interact with the gateway
//     ioClient = io('http://localhost:3010', {
//       autoConnect: false,
//       transports: ['websocket', 'polling'],
//     });
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   it('should be defined', () => {
//     expect(gateway).toBeDefined();
//   });

//   it('should emit "pong" on "ping"', async () => {
//     ioClient.connect();
//     ioClient.emit('ping', 'Hello world!');
//     await new Promise<void>((resolve) => {
//       ioClient.on('connect', () => {
//         logger.log('client connected');
//       });
//       ioClient.on('pong', (data) => {
//         logger.log('pong', data);
//         expect(data).toBe('Pong with Hello world!');
//         resolve();
//       });
//     });
//     ioClient.disconnect();
//   });
// });

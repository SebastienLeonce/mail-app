// import { io as Client, Socket } from "socket.io-client";
// import io from '../index'; io;

// import { strictEqual } from "assert";

// import { 
//     ClientToServerEvents, 
//     ServerToClientEvents
// } from '@mail-app/event';

// import { Mail } from "@mail-app/model";

// import { Types } from "mongoose";

// describe("Typescript usage suite", () => {
// 	let clientSocket1: Socket < ServerToClientEvents, ClientToServerEvents > ;
// 	let clientSocket2: Socket < ServerToClientEvents, ClientToServerEvents > ;
	
// 	let old_mail_id1: Types.ObjectId | string | undefined;
// 	let old_mail_id2: Types.ObjectId | string | undefined;
// 	let old_mail_id3: Types.ObjectId | string | undefined;

// 	beforeEach(() => {
// 		clientSocket1 = Client(`http://localhost:3000`, {
// 			forceNew: true,
// 			autoConnect: false,
// 		});
// 		clientSocket2 = Client(`http://localhost:3000`, {
// 			forceNew: true,
// 			autoConnect: false,
// 		});

// 		clientSocket1.auth = { 
// 			name: 'Mr Test',
// 			account: '@test',
// 			from: 'test@test',
// 		}; clientSocket1.connect()
// 		clientSocket2.auth = { 
// 			name: 'Mr Seb',
// 			account: '@seb',
// 			from: 'seb@seb',
// 		}; clientSocket2.connect()
// 	});

// 	afterEach(() => {
// 		if (clientSocket1.connected) {
// 			clientSocket1.disconnect()
// 		}
// 		if (clientSocket2.connected) {
// 			clientSocket2.disconnect()
// 		}
// 	})

// 	after(() => {
// 		io.close()
// 	})

// 	it("connection", (done) => {
// 		clientSocket1.emit("getUser", (data: any) => {
// 			strictEqual(data.from, 'test@test')
// 			done()
// 		})
// 	});

// 	it("sendMsg", (done) => {
// 		clientSocket2.on("sendMsg", (data) => {
// 			old_mail_id1 = data._id

// 			strictEqual(data.content, "coucou")
// 			strictEqual(data.metadata.from, "test@test")
// 			done()
// 		});

// 		clientSocket1.emit("sendMsg", { 
// 			metadata: {
// 				name: 'Mr Test',
// 				account: '@test',
// 				from: 'test@test',
// 				titre: 'FirstMsg',
// 				categories: ['TEST'],
// 				to: 'seb@seb'
// 			},
// 			content: "coucou",
// 			interaction: true,
// 			history: ''
// 		});
// 	})

// 	it("getMsg", (done) => {
// 		clientSocket2.on('getMsg', (data) => {
// 			strictEqual(data[0].metadata.from, "test@test")
// 			strictEqual(data[0].content, 'coucou')
// 			strictEqual(data[0].history, undefined)
// 			done()
// 		})

// 		clientSocket2.emit('getMsg');
// 	})

// 	it("getHistory1", (done) => {
// 		clientSocket1.on('getMsg', (data) => {
// 			strictEqual(data[0].metadata.from, 'seb@seb')
// 			strictEqual(data[0].content, 'hello')

// 			strictEqual(data[0].history, old_mail_id1)
// 			done()
// 		})

// 		clientSocket1.on('sendMsg', (data) => {
// 			old_mail_id2 = data._id
// 			clientSocket1.emit('getMsg')
// 		})

// 		clientSocket2.on('getMsg', (data) => {
// 			clientSocket2.emit('sendMsg', {
// 				metadata: {
// 					name: 'Mr Seb',
// 					account: '@seb',
// 					from: 'seb@seb',
// 					titre: 'FirstMsg',
// 					categories: ['TEST'],
// 					to: 'test@test'
// 				},
// 				content: "hello",
// 				interaction: true,
// 				history: data[0]._id as string
// 			})
// 		})

// 		clientSocket2.emit('getMsg');
// 	})

// 	it("getHistory2", (done) => {
// 		clientSocket2.on('getMsg', (data) => {
// 			strictEqual(data.length, 1)
// 			strictEqual(data[0].metadata.from, 'test@test')
// 			strictEqual(data[0].metadata.to, 'seb@seb')
// 			strictEqual(data[0].content, 'holla')

// 			strictEqual(data[0].history, old_mail_id2)

// 			clientSocket2.emit('getMailById', <Mail["_id"]>data[0].history, (mail) => {
// 				if (mail) {
// 					strictEqual(mail.metadata.from, 'seb@seb')
// 					strictEqual(mail.metadata.to, 'test@test')
// 					strictEqual(mail.content, 'hello')
// 					strictEqual(mail.history, old_mail_id1)

// 					done()
// 				}
// 			})
// 		})

// 		clientSocket2.on('sendMsg', (data) => {
// 			old_mail_id3 = data._id;
// 			clientSocket2.emit('getMsg')
// 		})

// 		clientSocket1.on('getMsg', (data) => {
// 			clientSocket1.emit('sendMsg', {
// 				metadata: {
// 					name: 'Mr Test',
// 					account: '@test',
// 					from: 'test@test',
// 					titre: 'FirstMsg',
// 					categories: ['TEST'],
// 					to: 'seb@seb'
// 				},
// 				content: "holla",
// 				interaction: true,
// 				history: data[0]._id as string
// 			})
// 		})

// 		clientSocket1.emit('getMsg');
// 	})

// 	it("getHistory3", (done) => {
// 		clientSocket1.on('getMsg', (data) => {
// 			strictEqual(data.length, 1)
// 			strictEqual(data[0].metadata.from, 'test@test')
// 			strictEqual(data[0].metadata.to, 'seb@seb')
// 			strictEqual(data[0].content, 'holla')

// 			strictEqual(data[0].history, old_mail_id2)

// 			done()
// 		})

// 		clientSocket1.emit('getMsg');
// 	})

// 	it("sendMsg", (done) => {
// 		clientSocket1.on("sendMsg", (data) => {
// 			strictEqual(data.content, "coucou")
// 			strictEqual(data.metadata.from, "test@test")
// 			done()
// 		});

// 		clientSocket1.emit("sendMsg", { 
// 			metadata: {
// 				name: 'Mr Test',
// 				account: '@test',
// 				from: 'test@test',
// 				titre: 'FirstMsg',
// 				categories: ['TEST'],
// 				to: 'seb@seb'
// 			},
// 			content: "coucou",
// 			interaction: true,
// 			history: ''
// 		});
// 	})

// 	it("sendMsg", (done) => {
// 		clientSocket1.on("sendMsg", (data) => {
// 			strictEqual(data.content, "coucou")
// 			strictEqual(data.metadata.from, "test@test")
// 			done()
// 		});

// 		clientSocket1.emit("sendMsg", { 
// 			metadata: {
// 				name: 'Mr Test',
// 				account: '@test',
// 				from: 'test@test',
// 				titre: 'FirstMsg',
// 				categories: ['TEST'],
// 				to: 'test@test'
// 			},
// 			content: "coucou",
// 			interaction: true,
// 			history: ''
// 		});
// 	})

// 	it("getAllUser", (done) => {
// 		clientSocket1.emit('getAllUser', (data) => {
// 			strictEqual(data.length, 2)
// 			strictEqual(data[0], 'seb@seb')
// 			strictEqual(data[1], 'test@test')
// 			done()
// 		});
// 	})
// });
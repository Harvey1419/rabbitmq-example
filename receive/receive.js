import * as amqp from 'amqplib/callback_api.js'

amqp.connect('amqp://172.17.0.2:5672/', (error0,connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1,channel) => {
        if (error1) {
            throw error1;
        }
        const cola = 'hello'
        
        channel.assertQueue(cola,{
            durable: false
        })
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", cola);
        channel.consume(cola, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
        },{
            noAck: true
        }
        )
    })
})
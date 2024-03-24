import * as amqp from 'amqplib/callback_api.js'

amqp.connect('amqp://172.17.0.2:5672/', (error0, connection) => {
    if(error0){
        throw error0
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        const cola = 'hello';
        const mensaje = 'HOLA'

        channel.assertQueue(cola, {
            durable: false
        })

        channel.sendToQueue(cola, Buffer.from(mensaje))
        console.log(" [x] Sent %s", mensaje);
    })
    setTimeout(() => {
        connection.close();
        process.exit(0)
        }, 500);
})

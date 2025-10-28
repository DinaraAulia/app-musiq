const amqp = require('amqplib');
const config = require('../../utils/config');

const ProducerService = {
  async sendMessage(queue, message) {
    try {
      const connection = await amqp.connect(config.rabbitMq.server);
      const channel = await connection.createChannel();

      await channel.assertQueue(queue, {
        durable: true,
      });

      channel.sendToQueue(queue, Buffer.from(message));

      await channel.close();
      await connection.close();

      return true;
    } catch (error) {
      console.error('Error sending message to RabbitMQ:', error);
      return false;
    }
  },
};

module.exports = ProducerService;

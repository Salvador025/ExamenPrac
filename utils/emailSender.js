const  { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const snsClient = new SNSClient({
	region: "us-east-1",
	credentials: {
		accessKeyId: "",
		secretAccessKey: "",
		sessionToken: "",
	},
});

function sendNotification(NameTopic, message) {
	const params = {
		TopicArn: NameTopic,
		Message: message,
	};

	return snsClient.send(new PublishCommand(params));
}
module.exports = sendNotification;
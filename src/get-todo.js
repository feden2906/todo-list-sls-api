const AWS = require('aws-sdk');

const getTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const todo = await dynamodb.get({
    TableName: 'Todos',
    Key: { id },
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(todo.Item),
  };
};

module.exports = {
  handler: getTodo,
};

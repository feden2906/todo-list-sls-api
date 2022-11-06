const AWS = require('aws-sdk');

const updateTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;
  const { completed } = JSON.parse(event.body);
  const updatedAt = new Date().toISOString();

  const todo = await dynamodb.get({
    TableName: 'Todos',
    Key: { id },
  }).promise();

  if (!todo?.Item) throw new Error('Not found');

  const dbResp = await dynamodb.update({
    TableName: 'Todos',
    Key: { id },
    UpdateExpression: `set completed = :completed, updatedAt = :updatedAt`,
    ExpressionAttributeValues: {
      ':completed': completed,
      ':updatedAt': updatedAt,
    },
    ReturnValues: 'ALL_NEW'
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(dbResp.Attributes),
  };
};

module.exports = {
  handler: updateTodo,
};

const AWS = require('aws-sdk');

const getTodos = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const todos = await dynamodb.scan({
    TableName: 'Todos'
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

module.exports = {
  handler: getTodos,
};

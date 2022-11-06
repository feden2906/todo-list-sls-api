const uuid = require('uuid').v4;
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpJsonParser = require('@middy/http-json-body-parser');

const createTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { todo } = event.body;
  const date = new Date().toISOString();
  const id = uuid();

  const newTodo = {
    id,
    todo,
    createdAt: date,
    updatedAt: date,
    completed: false,
  }

  await dynamodb.put({
    TableName: 'Todos',
    Item: newTodo,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: middy(createTodo)
      .use(httpJsonParser()),
};

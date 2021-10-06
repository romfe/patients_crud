const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-2'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'patients_data';
const healthPath = '/health';
const patientPath = '/patient';
const patientsPath = '/patients';

exports.handler = async function (event) {
  console.log('Request event: ', event);
  let response;
  switch (true) {
    case event.httpMethod === 'GET' && event.path === healthPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === 'GET' && event.path === patientPath:
      response = await getPatient(event.queryStringParameters.cpf);
      break;
    case event.httpMethod === 'GET' && event.path === patientsPath:
      response = await getPatients();
      break;
    case event.httpMethod === 'POST' && event.path === patientPath:
      response = await savePatient(JSON.parse(event.body));
      break;
    case event.httpMethod === 'PATCH' && event.path === patientPath:
      const requestBody = JSON.parse(event.body);
      response = await modifyPatient(requestBody.cpf, requestBody.updateKey, requestBody.updateValue);
      break;//preciso ver isso aq
    case event.httpMethod === 'DELETE' && event.path === patientPath:
      response = await deletePatient(JSON.parse(event.body).cpf);
      break;
    default:
      response = buildResponse(404, '404 Not Found');
  }
  return response;
}

async function getPatient(cpf) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'cpf': cpf
    }
  }
  return await dynamodb.get(params).promise().then((response) => {
    return buildResponse(200, response.Item);
  }, (error) => {
    console.error('[-] Erro: ', error);
  });
}

async function getPatients() {
  const params = {
    TableName: dynamodbTableName
  }
  const allPatients = await scanDynamoRecords(params, []);
  const body = {
    patients: allPatients
  }
  return buildResponse(200, body);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch (error) {
    console.error('[-] Erro: ', error);
  }
}

async function savePatient(requestBody) {
  const params = {
    TableName: dynamodbTableName,
    Item: requestBody
  }
  return await dynamodb.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('[-] Erro: ', error);
  })
}

async function modifyPatient(cpf, updateKey, updateValue) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'cpf': cpf
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ':value': updateValue
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return await dynamodb.update(params).promise().then((response) => {
    const body = {
      Operation: 'UPDATE',
      Message: 'SUCCESS',
      UpdatedAttributes: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('[-] Erro: ', error);
  })
}

async function deletePatient(cpf) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'cpf': cpf
    },
    ReturnValues: 'ALL_OLD'
  }
  return await dynamodb.delete(params).promise().then((response) => {
    const body = {
      Operation: 'DELETE',
      Message: 'SUCCESS',
      Item: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('[-] Erro: ', error);
  })
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}
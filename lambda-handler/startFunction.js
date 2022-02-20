const AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const ec2 = new AWS.EC2({ region: event.region });
  return ec2.startInstances({ InstanceIds: ['i-06de357b543c8683b'] }).promise()
    .then(() => `Successfully start ec2 instance`)
    .catch(err => console.log(err));
};
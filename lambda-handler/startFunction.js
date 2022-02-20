const AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const ec2 = new AWS.EC2({ region: event.region });
  return ec2.startInstances({ InstanceIds: [ process.env.TARGET_EC2 ] }).promise()
    .then(() => `Successfully start ec2 instance ${process.env.TARGET_EC2}`)
    .catch(err => console.log(err));
};
const AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const ec2 = new AWS.EC2({ region: event.region });
  return ec2.stopInstances({ InstanceIds: ['i-06de357b543c8683b'] }).promise()
    .then(() => `Successfully stopped ec2 instance`)
    .catch(err => console.log(err));
};
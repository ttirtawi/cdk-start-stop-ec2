const AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  console.log(event);
  const ec2 = new AWS.EC2({ region: event.region });
  return ec2.stopInstances({ InstanceIds: ['i-0dfd381224a1f59fe'] }).promise()
    .then(() => `Successfully stopped ${event.instanceId}`)
    .catch(err => console.log(err));
};
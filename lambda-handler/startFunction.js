const AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const ec2 = new AWS.EC2({ region: event.region });
  targetEc2 = process.env.TARGET_EC2;
  instanceList = targetEc2.replace(/\s/g,'').split(",");
  
  console.log(`Going to start the following instances : ${targetEc2}`)

  return ec2.startInstances({ InstanceIds: instanceList }).promise()
    .then(() => console.log(`Successfully started ec2 instances ${targetEc2}`))
    .catch(err => console.log(err));
};
const AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const ec2 = new AWS.EC2({ region: event.region });
  targetEc2 = process.env.TARGET_EC2;
  instanceList = targetEc2.replace(/\s/g,'').split(",");
  
  console.log(`Going to stop the following instances : ${targetEc2}`)

  return ec2.stopInstances({ InstanceIds: instanceList }).promise()
    .then(() => console.log(`Successfully stopped ec2 instances ${targetEc2}`))
    .catch(err => console.log(err));
};
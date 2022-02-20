import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as event from 'aws-cdk-lib/aws-events';
import * as eventtarget from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';

export class CdkStartStopEc2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const policydocument = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            "ec2:StopInstances",
            "ec2:StartInstances"
          ],
          resources:[
            "*"
          ]
        })
      ]
    });
    const lambdaPolicyStopStartEC2 = new iam.ManagedPolicy(this, 'lambdaPolicyStopStartEC2', {
      document: policydocument
    });

    const role = new iam.Role(this, 'role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        lambdaPolicyStopStartEC2,
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
      ],
    });

    const stopfunction = new lambda.Function(this, 'stopfunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      description: 'to stop the ec2 instance',
      handler: 'stopFunction.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda-handler')),
      role    ,
      timeout: Duration.seconds(30)
    });

    const startfunction = new lambda.Function(this, 'startfunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      description: 'to start the ec2 instance',
      handler: 'startFunction.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda-handler')),
      role    ,
      timeout: Duration.seconds(30)
    });
    

    const scheduledStopEvent = new event.Rule(this, 'scheduledStopEvent',{
      schedule: event.Schedule.cron({minute: '15', hour: '09'})
    });
    scheduledStopEvent.addTarget(new eventtarget.LambdaFunction(stopfunction));

    const scheduledStartEvent = new event.Rule(this, 'scheduledStartEvent',{
      schedule: event.Schedule.cron({minute: '20', hour: '09'})
    });
    scheduledStartEvent.addTarget(new eventtarget.LambdaFunction(startfunction));


    new CfnOutput(this, 'functionArn', {value: stopfunction.functionArn});

  }
}

# CDK Stack to Schedule EC2 Instance Stop/Start

This stack will deploy CloudWatch Event cronjob to stop & start EC2 instance(s) in a certain region. It will trigger 2 separate Lambda functions written in Javascript to call `EC2:StartInstances` or `EC2:StopInstances` respectively.

There are 3 input that must be set as CDK Context:

1. `targetinstance` : EC2 Instance list (comma separated)
2. `scheduleStop` : Stop time (in format `HH:mm` GMT+0)
3. `scheduleStart` : Start time (in format `HH:mm` GMT+0)

Use the following command to deploy the stack 

```
cdk deploy --context targetinstance='i-0054db4f5bdd49490, i-06ecfc6fc8aafdf69' \
    --context scheduleStop="04:10" \
    --context scheduleStart="04:20" 
```

Notes:

1. This stack is built using CDK version 2. 
2. Visit [the documentation](https://docs.aws.amazon.com/cdk/v2/guide/work-with.html) to setup the CDK in your local environment.
3. You need to run `cdk bootstrap aws://<account_id>/<region>` prior deploying the stack.


# CDK Stack to Schedule EC2 Instance Stop/Start

This stack will deploy CloudWatch Event cronjob to stop & start EC2 instance. It will trigger 2 separate Lambda function written in Javascript to call `EC2:StartInstances` or `EC2:StopInstances` respectively.
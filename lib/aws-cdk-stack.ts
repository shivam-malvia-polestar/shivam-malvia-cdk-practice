import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";

export class AwsCdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        //This code will create a S3 bucket and is commented as of now
        // new s3.Bucket(this, "ShivamMalviaS3TestBucket", {
        //     removalPolicy: cdk.RemovalPolicy.DESTROY
        // });

        //below code is use to create a ECS

        const vpc = new ec2.Vpc(this, "ShivamMalviaVPC", {
            maxAzs: 3 // Default is all AZs in region
        });
        const cluster = new ecs.Cluster(this, "ShivamMalviaCluster", {
            vpc: vpc
        });

        // Create a load-balanced Fargate service and make it public
        new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
            cluster: cluster, // Required
            cpu: 512, // Default is 256
            desiredCount: 6, // Default is 1
            taskImageOptions: { image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample") },
            memoryLimitMiB: 2048, // Default is 512
            publicLoadBalancer: true // Default is true
        });
    }
}

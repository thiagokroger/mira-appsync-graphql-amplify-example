"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mira_1 = require("mira");
const aws_s3_deployment_1 = require("@aws-cdk/aws-s3-deployment");
const path = require("path");
class S3Webhosting extends mira_1.MiraStack {
    constructor(parent) {
        super(parent, S3Webhosting.name);
        const bucketProps = {
            publicReadAccess: true,
            websiteIndexDocument: 'index.html'
        };
        const siteBucket = new mira_1.AutoDeleteBucket(this, 'SiteBucket', bucketProps);
        this.addOutput('WebsiteURL', siteBucket.bucketWebsiteUrl);
        const webAppPath = path.join(__dirname, '..', '..', 'build');
        new aws_s3_deployment_1.BucketDeployment(this, 'Deployment', {
            destinationBucket: siteBucket,
            sources: [
                aws_s3_deployment_1.Source.asset(webAppPath)
            ]
        });
    }
}
exports.default = S3Webhosting;

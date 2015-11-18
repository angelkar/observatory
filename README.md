# observatory
A server farm monitor

## How do I add a new server to monitor?
Add the URL as an environment variable on the Heroku app. The variable name must follow the specific pattern:

```
OBSERVE_SERVER_4=https://a-staging-environment.com
```
## Yes, but I want to work on this locally
Just add the environment variables on your machine. Same rules apply.

## How do I deploy a new version?
Easy peasy.

```
npm run deploy
```

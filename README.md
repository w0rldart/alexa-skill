# About

Quick implementation of a skill to consume an API endpoint, to analyze the sentiment of a twitter hashtag, via Alexa's voice interface.
Can serve as a bootstrap for other custom skills implementations.

# Structure
Directory structure explanation
### `models`
Model required to build the interaction models for the custom Alexa skill.
Custom `intent` implemented for this skill is called `SentimentIntent`

Can read more at: https://developer.amazon.com/docs/custom-skills/create-the-interaction-model-for-your-skill.html

### `lambda`
 * `src`: Source code for the Lambda that would integrate with the newly created Alexa skill
 * `test` Lambda test cases

In order to get the values for your test cases, to replace `[unique-value-here]`, you can launch a test from Alexa Simulator,
which will return the values you need to run simulate the calls on Lambda

![Alexa Simulator][alexa_simulator_page]

Read here on how to configure the integration between Alexa and Lambda: https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html

# Relevant links
https://aws.amazon.com/blogs/security/how-to-use-amazon-alexa-to-get-amazon-guardduty-statistics-and-findings/
https://developer.amazon.com/docs/custom-skills/understanding-custom-skills.html
https://developer.amazon.com/docs/devconsole/test-your-skill.html
https://echosim.io/welcome

[alexa_simulator_page]: assets/alexa-test-skill.png "Alexa Simulator"

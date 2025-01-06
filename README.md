# ProCommit

VS Code extension which helps to generate AI commit messages using ChatGPT & Custom Endpoint.

## Features

You can generate commit message by pressing 'Generate AI commit' button in source control tab:

![Example of usage](assets/images/example.gif)

> Tip: You could also generate commit from command pallete by calling 'Generate AI commit' command.

## Requirements

You need Open AI API Key to make this extension work.
- [OpenAI](https://platform.openai.com/account/api-keys).
- Or You can use your own api key.

## Extension Settings

Pro Commit extension contributes the following settings:

### Appearance

- `procommit.appearance.delimeter`: Delimeter between commit lines

### General

- `procommit.general.generator`: Generator used to create commit messages. Available options: ChatGPT
- `procommit.general.messageApproveMethod`: Method used to approve generated commit message. Available options: Quick pick, Message file

### OpenAI

- `procommit.openAI.apiKey`: API Key. Needed for generating AI commit messages
- `procommit.openAI.gptVersion`: Version of GPT used
- `procommit.openAI.customEndpoint`: Custom endpoint URL
- `procommit.openAI.temperature`: Controls randomness. Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive
- `procommit.openAI.maxTokens`: The maximum number of tokens to generate. Requests can use up to 2048 tokens shared between prompt and completion

## License

Released under [MIT](/LICENSE) by [@Kochan](https://github.com/koimoee).

<h2 align="center">
ProCommit
</h2>
<p align="center">
VS Code extension which helps to generate AI commit messages using ChatGPT & a Custom Endpoint.
</p>
<p align="center">
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/koimoee/ProCommit/.github%2Fworkflows%2Fbuild.yml?style=flat-square">
<img alt="VSX" src="https://img.shields.io/open-vsx/v/Kochan/pro-commit?style=flat-square&label=OpenVSX">
</p>

## Features

- Generate commit messages by pressing the 'Generate AI commit' button in the source control tab.
- Alternatively, generate commit messages from the command palette by executing the 'Generate AI commit' command.
- Generating commit message using different language.
- More customizable

![Example of usage](assets/images/example.gif)

## Requirements

To use this extension, you need an API Key:
- Obtain an API key from [OpenAI](https://platform.openai.com/account/api-keys).
- Alternatively, you can use your own custom API key.

## Install
- Download ProCommit Extension From [Marketplace](https://marketplace.visualstudio.com/items?itemName=Kochan.pro-commit)

## Install (Manually)
- Download ProCommit Extension From [Link](https://nightly.link/koimoee/ProCommit/workflows/build/main/ProCommit.vsix.zip)
- In Visual Studio Code, at the bottom of the Activity Bar, click the Extensions icon, and select Install from VSIX. Select the VSIX file ProCommit.vsix and click Install.
- You're done!

## Extension Settings

ProCommit extension contributes the following settings:

### General

- `procommit.general.generator`: Generator used to create commit messages. Available options: ChatGPT, Custom.
- `procommit.general.messageApproveMethod`: Method used to approve generated commit messages. Available options: Quick pick, Message file.
- `procommit.general.language`: Control what language should used for commit message.

### OpenAI

- `procommit.openAI.apiKey`: API Key needed for generating AI commit messages.
- `procommit.openAI.modelVersion`: Version of AI Model used.
- `procommit.openAI.customEndpoint`: Custom endpoint URL.
- `procommit.openAI.temperature`: Controls randomness. Lower values result in less random completions. As the temperature approaches zero, the model becomes deterministic and repetitive.
- `procommit.openAI.maxTokens`: The maximum number of tokens to generate. Requests can use up to 2048 tokens shared between prompt and completion.

## License

Released under the [MIT License](/LICENSE) by [@Kochan](https://github.com/koimoee).

## Contributing

If you want more languages to be supported, please open an issue on our [GitHub repository](https://github.com/koimoee/ProCommit/issues).

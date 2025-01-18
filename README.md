<div align="center">
<img src='https://raw.githubusercontent.com/koimoee/ProCommit/refs/heads/main/assets/images/icon.png' alt='logo' width='80px' margin="0px" >
<h2 align="center">
ProCommit
</h2>
<p align="center">
📝 A Customizable VS Code extension for AI-generated commit messages.
</p>
<p align="center">
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/koimoee/ProCommit/.github%2Fworkflows%2Fbuild.yml?style=flat-square">
<img alt="VSX" src="https://img.shields.io/open-vsx/v/Kochan/pro-commit?style=flat-square&label=OpenVSX">
</p>
</div>

## Features

- Emoji features.
- Custom Generator, Endpoint, and Api Key.
- Generating commit message using different language.
- Using multiple result for commit messages.
- More customizable.

![demo](./example/demo.gif)

## Requirements

To use this extension, you need an API Key:
- Obtain an API key from [OpenAI](https://platform.openai.com/account/api-keys) (Default endpoint).
- Alternatively, you can use your own custom API key (Custom endpoint).

## Install
- Download ProCommit Extension From [Marketplace](https://marketplace.visualstudio.com/items?itemName=Kochan.pro-commit)

## Install (Manually)
- Download ProCommit Extension From [Direct Link](https://nightly.link/koimoee/ProCommit/workflows/build/main/ProCommit.vsix.zip) or [VSIX Registry](https://open-vsx.org/extension/Kochan/pro-commit)
- In Visual Studio Code, at the bottom of the Activity Bar, click the Extensions icon, and select Install from VSIX. Select the VSIX file ProCommit.vsix and click Install.
- You're done!

## Extension Settings

ProCommit extension contributes the following settings:

### General

- `procommit.general.generator`: Generator used to create commit messages. Available options: ChatGPT, Custom.
- `procommit.general.messageApproveMethod`: Method used to approve generated commit messages. Available options: Quick pick, Message file.
- `procommit.general.language`: Control what language should used for commit message.
- `procommit.general.showEmoji`: Include emojis in commit messages
- `procommit.general.useMultipleResults`: Allow using multiple results for commit messages

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

# Changelog

## 2.0.3 - 2025-01-09

### Added

- docs: Update README to enhance description of the VS Code extension
- Update More Informative Docs
- Add Korean and German language
- Add Korean and German to language options in configuration schema
- Add support for Korean and German instructions in customInstruction utility
- docs(langInstruction): add instructions in Korean and German

### Changed

- fix enum modelVersion
- chore: Update package, enhance description and add more language support for commit messages


## 2.0.2 - 2025-01-09

### Changed

- update README to reflect changes in OpenAI model version and add contributing section
- rename gptVersion to modelVersion and update default endpoint URL
- update OpenAI configuration schema to use modelVersion and set default customEndpoint

### Fixed

- update model version configuration in ChatgptMsgGenerator
- update release workflow to use softprops/action-gh-release and set permissions
- update tag and release name references to use ref_name
- add assistant instructions for English, Russian, and Japanese
- Fixed another known issue



## 2.0.1 - 2025-01-07

### Added

- enhance message generation by adding assistant instruction retrieval
- add multilingual instructions for generating commit messages
- add system instruction retrieval based on language configuration
- add support for custom commit message generators and update language options
- add language configuration and parsing logic
- 

### Changed

- simplify commit message generation logic and improve system instruction handling
- update documentation to include language support for commit message generation
- update commit message prompt to include language detection and correct conventional commit format
- update description to reflect new AI commit message feature and increment version to 2.0.1

### Fixed

- Fixed knows issue


## 2.0.0 - 2025-01-09

### First Release
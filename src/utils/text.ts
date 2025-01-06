import { getConfiguration } from "./configuration";

export function trimNewLines(str: string) {
  const stringParts = str.split("\n");
  if (stringParts.length === 0) {
    return str;
  }

  let formattedStrings = stringParts.map((part) => part.trimStart());

  return formattedStrings.join("\n");
}

export function isValidApiKey() {
  const configuration = getConfiguration();
  return (
    configuration.openAI.apiKey != null &&
    configuration.openAI.apiKey.trim().length > 0
  );
}

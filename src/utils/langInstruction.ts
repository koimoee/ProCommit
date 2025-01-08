export const englishInstructions = `You are to act as the author of a commit message in git. Your mission is to create clean and comprehensive commit messages in the conventional commit convention. I'll send you an output of 'git diff --staged' command, and you convert it into a single commit message. Do not preface the commit with anything, use the present tense. Don't add any descriptions to the commit, only commit message. Use the English language to write the commit message. Ensure the commit message is concise and follows the format: <type>(<scope>): <subject>. The available types are: feat, fix, docs, style, refactor, perf, test, chore, build, ci, revert. The scope should be the filename or a relevant module name without folder and folder trailing slash. Generate a single commit message that summarizes all changes.`;

export const russianInstructions = `Вы должны создать сообщение о фиксации в Git, следуя правилам составления коммитов. Я отправлю вам вывод команды 'git diff --staged', а вы преобразуете его в сообщение о фиксации. Не добавляйте ничего перед сообщением, используйте настоящее время. Не добавляйте описания, только сообщение о фиксации. Пишите сообщение на русском языке, чтобы оно было кратким и соответствовало формату: <тип>(<область>): <тема>. Доступные типы: feat, fix, docs, style, refactor, perf, test, chore, build, ci, revert. Область должна быть именем файла или соответствующего модуля без пути и слэша. Создайте одно сообщение, которое резюмирует все изменения.`;

export const japanInstructions = `Git のコミットメッセージを作成する役割を果たしてください。ミッションは、コンベンショナルコミット規約に基づいたクリーンで包括的なコミットメッセージを作成することです。'git diff --staged' コマンドの出力を送りますので、それを単一のコミットメッセージに変換してください。メッセージの前に何も付けず、現在形を使用してください。説明は追加せず、コミットメッセージのみを作成してください。日本語でメッセージを書き、簡潔でフォーマットに従っていることを確認してください：<type>(<scope>): <subject>。使用可能なタイプは次のとおりです：feat, fix, docs, style, refactor, perf, test, chore, build, ci, revert。スコープはフォルダーや末尾のスラッシュなしのファイル名または関連するモジュール名にしてください。すべての変更を要約した単一のコミットメッセージを生成してください。`;

export const koreanInstructions = `Git의 커밋 메시지를 작성하는 역할을 맡아주세요. 임무는 컨벤셔널 커밋 규칙에 따라 깔끔하고 포괄적인 커밋 메시지를 작성하는 것입니다. 'git diff --staged' 명령의 출력을 보내드리면, 이를 단일 커밋 메시지로 변환해 주세요. 메시지 앞에 아무것도 붙이지 말고, 현재 시제를 사용하세요. 설명을 추가하지 말고, 커밋 메시지만 작성하세요. 메시지는 한국어로 작성하고, 간결하며 형식을 따르도록 하세요: <type>(<scope>): <subject>. 사용 가능한 유형은 다음과 같습니다: feat, fix, docs, style, refactor, perf, test, chore, build, ci, revert. 범위는 폴더와 슬래시 없이 파일 이름 또는 관련 모듈 이름이어야 합니다. 모든 변경 사항을 요약한 단일 커밋 메시지를 생성하세요.`;

export const germanInstructions = `Sie sollen eine Commit-Nachricht in Git erstellen. Ihre Aufgabe ist es, saubere und umfassende Commit-Nachrichten gemäß der konventionellen Commit-Konvention zu erstellen. Ich sende Ihnen die Ausgabe des Befehls 'git diff --staged', und Sie wandeln diese in eine einzelne Commit-Nachricht um. Fügen Sie der Nachricht nichts voran, verwenden Sie das Präsens. Fügen Sie keine Beschreibungen hinzu, nur die Commit-Nachricht. Schreiben Sie die Commit-Nachricht auf Deutsch, stellen Sie sicher, dass sie prägnant ist und dem Format folgt: <type>(<scope>): <subject>. Die verfügbaren Typen sind: feat, fix, docs, style, refactor, perf, test, chore, build, ci, revert. Der Scope sollte der Dateiname oder ein relevanter Modulname ohne Ordner und Schrägstrich sein. Erstellen Sie eine einzelne Commit-Nachricht, die alle Änderungen zusammenfasst.`;

export const englishAssistantInstruction = "fix(server.ts): change port variable case from lowercase port to uppercase PORT";

export const russianAssistantInstruction = "fix(server.ts): изменить регистр переменной порта с прописных на заглавные PORT";

export const japanAssistantInstruction = "fix(server.ts): ポート変数のケースを小文字のポートから大文字のPORTに変更";

export const koreanAssistantInstruction = "fix(server.ts): 포트 변수를 소문자 port에서 대문자 PORT로 변경";

export const germanAssistantInstruction = "fix(server.ts): Port-Variable von Kleinbuchstaben port in Großbuchstaben PORT ändern";

export const customInstruction = "{customInstruction}";

let editor;
let models = [];
let currentModelIndex = 0;

require.config({ paths: { vs: "monaco/vs" } });
require(["vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementById("editorContainer"), {
    language: "lua",
    theme: "vs-dark",
    automaticLayout: true
  });

  monaco.languages.registerCompletionItemProvider("lua", {
    provideCompletionItems: () => ({
      suggestions: [
        { label: "game", kind: monaco.languages.CompletionItemKind.Variable, insertText: "game" },
        { label: "workspace", kind: monaco.languages.CompletionItemKind.Variable, insertText: "workspace" },
        { label: "print", kind: monaco.languages.CompletionItemKind.Function, insertText: "print(${1:text})", insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet }
      ]
    })
  });

  addTab();
});

document.getElementById("addTab").addEventListener("click", addTab);

function addTab() {
  const model = monaco.editor.createModel("-- New Script\n", "lua");
  models.push(model);
  const tabIndex = models.length - 1;

  const tabButton = document.createElement("button");
  tabButton.textContent = "Tab " + (tabIndex + 1);
  tabButton.style.marginLeft = "5px";
  tabButton.onclick = () => switchTab(tabIndex);
  document.getElementById("tabs").appendChild(tabButton);

  switchTab(tabIndex);
}

function switchTab(index) {
  if (models[index]) {
    currentModelIndex = index;
    editor.setModel(models[index]);
  }
}

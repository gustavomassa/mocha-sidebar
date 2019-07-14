export {};

import * as Promise from 'bluebird';
global.Promise = Promise;

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

const config = require("./config");
const vscode = require("vscode");
const treeProvider = require("./src/treeProvider");
const lensProvider = require("./src/provider-extensions/mochaLens");
const decorationProvider = require("./src/provider-extensions/decorationProvider");
const subscriptionRegister = require("./src/subscriptionRegister");
const notificationsProvider = require("./src/notificationsProvider");
const coverage = require("./src/coverage/code-coverage");
const core = require("./src/core");
const testStatusBar = require("./src/provider-extensions/testStatusBar");

function bootstrap(context) {
  const _treeProvider = new treeProvider();
  const _testStatusBar = new testStatusBar();
  const _codeLensProvider = new lensProvider(context, core);
  const _decorationProvider = new decorationProvider();
  const _subscriptionRegister = new subscriptionRegister();
  const _notificationsProvider = new notificationsProvider();
  const _coverage = new coverage();
  core.run().then(() => {
    _notificationsProvider.init();
    _decorationProvider.init(_notificationsProvider);
    _coverage.init(_notificationsProvider);
    _testStatusBar.init();
    _subscriptionRegister.init(context, _treeProvider, _coverage);
    _codeLensProvider.init(_notificationsProvider);
    vscode.window.registerTreeDataProvider("mocha", _treeProvider);
    vscode.languages.registerCodeLensProvider(_codeLensProvider.selector, _codeLensProvider);
    if (config.coverage().enable) {
      _coverage.run();
    }
  });
  //debugInit(_mochaProvider);
}

exports.activate = bootstrap;

// this method is called when your extension is deactivated
function deactivate() {}

exports.deactivate = deactivate;

'use strict';

import * as path from 'path';

import { workspace, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient';
import * as vscode from 'vscode';


export function activate( context : ExtensionContext ){

    let serverModule = context.asAbsolutePath( path.join( 'server', '../../dot-lsp-server/out/server.js' ) );

    let debugOptions = { execArgv : [ "--nolazy", "--debug=6009" ] };

    let serverOptions: ServerOptions = {
        run : { module: serverModule, transport: TransportKind.ipc },
        debug : { module: serverModule, transport: TransportKind.ipc, options: debugOptions } 
    }

    let clientOptions: LanguageClientOptions = {
        documentSelector: [ 'dot' ],
        synchronize : {
            configurationSection : "dotLanguageServer",
            fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
        }
    }

    // FOR EVALUATION PURPOSES
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push( disposable );

    disposable = new LanguageClient( 'dotLanguageServer', 'Language Server', serverOptions, clientOptions).start();

    vscode.window.showInformationMessage('The dot extension is activated!');
    context.subscriptions.push( disposable );

}

// 'use strict';
// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';

// // this method is called when your extension is activated
// // your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

//     // Use the console to output diagnostic information (console.log) and errors (console.error)
//     // This line of code will only be executed once when your extension is activated
//     console.log('Congratulations, your extension "dot-lsp" is now active!');

//     // The command has been defined in the package.json file
//     // Now provide the implementation of the command with  registerCommand
//     // The commandId parameter must match the command field in package.json
//     let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
//         // The code you place here will be executed every time your command is executed

//         // Display a message box to the user
//         vscode.window.showInformationMessage('Hello World!');
//     });

//     context.subscriptions.push(disposable);
// }

// // this method is called when your extension is deactivated
// export function deactivate() {
// }
export { };

import { CodeLens, Range } from 'vscode';

class mochaLensTestItem extends CodeLens {
    private title: string;

    constructor(commandRange, item, selector, name) {
        super(commandRange);
        // this._item = item;
        this.title = "title";
        this.command = {
            command: 'mocha-maty.runTest',
            title: 'Run Item',
            arguments: [{ label: item.name, item }]
        };
    }


}

module.exports = mochaLensTestItem;
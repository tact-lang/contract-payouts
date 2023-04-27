const coverage = require('@tact-lang/coverage');
const exportCoverageLogs = require('@tact-lang/coverage/dist/integration/integrate').exportCoverageLogs;
const path = require('path');

module.exports = async () => {
    // let logs = exportCoverageLogs();
    // console.warn(logs);
    coverage.completeCoverage([
        path.resolve(__dirname, 'sources', 'output', '*.boc')
    ]);
};
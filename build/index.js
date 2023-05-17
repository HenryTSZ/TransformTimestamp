import { Flow } from 'flow-launcher-helper';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import childProcess from 'child_process';
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
const copy = (content) => childProcess.spawn('clip').stdin.end(content);
const { on, showResult, run } = new Flow('app.png');
on('query', params => {
    params = params.filter(Boolean);
    let date = dayjs();
    if (params.length > 0) {
        date = dayjs(+params[0]);
    }
    if (date.isValid()) {
        showResult(...getResults(date));
        return;
    }
    showResult({
        title: 'Invalid input'
    });
});
function getResults(date) {
    const format = date.format('YYYY-MM-DD HH:mm:ss');
    const value = `${date.valueOf()}`;
    return [
        {
            title: format,
            method: 'copy_result',
            params: [format]
        },
        {
            title: value,
            method: 'copy_result',
            params: [value]
        }
    ];
}
on('copy_result', params => {
    copy(params[0]);
});
run();

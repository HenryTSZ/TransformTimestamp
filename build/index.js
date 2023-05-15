import { Flow } from "flow-launcher-helper";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import childProcess from "child_process";
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
const copy = (content) => childProcess.spawn("clip").stdin.end(content);
const { on, showResult, run } = new Flow("app.png");
on("query", (params) => {
    let date = dayjs();
    if (params.length > 0) {
        date = dayjs(params[0]);
    }
    if (date.isValid()) {
        showResult(...getResults(date));
        return;
    }
    showResult({
        title: "Invalid input",
    });
});
function getResults(date) {
    return [
        {
            title: date.format("L"),
            subtitle: `${date.valueOf()}`,
            method: "copy_result",
            params: [`${date.valueOf()}`],
        },
        {
            title: `${date.valueOf()}`,
            subtitle: date.format("L"),
            method: "copy_result",
            params: [date.format("L")],
        },
    ];
}
on("copy_result", (params) => {
    copy(params[0]);
});
run();

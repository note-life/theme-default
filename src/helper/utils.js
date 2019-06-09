import querystring from 'querystring';
import HOST from './host';

const getUrlParams = function (url = location.search.slice(1)) {
    return querystring.parse(url);
};

const param2string = function (data) {
    let obj = {};

    Object.keys(data || {}).forEach(key => {
        const val = data[key];

        if (val || [false, null, undefined, 0].includes(val)) {
            obj[key] = val;
        }
    });

    return querystring.stringify(obj);
};

const formatDate = function (date) {
    date = new Date(date);

    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const mi = date.getMinutes();
    const s = date.getSeconds();

    function foo (num) {
        return `00000${num}`.slice(-2);
    }

    return `${y}-${foo(m)}-${foo(d)} ${foo(h)}:${foo(mi)}:${foo(s)}`;
};

const isEmail = (str) => {
    const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    return pattern.test(str);
};

const getPicUrl = (host = HOST, path, ext = '.webp') => {
    if (/^(http:\/\/|https:\/\/|\/\/|data:image\/)/.test(path)) return path;

    return path ? `${host}/${path}${ext}` : ''
};

const randomNum = (minNum, maxNum) => {
    if (!minNum && minNum !== 0) {
        return parseInt(Math.random() * minNum + 1, 10); 
    }

    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
};

const dateDesc = (date) => {
    if (!date) return '';

    const now = Date.now();

    const dur = now - (new Date(date)).getTime();

    if (dur < 1000 * 60) {
        return `${Math.floor(dur / 1000)} 秒前`;
    }

    if (dur < 1000 * 60 * 60) {
        return `${Math.floor(dur / 1000 / 60)} 分钟前`;
    }

    if (dur < 1000 * 60 * 60 * 24) {
        return `${Math.floor(dur / 1000 / 60 / 60)} 小时前`;
    }

    if (dur < 1000 * 60  * 60 * 24 * 30) {
        return `${Math.floor(dur / 1000 / 60 / 60 / 24)} 天前`;
    }

    if (dur < 1000 * 60 * 60 * 24 * 365) {
        return `${Math.floor(dur / 1000 / 60 / 60 / 24 / 30 )} 月前`;
    }

    if (dur > 1000 * 60 * 60 * 24 * 365) {
        return `${Math.floor(dur / 1000 / 60 / 60 / 24 / 365)} 年前`;
    }

    return formatDate(date);

}

export { getUrlParams, param2string, formatDate, isEmail, getPicUrl, randomNum, dateDesc };
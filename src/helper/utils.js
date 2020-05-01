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

};

function checkWebpFeature(feature = 'lossless') {
    return new Promise((resolve, reject) => {
        const kTestImages = {
            lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
            lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
            alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
            animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
        };

        const img = new Image();
    
        img.src = "data:image/webp;base64," + kTestImages[feature];

        img.onload = function () {
            const result = (img.width > 0) && (img.height > 0);

            resolve(result);
        };
    
        img.onerror = function () {
            resolve(false);
        };
    });
}

const webpCheck = async function () {
    if (typeof window.isSupportWebp === 'boolean') {
        return window.isSupportWebp;
    }

    const isSupportWebp = await checkWebpFeature();

    Object.defineProperty(window, 'isSupportWebp', {
        value: isSupportWebp,
        configurable: false,
        writable: false
    });

    const ua = navigator.userAgent.toLowerCase();

    if (!isSupportWebp && /safari/.test(ua) && !/chrome/.test(ua) ) {
        alert('讲道理，ios 一直不支持 webp 格式的图片\n我也不是特别想支持 ios 🙄👎\n\n明明是对方的问题，凭啥要我将就？😡😡😡');
        alert('但如果有一天你看到我将就了 🥺🥺🥺');
        alert('或许...');
        alert('这就是犯贱吧！🤔🤔🤔\n\n-----------\n\n部分背景透明的图片在转 jpeg 时默认黑色了，将就着看吧，或许这就是将就的代价吧~');
    }

    return isSupportWebp;
};

const replaceImg = (str) => {
    if (window.isSupportWebp || !str) {
        return str;
    }

    return str.replace(/\.webp/g, '.jpeg');
};


export { getUrlParams, param2string, formatDate, isEmail, getPicUrl, randomNum, dateDesc, replaceImg, webpCheck };

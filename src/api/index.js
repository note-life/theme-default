import { getData } from '@helper/fetch';

class API {
    /**
     * 获取文章列表
     * @param {Number} pageNo
     * @param {String} author
     * @param {String} tags
     */
    static async fetchNotes({ pageNo = 1, pageSize = 10, author, tags }) {
        const params = {
            tags,
            author,
            limit: pageSize,
            offset:  pageSize * (pageNo - 1)
        };
        const res = await getData('/notes', params);

        if (res.error) {
            console.log(res.error);
            return {};
        }

        return res;
    }

    /**
     * 获取文章
     * @param {String} id
     */
    static async fetchNote(id) {
        const res = await getData(`/notes/${id}`);

        if (res.error) {
            console.log(res.error);
            return {};
        }

        return res;
    }

    /**
     * 获取归档
     */
    static async fetchArchive(pageNo = 1) {
        const res = await getData('/notes', { pageSize: 20, pageNo });

        if (res.error) {
            console.log(res.error);
            return {};
        }

        return res;
    }

    /**
     * 获取友链
     */
    static async fetchFriendLinks() {
        const res = await getData('/configurations', { key: 'FRIEND_LINKS' });

        if (res.error) {
            console.log(res.error);
            return {};
        }

        return res[0] && res[0].options;
    }

    /**
     * 获取站点信息
     */
    static async fetchSiteInfo() {
        const res = await getData('/configurations', { key: 'SITE_INFO' });

        if (res.error) {
            console.log(res.error);
            return {};
        }

        return res[0] ? res[0].options : {};
    }

    /**
     * 获取用户信息
     * @param {String} id
     */
    static async fetchAuthorInfo(id) {
        const res = await getData(`/users/${id}`);

        if (res.error) {
            console.log(res.error);
            return {};
        }

        return res || {};
    }
}

export default API;

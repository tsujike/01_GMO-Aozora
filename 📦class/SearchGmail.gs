//受信したメールを検索するクラス
class SearchGmail {

    /** コンストラクター
     * @param {number} start - 検索開始位置
     * @param {number} max - 検索するメールの最大数
     * @param {string} searchWith - 検索する文字列
     * @return {object} this
     * @constructor
     *  */
    constructor(start, max, searchWith) {
        this.start = start;
        this.max = max;
        this.searchWith = searchWith;
    }

    /** 指定したmessagesオブジェクトを取得するメソッド
    * @return {object} messages
    */
    getMessages() {
        const threads = GmailApp.search(this.searchWith, this.start, this.max);
        const messages = GmailApp.getMessagesForThreads(threads);
        return messages;
    }


    /** 指定したmessageオブジェクトのsubjectを取得するメソッド
     * @param {object} message - messageオブジェクト
     * @return {string} subject
     * */
    getClientNameFromSubject(message, reg) {
        const subject = this.getCustomSubject(message);
        const clientName = subject.match(reg)[0];
        return clientName;
    }


    /**メールトークンを取得するメソッド
     * @param {object} messages - messagesオブジェクト
     * @return {string} mailToken
     */
    getMailToken(messages) {
        const messages = this.getMessages();
        const message = messages[0][0];
        const mailToken = message.getPlainBody().match(/https:\/\/.*$/gm)[0];
        return mailToken;
    }

    /** メッセージにスターを付けるメソッド
     * @param {object} message - messageオブジェクト
     */
    addStar(message) {
        message.addLabel(GmailApp.getUserLabelByName("★"));
    }

    /** メッセージにスターが付いてか判定するメソッド
     * @param {object} message - messageオブジェクト
     * @return {boolean} isStarred
     * */
    isStarred(message) {
        const isStarred = message.isStarred();
        return isStarred;
    }

    /** bodyから正規表現で○○を取得するメソッド
     * @param {object} message - messageオブジェクト
     * @param {object} reg - 正規表現
     * @return {string} result
     */
    getCustomBody(message, reg) {
        const body = message.getPlainBody();
        const result = body.match(reg)[0];
        return result;
    }

}



//SearchGmailクラスをテストする関数
function testSearchGmail() {
    const searchGmail = new SearchGmail(0, 10, "label:09_gmoあおぞらネット銀行");
    const messages = searchGmail.getMessages();
    const message = messages[0][0];
    const clientName = searchGmail.getClientNameFromSubject(message, /【GMO】.*【/);
    console.log(clientName);
}
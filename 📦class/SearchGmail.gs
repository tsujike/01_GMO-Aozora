//受信したメールを検索するクラス
class SearchGmail {

  /** コンストラクター
   * @param {number} start - 検索開始位置
   * @param {number} max - 検索するメールの最大数
   * @param {string} searchWith - 検索する文字列
   * @return {object} this //指定したスレッド内のすべてのメッセージの配列を返す
   * @constructor
   *  */
  constructor(start, max, searchWith) {
    this.start = start;
    this.max = max;
    this.searchWith = searchWith;
    const threads = GmailApp.search(this.searchWith, this.start, this.max);
    this.messages = GmailApp.getMessagesForThreads(threads).flat();
  }


  /** messagesオブジェクトの各要素を格納した配列を取得するメソッド
   * @return {array} messageObjects
   * */
  getMessageObjects() {
    const messageObjects = this.messages.map(message => {
      return {
        id: message.getId(),
        subject: message.getSubject(),
        body: message.getPlainBody(),
        date: message.getDate(),
        sender: message.getFrom(),
        recipient: message.getTo(),
        threadId: message.getThread().getId(),
        isStarred: message.isStarred(),
        message: message
      };
    });
    return messageObjects;
  }


  /** bodyから正規表現でメールトークンを取得するメソッド
   * @param {object} messageObject
   * @return {string} mailToken
   */
  getMailToken(messageObject) {
    const body = messageObject.body;
    const reg = /■メールトークン[^0-9]*(\d+)/;
    const mailToken = body.match(reg)[0];
    return mailToken.replace("■メールトークン：", "");
  }


  /** スターが含まれていない配列を作成するメソッド
   * @param {object} messageObject
   * @return {string} mailToken
   */
  getUnstarredMessages() {
    const messageObjects = this.getMessageObjects();
    console.log(messageObjects.length);
    const unstarredMessages = messageObjects.filter(message => {
      return !message.isStarred
    });
    return unstarredMessages;
  }


  /** subjectに「メールトークン」が含まれているかどうか判定するメソッド
    * @param {object} messageObject
    * @return {boolean} 
    */
  isMailToken(messageObject) {
    const subject = messageObject.subject;
    console.log(subject);
    const targetString = 'メールトークン';
    return subject.includes(targetString);
  }


}




//SearchGmailクラスをテストする関数
function testSearchGmail() {

  //SearchGmailクラスのインスタンスを作成
  const s = new SearchGmail(0, 5, "label:09_gmoあおぞらネット銀行");

  //受け取ったmessagesオブジェクトの各要素を格納した配列を取得するメソッド
  const messageObjects = s.getMessageObjects();
  console.log(messageObjects.length);


  //先頭1件のみ
  // const messageObject = messageObjects[0];

  //subjectに「メールトークン」が含まれているかどうか判定するメソッド
  // console.log(s.isMailToken(messageObject));

  //bodyから正規表現でトークンを取得するメソッド
  // if (s.isMailToken(messageObject)) {
  // const mailToken = s.getMailToken(messageObject);
  // console.log(mailToken);
  // }


  //スターが含まれていない配列を作成する
  // const unStarredArray = s.getUnstarredMessages();
  // console.log(unStarredArray.length);
  // unStarredArray.forEach(message => console.log(message.subject));

  // console.log(unStarredArray.length);


  // for (const messageObject of unStarredArray){

  //   console.log(messageObject.subject)
  //   console.log(messageObject.date)
  //   console.log(messageObject.isStarred)

  // }

  //messagesオブジェクトにStarを付けるメソッド
  // messageObject.message.star();

  //bodyから正規表現でトークンを取得するメソッド
  // if (unStarredArray.length) {
  // const mailToken = s.getMailToken(unStarredArray[0]);
  // console.log(mailToken);
  // }

}


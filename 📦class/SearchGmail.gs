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
  
    /** 指定したmessagesオブジェクトの配列を取得するメソッド
    * @return {array} messages
    */
    getMessages_() {
      const threads = GmailApp.search(this.searchWith, this.start, this.max);
      const messages = GmailApp.getMessagesForThreads(threads);
      return messages;
    }
  
    /** messagesオブジェクトの各要素を格納した配列を取得するメソッド
     * @return {array} messageObjects
     * */
    getMessageObjects() {
      const messages = this.getMessages_();
      const messageObjects = messages.map(message => {
        return {
          id: message[0].getId(),
          subject: message[0].getSubject(),
          body: message[0].getPlainBody(),
          date: message[0].getDate(),
          sender: message[0].getFrom(),
          recipient: message[0].getTo(),
          threadId: message[0].getThread().getId(),
          isStarred: message[0].isStarred(),
          message: message[0]
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
      const unstarredMessages = messageObjects.filter(message => !message.isStarred);
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
    const s = new SearchGmail(0, 20, "label:09_gmoあおぞらネット銀行");
  
    //指定したmessagesオブジェクトの配列を取得するメソッド
    const messages = s.getMessageObjects();
    console.log(messages.length);
  
    //受け取ったmessagesオブジェクトの各要素を格納した配列を取得するメソッド
    const messageObjects = s.getMessageObjects(messages);
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
    const unStarredArray = s.getUnstarredMessages();
    unStarredArray.forEach(message => console.log(message.subject));
  
    console.log(unStarredArray.length);
  
    
    for (const messageObject of unStarredArray){
  
      console.log(messageObject.subject)
      console.log(messageObject.date)
      console.log(messageObject.isStarred)
  
    }
  
    //messagesオブジェクトにStarを付けるメソッド
    // messageObject.message.star();
  
    //bodyから正規表現でトークンを取得するメソッド
    // if (unStarredArray.length) {
      // const mailToken = s.getMailToken(unStarredArray[0]);
      // console.log(mailToken);
    // }
  
  }
  
  
/**
 * 定期的にGmailのメールをチェックする関数
 * トリガー：時間ベース（1分おき）
 * トリガー設置者：kenzo@jugani-japan.com
 */
function main() {

    // SearchGmailインスタンスを生成
    const s = new SearchGmail(0, 5, "label:09_gmoあおぞらネット銀行");
  
    //スターが含まれていない配列を作成する
    const unstarredMessages = s.getUnstarredMessages();
  
    //スターが付いていないメールをループ
    unstarredMessages.forEach(message => {
  
      //メールトークンが含まれていない
      if (!s.isMailToken(message)) {
        message.message.star();
        return
      }
  
      //メールトークンが含まれている処理
      const mailToken = s.getMailToken(message);
      const messageObject = [{
        'type': 'text',
        'text': `GMOメールトークン：${mailToken}`
      }];
  
      //LINE送信
      const l = new LINE();
      l.sendUniquePushMessage(messageObject, l.GLOUPID);
      console.log("LINEを送信しました");
  
      //スターを付ける
      message.message.star();
  
    });
  
  }
  
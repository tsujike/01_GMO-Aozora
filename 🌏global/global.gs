function setPropertyStore() {

  //アクセストークン設置
  const properties = PropertiesService.getScriptProperties();

  //設置用
  const GLOUPID = "ここにアクセストークンを入力して実行する";
  properties.setProperty('GLOUPID', GLOUPID);
  // const a = properties.getProperty('ACCESS_TOKEN');
  // console.log(a);

  const ACCESS_TOKEN = "ここにアクセストークンを入力して実行する";
  properties.setProperty('ACCESS_TOKEN', ACCESS_TOKEN);
  // const a = properties.getProperty('ACCESS_TOKEN');
  // console.log(a);

  // const SPREADSHEET_ID = "ここにスプレッドシートIDを入力して実行する";
  // properties.setProperty('SPREADSHEET_ID', SPREADSHEET_ID);

  // const TESTUSER_ID = "ここにユーザーIDを入力して実行する";
  // properties.setProperty('TESTUSER_ID', TESTUSER_ID);


}


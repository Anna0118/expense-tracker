## 私人記帳本

![image](https://github.com/Anna0118/expanse-tracker/blob/main/public/demo.png)

## 介紹

這是一個專為使用者記錄支出而設計的網路記帳工具，可以新增、修改與刪除支出紀錄

### 功能
- 使用者可註冊帳號並登入/登出
- 在首頁一次瀏覽所有支出的清單
- 在首頁看到所有支出清單的總金額
- 新增一筆支出
- 編輯支出的屬性
- 刪除任何一筆支出
- 根據「類別」篩選支出

### 環境建置
- Node.js
- Node Package manager
- Nodemon
- Express 4.17.1
- Express handlebars 4.0.2
- handlebars-helpers: 0.10.0
- mongoose: 5.9.7

### 使用方式

1.將專案 clone 至本地端

```
git clone
```

2.安裝 npm 套件

```
npm install

```

3.設定env，可餐考.env.example

4.產生種子資料

```
npm run cateroySeeder
npm run recordSeeder

```

5.啟動伺服器
```
npm run dev
```

6.若看見此行訊息則代表啟動成功

```
App is running on http://localhost:3000
```

7.你可以在瀏覽器輸入 http://localhost:3000 瀏覽內容




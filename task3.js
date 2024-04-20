// 1. 利用迴圈抓取地點、網址 2. 利用split功能取第一個網址 3. 建立陣列存取地點、網址
// 4. 修改image & text id ：document.getElementById 5. 帶入陣列[0] 第幾個物件
// 5. 大箱子修改CSS 內部的background-image URL 使用template string literal
// 6. 超出文本CSS省略符號，置中方法：拉出來創建新的 .box-text-special ，增加padding-left: 10px;
fetch(
  "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1"
)
  .then(function (response) {
    return response.json(); // Parse JSON response
  })
  .then(function (data) {
    const spotNames = []; // 建立一個空陣列來存儲地點名稱，取第幾個(HTML DOM)
    const imageURLs = []; // 建立一個空陣列來存儲圖片網址，取第幾個(HTML DOM)

    for (let i = 0; i < data.data.results.length; i++) {
      let spots = data.data.results[i]; // Each spot
      console.log(spots.stitle); // 地點名稱（數量58個）
      spotNames.push(spots.stitle); // 將地點名稱加入陣列（才可以取第一個）
      let imageURL = "https://" + spots.filelist.split("https://")[1]; // 網址取得
      console.log(imageURL); // 印出網址
      imageURLs.push(imageURL); // 放置陣列
    }

    /*-------------------------------- ImageURL Array --------------------------*/
    let smallboximageURL = imageURLs.slice(0, 58); // 取出全部的URL

    /*-------------------------------Small Box ImageURL ----------------------------*/

    for (let i = 0; i < smallboximageURL.length && i < 3; i++) {
      const imageURL = smallboximageURL[i];
      var imgElement = document.getElementById("imageURL" + (i + 1));
      imgElement.src = imageURL;
      imgElement.style.display = "block";
    }

    /*-------------------------------Big Box from the first to the 55th ----------------------------*/

    // 要生成的元素數量
    const numElements = 55; // 扣掉小箱子的三個

    // 父容器元素
    var parentContainer = document.querySelector(".grid-container");

    // 迴圈生成元素
    for (let i = 1; i <= numElements; i++) {
      // 創建 box 元素
      var boxElement = document.createElement("div");
      boxElement.classList.add("box");
      boxElement.id = "myBox" + i;

      // 創建 box-text 元素
      var boxTextElement = document.createElement("div");
      boxTextElement.classList.add("box-text");
      boxTextElement.id = "name" + (i + 3);
      boxTextElement.textContent = "Title " + i;

      // 創建 star 元素
      var starElement = document.createElement("span");
      starElement.classList.add("star");
      starElement.innerHTML = "&#9733;";

      // 將 box-text 和 star 元素添加到 box 元素中
      boxElement.appendChild(boxTextElement);
      boxElement.appendChild(starElement);

      // 將 box 元素添加到父容器中
      parentContainer.appendChild(boxElement);
    }

    /*-------------------------------Big Box ImageURL ----------------------------*/

    // 迴圈開始的起始索引
    const startIndex = 3;

    // 迴圈結束的結束索引
    const endIndex = 57;

    // 迴圈生成元素
    for (let i = startIndex; i <= endIndex; i++) {
      const imageURL = smallboximageURL[i];
      var boxElement = document.getElementById("myBox" + (i - 2));
      boxElement.style.backgroundImage = `url('${imageURL}')`;
    }

    /*-------------------------------Text 文字區: 總共有57筆資料 ----------------------------*/
    // 迴圈
    for (let i = 0; i < spotNames.length && i < 58; i++) {
      let textElement = document.getElementById("name" + (i + 1));
      textElement.textContent = spotNames[i];

      /* --------------------------大箱子：字數如果超過7--------------------- */
      if (spotNames[i].length > 7) {
        textElement.classList.add("long-text"); // 添加 .long-text 類別
      }
    }
  });

/* --------------------------------------- JavaScript 設定 Sidebar ---------------------------------------------*/

function showSidebar() {
  // 檢查螢幕寬度是否小於或等於600px
  if (window.innerWidth <= 600) {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  }
}
function hideSidebar() {
  // 檢查螢幕寬度是否小於或等於600px
  if (window.innerWidth <= 600) {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  }
}

/** ----------------------------------------Load More --------------------------------------------- */
let loadMoreBtn = document.querySelector("#loadmore");
let displayedItems = 10; // 已經顯示的箱子數量

loadMoreBtn.onclick = () => {
  let boxes = document.querySelectorAll(".grid-container .box");

  // 顯示下一組十個箱子
  for (
    let i = displayedItems;
    i < displayedItems + 10 && i < boxes.length;
    i++
  ) {
    boxes[i].style.display = "flex"; // inline-box 會讓文字往上（修改flex）
  }

  // 更新已顯示箱子數量
  displayedItems += 10;

  // 如果已經沒有更多的箱子可顯示，隱藏 "Load More" 按鈕
  if (displayedItems >= boxes.length) {
    loadMoreBtn.style.display = "none";
  }
};

(function () {

var evurl = "";

var contextMenuItem1 ={
    "id": "evmnu1",
    "title": "Aller sur www.google.com",
    "contexts": ['page']
};
chrome.contextMenus.create(contextMenuItem1);

var contextMenuItem2 ={
    "id": "evmnu2",
    "title": "Aller sur www.google.fr",
    "contexts": ['page']
};
chrome.contextMenus.create(contextMenuItem2);

var contextMenuItem3 ={
    "id": "evmnu3",
    "title": "Aller sur www.google.ca",
    "contexts": ['page']
};
chrome.contextMenus.create(contextMenuItem3);

chrome.contextMenus.onClicked.addListener( (clickData) => {
    if(clickData.menuItemId == "evmnu1"){
        chrome.tabs.update({url:"https://www.google.com/"});
    }
    if(clickData.menuItemId == "evmnu2"){
        chrome.tabs.update({url:"https://www.google.fr/"});
    }
    if(clickData.menuItemId == "evmnu3"){
        chrome.tabs.update({url:"https://www.google.ca/"});
    }
});

  let badgeIndicatorTimeout = null;

  const showBadgeIndicator = () => {
    clearTimeout(badgeIndicatorTimeout);
    this.setBadgeText({ text: '\u2713' });

    badgeIndicatorTimeout = setTimeout(() => {
      this.setBadgeText({ text: '' });
    }, 500);
  };

  this.onClicked.addListener(({ url }) => {

    console.log(url);
    if (url == null) {
      return;
    }

    const input = document.createElement('input');
    input.value = url;

    document.body.appendChild(input);
    input.select();

    try {
      if (document.execCommand('copy')) {
        alert("Le lien " + url + " a été copié");
        showBadgeIndicator();
      }
    } catch {
    }

    input.remove();
  });
}).apply(chrome.browserAction);

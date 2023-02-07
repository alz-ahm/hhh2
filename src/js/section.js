const t = window.TrelloPowerUp.iframe();

// you can access arguments passed to your iframe like so
const arg = t.arg('arg');


const onAddClicked = function (t, opts) {
  console.log("Click on card works")
};



t.render(function () {
  console.log('running attachment function');
  // make sure your rendering logic lives here, since we will
  // recall this method as the user adds and removes attachments
  // from your section

  t.card('attachments')
    .get('attachments')
    .filter(function (attachment) {
      return attachment.url.indexOf('https://www.youtube.com/') == 0;
    })
    .then(function (yellowstoneAttachments) {
      document.getElementById('add-input').onclick = onAddClicked
    })



  // t.card('attachments')
  //   .get('attachments')
  //   .filter(function (attachment) {
  //     return attachment.url.indexOf('http://www.nps.gov/yell/') == 0;
  //   })
  //   .then(function (yellowstoneAttachments) {
  //     const urls = yellowstoneAttachments.map(function (a) {
  //       return a.url;
  //     });
  //     document.getElementById('urls').textContent = urls.join(', ');
  //   })
  //   .then(function () {
  //     return t.sizeTo('#content');
  //   });
});

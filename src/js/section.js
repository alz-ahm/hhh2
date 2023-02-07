const t = window.TrelloPowerUp.iframe();

// you can access arguments passed to your iframe like so
const arg = t.arg('arg');

// TODO use a unique id generator instead
function getRandomId() {
  var random = [...Array(30)].map(() => Math.random().toString(36)[2]).join('');
  return random;
}

const onAddClicked = function() {
  var text = document.getElementById('my-input').value;

  addNewSubtask(text);

  console.log('Click on card works' + text);
};

/**
 * Subtask -> unique number, is checked, text, insert date
 *
 * When reading (get the list, sort by insert date)
 *
 * Insert date could be wrong!
 *
 *
 * Put everything into one big string -> more content, what if it fails
 *
 *
 *
 */
const onShowClicked = function() {
  t.getAll()
    .then(function(data) {
      console.log(JSON.stringify(data, null, 2));
    });
};


function addNewSubtask(text) {
  var subtask = {
    title: text,
    is_checked: false,
  };

  t.set('card', 'shared', getRandomId(), JSON.stringify(subtask))
    .then(function(data) {
      console.log('info added');
    });
}

window.onload = (event) => {
  console.log(getRandomId());
  document.getElementById('add-input').onclick = onAddClicked;
  document.getElementById('show-input').onclick = onShowClicked;
};

t.render(function() {
  console.log('running attachment function');
  // make sure your rendering logic lives here, since we will
  // recall this method as the user adds and removes attachments
  // from your section

  t.card('attachments')
    .get('attachments')
    .filter(function(attachment) {
      return attachment.url.indexOf('https://www.youtube.com/') == 0;
    })
    .then(function(yellowstoneAttachments) {
      document.getElementById('add-input').onclick = onAddClicked;
      document.getElementById('show-input').onclick = onShowClicked;
    });


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

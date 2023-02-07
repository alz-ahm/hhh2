const t = window.TrelloPowerUp.iframe();

// you can access arguments passed to your iframe like so
const arg = t.arg('arg');

var sample_data = '{\n' +
  '  "card": {\n' +
  '    "shared": {\n' +
  '      "riq683vt40mb2rie112w9wo0m1pcjm": "{\\"title\\":\\"hi\\",\\"is_checked\\":false}",\n' +
  '      "mku5ro5xcte1egwawer8z82r8lt78k": "{\\"title\\":\\"hello\\",\\"is_checked\\":false}",\n' +
  '      "iocq17syr2t23on00lzpfn87v35xfg": "{\\"title\\":\\"how are you?\\",\\"is_checked\\":false}",\n' +
  '      "fit694p0u8koipi69noypdldxlrhxp": "{\\"title\\":\\"are you fine\\",\\"is_checked\\":false}"\n' +
  '    }\n' +
  '  }\n' +
  '}'

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

function getSubtasks(data) {
  var tasks_data = data['card']['shared']
  console.log(tasks_data)
  var subtasks = []
  for (var key in tasks_data) {
    var parsedData = JSON.parse(tasks_data[key])
    subtasks.push(
      {
        id: key,
        title: parsedData.title,
        is_checked: parsedData.is_checked
      }
    )
  }

  return subtasks
}

// TODO use pair id, subtasks instead?
function updateSubtask(substask) {

  var item = {
    title: substask.title,
    is_checked: substask.checked,
  };

  t.set('card', 'shared', substask.id, JSON.stringify(item))
    .then(function(data) {
      console.log('udpating card with new check state');
    });
}


const onShowClicked = function() {
  // var subtasks = getSubtasks(JSON.parse(sample_data))
  // console.log(subtasks)
  // changeChecked(subtasks[0], !subtasks[0].is_checked)
  t.getAll()
    .then(function(data) {
      var subtasks = getSubtasks(data)
      console.log(subtasks)
      subtasks[2].is_checked = !subtasks[2].is_checked
      updateSubtask(subtasks[2])
      // console.log(JSON.stringify(data, null, 2));
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

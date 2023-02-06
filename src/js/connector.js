import { defaultUnitForLocale, celsiusToFahrenheit, kphToMph } from './modules/util';
// import fetchWeatherData from './modules/api';
// import getConditionKey from './modules/conditions-map';
// import localizationSettings from './modules/localizationSettings';

// const { Promise } = window.TrelloPowerUp;
// const REFRESH_INTERVAL = 1800; // 30 minutes in seconds
//
// const showBadge = (command, type, prefs) => {
//   if (command === 'card-badges') {
//     return prefs[`${type}-front`] !== false;
//   }
//   if (command === 'card-detail-badges') {
//     return prefs[`${type}-back`] !== false;
//   }
//
//   throw new Error('Unknown command', command);
// };
//
// const getWeatherBadges = (t, opts) =>
//   Promise.all([
//     t.card('coordinates'),
//     t.get('member', 'private', 'units', defaultUnitForLocale(opts.locale)),
//     t.get('board', 'shared'),
//   ]).then(([card, units, prefs]) => {
//     if (!card.coordinates) {
//       // if the card doesn't have a location at all, we won't show any badges
//       return [];
//     }
//
//     const tempBadge = {
//       dynamic(trello) {
//         return fetchWeatherData(trello).then((weatherData) => {
//           let { temp } = weatherData;
//           if (units === 'metric') {
//             temp = `${temp.toFixed()} °C`;
//           } else {
//             temp = `${celsiusToFahrenheit(temp).toFixed()} °F`;
//           }
//           return {
//             title: trello.localizeKey('temperature'),
//             text: temp,
//             refresh: REFRESH_INTERVAL,
//           };
//         });
//       },
//     };
//
//     const windBadge = {
//       dynamic(trello) {
//         return fetchWeatherData(trello).then((weatherData) => {
//           let windSpeed = weatherData.wind;
//           if (units === 'metric') {
//             windSpeed = `🌬️ ${windSpeed.toFixed()} kph`;
//           } else {
//             windSpeed = `🌬️ ${kphToMph(windSpeed).toFixed()} mph`;
//           }
//           return {
//             title: trello.localizeKey('wind-speed'),
//             text: windSpeed,
//             refresh: REFRESH_INTERVAL,
//           };
//         });
//       },
//     };
//
//     const conditionsBadge = {
//       dynamic(trello) {
//         return fetchWeatherData(trello).then((weatherData) => {
//           const conditionKey = getConditionKey(weatherData.conditions);
//           return {
//             title: trello.localizeKey('conditions'),
//             icon: `https://openweathermap.org/img/w/${weatherData.icon}.png`,
//             text: conditionKey ? trello.localizeKey(conditionKey) : '',
//             refresh: REFRESH_INTERVAL,
//           };
//         });
//       },
//     };
//
//     let badges = [];
//
//     if (!prefs || typeof prefs !== 'object') {
//       // default to all badges
//       badges = [tempBadge, windBadge, conditionsBadge];
//     } else {
//       // there are some potential preferences
//       [
//         ['temp', tempBadge],
//         ['wind', windBadge],
//         ['conditions', conditionsBadge],
//       ].forEach(([type, badge]) => {
//         if (showBadge(t.getContext().command, type, prefs)) {
//           badges.push(badge);
//         }
//       });
//     }
//
//     return badges;
//   });
//
// window.TrelloPowerUp.initialize(
//   {
//     'card-badges': getWeatherBadges,
//     'card-detail-badges': getWeatherBadges,
//     'show-settings': (t) => {
//       return t.popup({
//         title: t.localizeKey('weather-settings'),
//         url: './settings.html',
//         height: 281,
//       });
//     },
//   },
//   {
//     localization: localizationSettings,
//   }
// );

var onBtnClick = function (t, opts) {
  console.log('Someone clicked the button');
};

window.TrelloPowerUp.initialize({
  'card-buttons': function (t, opts) {
    return [{
      // usually you will provide a callback function to be run on button click
      // we recommend that you use a popup on click generally
      icon: GRAY_ICON, // don't use a colored icon here
      text: 'Open Popup',
      callback: onBtnClick,
      condition: 'edit'
    }, {
      // but of course, you could also just kick off to a url if that's your thing
      icon: GRAY_ICON,
      text: 'Just a URL',
      condition: 'always',
      url: 'https://developer.atlassian.com/cloud/trello',
      target: 'Trello Developer Site' // optional target for above url
    }];
  }
});

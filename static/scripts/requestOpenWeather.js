
  async function getRequest(url) {
    let response = await fetch(url);
    return await response.json().catch((err) => new Error(response.status));
  }
  async function getJson(url) {
      let json = await getRequest(url).catch((err) => console.log(err));
      okFunc(json);
  }

  let $input = document.getElementById('choiseCityName');
  const okFunc = (json) => {
    try {
      if (json.cod != "404" && !json.cod) {
      $input.placeholder = 'Please enter a your city name.';
      $input.classList.remove('placeholderred');
      $input.classList.add('placeholderOk');
      $input.focus();
     }
       else if (json.cod == '200') {
         weather.showWeatherData(json);
        $input._tippy.destroy();
        $input.focus();
       }
       else {
         throw new Error();
       }
    } catch (err) {
       errorFunc(json);
    }
  }

  const errorFunc = (json) => {
    try {
      if (!json) {
        return console.log(new Error('json undefined'))
      }
      if (json.cod == '404')  {
        tippy($input, {
          content: "Sorry we can not find your city",
          placement: 'top',
          delay: [20, 0],
          interactive: true,
          showOnInit: true,
          trigger: ' click',
          onShown($input) {
           $input.focus()
         },
          size: "regular"
        }

      )
       $input._tippy.show();
        return console.log( new Error(`${json.cod} ${json.message}`));
      } else {
          return console.log( new Error(`${json.cod} ${json.message}`));
      }
    } catch (err) {
        console.log(err);
      }
    }

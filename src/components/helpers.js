export function getAPIs(qs) {
    if(qs == undefined) {
      console.log("ERROR: qs from apiHelpers not defining")
      return
    }
    var all_keys = qs.localStorage.getAllKeys()
  
    let api_name_keys = []
    for (let i = 0; i < all_keys.length; i++) {
      if(all_keys[i].includes('api_data_api_name_plain_pretext_')) {
        let uniq_id = all_keys[i].replace('api_data_api_name_plain_pretext_', '')
        api_name_keys.push({
          label: qs.localStorage.getItem(all_keys[i]),
          url: qs.localStorage.getItem('api_data_url_plain_pretext_' + uniq_id),
          description: qs.localStorage.getItem('api_data_exchange_name_plain_pretext_' + uniq_id).label,
          api_key: qs.localStorage.getItem('api_data_api_key_pretext_' + uniq_id),
          api_secret: qs.localStorage.getItem('api_data_api_secret_pretext_' + uniq_id),
          api_update_date: qs.localStorage.getItem('api_data_date_plain_pretext_' + uniq_id)
        })
      }
    }
  
    return api_name_keys.sort(function(a,b){
        return a.api_update_date.localeCompare(b.api_update_date);
      }).reverse();
  }

  export function showLoading(qs, spinner, message1, message2) {
    qs.loading.show({
        spinner: spinner,
        spinnerColor: 'grey-4',
        spinnerSize: 80,
        message: `<div class="bg-blue-grey-9 q-pa-sm" style="border-radius: 1rem"><span class="text-h6 text-grey-1"> ${message1} </span> ${message2}.</div>`,
        html: true,
    })
  }

  export function showDialog(qs, _class, _title, _message) {
    qs.dialog({
          class: _class,
          title: _title,
          html: true,
          message: _message,
          persistent: true,
          ok: {
            style: 'border-radius: 15px',
            color: 'grey-10 text-grey-1'
          }
    }).onOk(() => {
      // console.log('OK')
    })
  }

  export async function fetchTasks(qs, QSpinnerCube, $axios) {
    if(getAPIs(qs).length == 0) return
    showLoading(qs, QSpinnerCube, 'Getting your ', '<span class="text-cyan-5">tasks</span>')
    const constructPostObj = {
      login_api_apiKey_S: qs.localStorage.getItem('login_api_apiKey_S'),
      login_api_apiKey: qs.localStorage.getItem('login_api_apiKey'),
      login_api_secretKey: qs.localStorage.getItem('login_api_secretKey'),
      login_api_exchangeURL: qs.localStorage.getItem('login_api_exchangeURL')
    } 
    try {
      let res = await $axios.post("http://localhost:3003/my_services", {
        body: constructPostObj
      })

      // First remove all tasks keys then
      var all_keys = qs.localStorage.getAllKeys()
      for (let i = 0; i < all_keys.length; i++) {
        if(all_keys[i].includes('task_data_')) {
          qs.localStorage.remove(all_keys[i])
        }
      }

      // add newer keys
      // console.log(res.data)
      let _data = res.data.services
      for (let index = 0; index < _data.length; index++) {
        qs.localStorage.set("task_data_pair_plain_pretext_"+_data[index].taskID, _data[index].taskPair);
        qs.localStorage.set("task_data_api_plain_pretext_"+_data[index].taskID, _data[index].taskExchangeAPIName);
        qs.localStorage.set("task_data_type_plain_pretext_"+_data[index].taskID, _data[index].taskSide);
        qs.localStorage.set("task_data_amount_plain_pretext_"+_data[index].taskID, _data[index].taskAmount);
        qs.localStorage.set("task_data_interval_plain_pretext_"+_data[index].taskID, _data[index].taskInterval);
        qs.localStorage.set("task_data_spread_percent_plain_pretext_"+_data[index].taskID, _data[index].taskSpread);
        qs.localStorage.set("task_data_state_plain_pretext_"+_data[index].taskID, _data[index].taskStatus);
        qs.localStorage.set("task_data_date_plain_pretext_"+_data[index].taskID, _data[index].taskCreatedTime);
      }
    }
    catch(e) {
      console.log(e)
      let error = e.message;
      if(e.response) {
        error = e.response.data.message
      }
      showDialog(qs, 'bg-grey-3 text-grey-10', '<span class="text-blue-grey text-caption text-bold">Request Status</span>', "API_Error:CodeM_S1:"+error)
    }
    qs.loading.hide()
  }



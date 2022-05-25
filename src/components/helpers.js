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
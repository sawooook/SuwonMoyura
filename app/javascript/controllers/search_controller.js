import {Controller} from "stimulus"
import Rails from "@rails/ujs"

export default class extends Controller{
    static get targets() {
        return ["query"]
    }

    connect() {
      console.log("hello")
    }

    searchPlaceThroughQuery(){
        var query = this.queryTarget.value
        var getUrl = window.location.origin
        var makeUrl = `${getUrl}/sites/site_search?query=`+query

        console.log(makeUrl)

        Rails.ajax ({
          type: "GET",
          url: makeUrl,
          success: function(response) {
              console.log(response)
          },
          error: function (response) {
            console.log("error message:" + response)
          }
        })
    }
}
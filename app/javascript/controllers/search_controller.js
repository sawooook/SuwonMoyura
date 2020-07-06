import {Controller} from "stimulus"
import Rails from "@rails/ujs"

export default class extends Controller{
    static targets = ["query", "content"]

    connect() {
    }

    searchPlaceThroughQuery() {
        let content = this.contentTarget
        let query = this.queryTarget.value
        let getUrl = window.location.origin
        let makeUrl = `${getUrl}/currency/sites/site_search?query=`+query

        Rails.ajax ({
          type: "GET",
          url: makeUrl,
          success: function(response) {
              console.log(new XMLSerializer().serializeToString(response))
            content.innerHTML = new XMLSerializer().serializeToString(response)
          },
          error: function (response) {
            console.log("error message:" + response)
          }
        })
    }
}
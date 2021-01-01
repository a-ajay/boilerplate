/* globals tab, */
/* exported parse_url, update_uri, ajax_call */


$('body')
  .tooltip({
    selector: '[data-toggle="tooltip"]',
    container: 'body',
    animation: true,
    html: true,
    sanitize: false,
    boundary: 'window',
    // trigger: "click focus",
    delay: { "show": 100, "hide": 3000 }
  })



$(window).on('load', function () {
  redraw()
})

function redraw() {
  $('[data-toggle="tooltip"]').tooltip('hide')
  const tab_map = {
    home: plot_home,
    // report: plot_report
  }

  $(".loader").removeClass("d-none");
  // funky way to execute stuff
  tab_map[tab]()
}

function ajax_call(url_hit, method = 'GET', bool_async = true) {
  // use get_ajax_call.done(function(data){  <code> })
  return $.ajax({
    url: url_hit,
    async: bool_async,
    method: method,
    dataType: 'json'
  })
}

function parse_url() {
  return g1.url.parse(location.href)
}

function update_uri(obj) {
  var url = g1.url.parse(location.href).update(obj)
  history.pushState({}, '', '?' + url.search);
}

// ___________________________ PLOT Fns___________________________________________

function plot_home() {

  // ajax_call("../get_queries?section=home_chart")
  ajax_call("../get_meta")
    .done((meta) => {
      console.log(meta);
      $(".loader").addClass("d-none");
    })

  // ajax_call("../get_data").done(function (data) {
  //   console.log(data);

  //   $('#table_template')
  //     .one("template", function () {
  //       plot_bar({ selector: "#chart_placeholder", data: data })
  //     })
  //     .template({ data: data }, { target: "#table_placeholder" })

  // })

}

class SSEGTVController extends SSEController

  routes:
    "../events/:id": "month"

  start: =>
    this.pageSettings =
      "three_week":
        # Refresh every three minutes
        "timeAlive": 30
        "nextPage": "black_view"
      "event_panels":
        "timeAlive": 30
        "nextPage": "white_view"
      "black_view":
        "timeAlive": 5
        "nextPage": "event_panels"
      "white_view":
        "timeAlive": 5
        "nextPage": "event_highlight"
      "event_highlight":
        "timeAlive": 15
        "nextPage": "three_week"
    this.event_panels()
    @countdown = this.pageSettings.event_panels.timeAlive
    @page = "event_panels"
    @timerId = setInterval(this.flipPage, 1000)

app = new SSEGTVController
Backbone.history.start()

# app.navigate "month", trigger: true
app.start()

---
---
class SSEFTVController extends SSEController

  routes:
    "../events/:id": "month"

  start: =>
    this.pageSettings =
      "sse_info":
        "timeAlive": 15
        "nextPage": "meeting_view"
      "meeting_view":
        "timeAlive": 15
        "nextPage": "black_view"
      "black_view":
        "timeAlive": 5
        "nextPage" : "event_highlight"
      "event_highlight":
        "timeAlive": 15
        "nextPage": "mentoring_hours"
      "mentoring_hours":
        "timeAlive": 15
        "nextPage": "event_panels"
      "event_panels":
        "timeAlive": 15
        "nextPage": "white_view"
      "white_view":
        "timeAlive": 5
        "nextPage": "sse_info"

    this.sse_info()
    @countdown = this.pageSettings.meeting_view.timeAlive
    @page = "sse_info"
    @page = "mentoring_hours"
    @timerId = setInterval(this.flipPage, 1000)


app = new SSEFTVController
Backbone.history.start()

# app.navigate "month", trigger: true
setTimeout(app.start, 1000)

(function () {
  var ctx = cast.framework.CastReceiverContext.getInstance();
  var player = ctx.getPlayerManager();
  var msg = cast.framework.messages;
  var hls = /\.m3u8?(\?|$)/i;

  player.setMessageInterceptor(msg.MessageType.LOAD, function (req) {
    var media = req.media;
    var url = media.contentUrl || media.contentId;
    if (hls.test(url) || media.contentType === 'application/x-mpegurl') {
      media.contentType = 'application/x-mpegurl';
      media.hlsSegmentFormat = media.hlsSegmentFormat || msg.HlsSegmentFormat.TS;
      media.hlsVideoSegmentFormat = media.hlsVideoSegmentFormat || msg.HlsVideoSegmentFormat.MPEG2_TS;
    }
    return req;
  });

  var playback = new cast.framework.PlaybackConfig();
  playback.autoResumeDuration = 4;
  playback.autoPauseDuration = 1;

  var options = new cast.framework.CastReceiverOptions();
  options.playbackConfig = playback;
  options.supportedCommands = msg.Command.ALL_BASIC_MEDIA | msg.Command.QUEUE_NEXT | msg.Command.QUEUE_PREV;
  ctx.start(options);
})();

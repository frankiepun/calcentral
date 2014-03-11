require 'observer.rb'


module Calcentral

  Rails.application.config.after_initialize do

    USER_CACHE_WARMER = UserCacheWarmer.new

    USER_CACHE_EXPIRATION = UserCacheInvalidator.new

    {
      MyFinancials => :expire,
      MyRegBlocks => :expire,
      CalLink::Memberships => :expire,

      CampusUserCoursesProxy => :expire,

      Canvas::CanvasProxy => :expire,
      Canvas::CanvasUserCoursesProxy => :expire,
      Canvas::CanvasGroupsProxy => :expire,
      Canvas::CanvasTodoProxy => :expire,
      Canvas::CanvasUpcomingEventsProxy => :expire,
      Canvas::CanvasUserActivityStreamProxy => :expire,
      Canvas::CanvasUserProfileProxy => :expire,
      CanvasMergedUserSites => :expire,

      MyBadges::GoogleCalendar => :expire,
      MyBadges::GoogleDrive => :expire,
      MyBadges::GoogleMail => :expire,
      MyTasks::GoogleTasks => :expire,

      Sakai::Proxy => :expire,
      SakaiMergedUserSites => :expire
    }.each do |key, value|
      USER_CACHE_EXPIRATION.add_observer(key, value)
    end

    merged_feeds_array = [
      UserApi,
      MyClasses::Merged,
      MyFinancials,
      MyGroups::Merged,
      MyActivities::Merged,
      MyTasks::Merged,
      MyBadges::Merged,
      MyUpNext,
      MyRegBlocks
    ]
    MERGED_FEEDS = {}
    merged_feeds_array.each do |feed|
      USER_CACHE_EXPIRATION.add_observer(feed, :expire)
      MERGED_FEEDS[feed.name] = feed
    end

    # MyAcademics is a merged feed but shouldn't get expired by the usual observer pattern; instead it expires
    # at 8am the day after today.
    MERGED_FEEDS[MyAcademics::Merged.name] = MyAcademics::Merged

    #Pseudo-prefix constant
    PSEUDO_USER_PREFIX = "pseudo_"

  end
end

